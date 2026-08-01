/**
 * Unit tests for the DePIN TCP client against an in-process mock gateway
 * speaking the real line protocol. No external network access.
 */
const { getDePinRPC, requestDePinChallenge } = require("../dist/depin.cjs");
const { startGateway } = require("./mock-gateway.cjs");

const AUTH = {
  token: "FRANCE",
  address: "NXaddr",
  signMessage: async () => "sig-b64",
};

describe("constructor validation", () => {
  test("rejects URL strings including tcp://", () => {
    expect(() => getDePinRPC("http://localhost:19002")).toThrow(/host, port/);
    expect(() => getDePinRPC("tcp://localhost:19002")).toThrow(/host, port/);
  });

  test("rejects invalid port and timeout", () => {
    expect(() => getDePinRPC({ host: "x", port: 0 })).toThrow(/port/);
    expect(() => getDePinRPC({ host: "x", port: 1.5 })).toThrow(/port/);
    expect(() => getDePinRPC({ host: "x", port: 19002, timeoutMs: -1 })).toThrow(
      /timeoutMs/
    );
  });

  test("rejects incomplete auth options", () => {
    const target = { host: "x", port: 19002 };
    expect(() => getDePinRPC(target, { token: "T", address: "A" })).toThrow(
      /signMessage/
    );
    expect(() =>
      getDePinRPC(target, { token: "T", signMessage: async () => "s" })
    ).toThrow(/Address/);
  });
});

describe("unauthenticated methods", () => {
  test("params sent untouched, no AUTH exchange", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port });
      const result = await rpc("depingetmsginfo", []);
      expect(result).toEqual({ ok: true, method: "depingetmsginfo" });
      expect(gw.received).toHaveLength(1);
      const request = JSON.parse(gw.received[0]);
      expect(request.method).toBe("depingetmsginfo");
      expect(request.params).toEqual([]);
    } finally {
      await gw.close();
    }
  });

  test("depinreceivemsg pagination params pass through without auth", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      await rpc("depinreceivemsg", ["FRANCE", "NXaddr", 0, "abc", 50]);
      expect(gw.received).toHaveLength(1);
      const request = JSON.parse(gw.received[0]);
      expect(request.params).toEqual(["FRANCE", "NXaddr", 0, "abc", 50]);
      expect(gw.received.some((l) => l.startsWith("AUTH|"))).toBe(false);
    } finally {
      await gw.close();
    }
  });

  test("authenticated method without credentials fails clearly, no network", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port });
      await expect(
        rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "hi", "NXaddr"])
      ).rejects.toMatchObject({
        error: expect.stringMatching(/requires authentication/),
      });
      expect(gw.connectionCount()).toBe(0);
    } finally {
      await gw.close();
    }
  });
});

describe("depinsendmsg (SEND challenge)", () => {
  test("signs DEPIN-SEND| and appends challenge/signature", async () => {
    const gw = await startGateway();
    const signed = [];
    try {
      const rpc = getDePinRPC(
        { host: gw.host, port: gw.port },
        {
          ...AUTH,
          signMessage: async (m) => {
            signed.push(m);
            return "sig-b64";
          },
        }
      );
      await rpc("depinsendmsg", ["FRANCE", "1.2.3.4:19002", "hola", "NXaddr"]);

      expect(gw.received[0]).toBe("AUTH|FRANCE|NXaddr|SEND");
      const challenge = gw.issued[0];
      expect(signed).toEqual([`DEPIN-SEND|FRANCE|NXaddr|${challenge}`]);
      const request = JSON.parse(gw.received[1]);
      expect(request.params).toEqual([
        "FRANCE",
        "1.2.3.4:19002",
        "hola",
        "NXaddr",
        challenge,
        "sig-b64",
      ]);
    } finally {
      await gw.close();
    }
  });

  test("fills in fromaddress with the authenticated address", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      await rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "hola"]);
      const request = JSON.parse(gw.received[1]);
      expect(request.params[3]).toBe("NXaddr");
    } finally {
      await gw.close();
    }
  });

  test("rejects a fromaddress that is not the authenticated address", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      await expect(
        rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "hola", "NXother"])
      ).rejects.toMatchObject({
        error: expect.stringMatching(/authenticated address/),
      });
      expect(gw.connectionCount()).toBe(0);
    } finally {
      await gw.close();
    }
  });

  test("every call uses a fresh single-use challenge (two AUTH for two sends)", async () => {
    // The node consumes the nonce on validation ("Challenge not found" on
    // reuse) — the mock enforces the same rule, so both calls succeeding
    // proves each one authenticated with its own fresh challenge.
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      const first = await rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "a", "NXaddr"]);
      const second = await rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "b", "NXaddr"]);
      expect(first).toMatchObject({ ok: true });
      expect(second).toMatchObject({ ok: true });

      const auths = gw.received.filter((l) => l.startsWith("AUTH|"));
      expect(auths).toHaveLength(2);
      expect(gw.issued).toHaveLength(2);
      expect(gw.issued[0]).not.toBe(gw.issued[1]);

      const challengesUsed = gw.received
        .filter((l) => !l.startsWith("AUTH|"))
        .map((l) => {
          const p = JSON.parse(l).params;
          return p[p.length - 2];
        });
      expect(challengesUsed).toEqual(gw.issued);
    } finally {
      await gw.close();
    }
  });

  test("expired challenge triggers exactly one retry with a fresh AUTH", async () => {
    let sends = 0;
    const gw = await startGateway((line, socket) => {
      if (line.startsWith("AUTH|")) {
        return "CHALLENGE|chal" + Date.now() + "|60";
      }
      const request = JSON.parse(line);
      sends += 1;
      if (sends === 1) {
        return JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          error: { code: -8, message: "Challenge expired" },
        });
      }
      return JSON.stringify({ jsonrpc: "2.0", id: request.id, result: "ok" });
    });
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      const result = await rpc("depinsendmsg", [
        "FRANCE",
        "1.2.3.4",
        "hola",
        "NXaddr",
      ]);
      expect(result).toBe("ok");
      const auths = gw.received.filter((l) => l.startsWith("AUTH|"));
      expect(auths).toHaveLength(2);
    } finally {
      await gw.close();
    }
  });
});

describe("depinclearmsg (ADMIN challenge)", () => {
  test("pool-wide: inserts address, signs DEPIN-CLEAR| with the base token", async () => {
    const gw = await startGateway();
    const signed = [];
    try {
      const rpc = getDePinRPC(
        { host: gw.host, port: gw.port },
        { ...AUTH, signMessage: async (m) => (signed.push(m), "sig-b64") }
      );
      await rpc("depinclearmsg", ["all"]);

      expect(gw.received[0]).toBe("AUTH|FRANCE|NXaddr|ADMIN");
      const challenge = gw.issued[0];
      expect(signed).toEqual([`DEPIN-CLEAR|FRANCE|NXaddr|${challenge}`]);
      const request = JSON.parse(gw.received[1]);
      expect(request.params).toEqual(["all", "NXaddr", challenge, "sig-b64"]);
    } finally {
      await gw.close();
    }
  });

  test("scoped: requests the ADMIN challenge for the scope token", async () => {
    const gw = await startGateway();
    const signed = [];
    try {
      const rpc = getDePinRPC(
        { host: gw.host, port: gw.port },
        { ...AUTH, signMessage: async (m) => (signed.push(m), "sig-b64") }
      );
      await rpc("depinclearmsg", ["all", "&FRANCE/GENERAL"]);

      expect(gw.received[0]).toBe("AUTH|&FRANCE/GENERAL|NXaddr|ADMIN");
      const challenge = gw.issued[0];
      expect(signed).toEqual([
        `DEPIN-CLEAR|&FRANCE/GENERAL|NXaddr|${challenge}`,
      ]);
      const request = JSON.parse(gw.received[1]);
      expect(request.params).toEqual([
        "all",
        "&FRANCE/GENERAL",
        "NXaddr",
        challenge,
        "sig-b64",
      ]);
    } finally {
      await gw.close();
    }
  });

  test("empty params produce [null, address, challenge, signature]", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      await rpc("depinclearmsg", []);
      const request = JSON.parse(gw.received[1]);
      expect(request.params).toEqual([null, "NXaddr", gw.issued[0], "sig-b64"]);
    } finally {
      await gw.close();
    }
  });
});

describe("depingetmsg gateway block", () => {
  test("rejected with a clear error and zero network activity", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port }, AUTH);
      await expect(rpc("depingetmsg", ["FRANCE"])).rejects.toMatchObject({
        error: expect.stringMatching(/depinreceivemsg/),
      });
      expect(gw.connectionCount()).toBe(0);
    } finally {
      await gw.close();
    }
  });
});

describe("mode override rules", () => {
  test("conflicting authOptions.mode is rejected per call", async () => {
    const gw = await startGateway();
    try {
      const rpc = getDePinRPC(
        { host: gw.host, port: gw.port },
        { ...AUTH, mode: "RECEIVE" }
      );
      await expect(
        rpc("depinsendmsg", ["FRANCE", "1.2.3.4", "hola", "NXaddr"])
      ).rejects.toMatchObject({
        error: expect.stringMatching(/conflicts with/),
      });
      expect(gw.connectionCount()).toBe(0);
    } finally {
      await gw.close();
    }
  });

  test("requestDePinChallenge honors mode and returns DEPIN-GET| for RECEIVE", async () => {
    const gw = await startGateway();
    try {
      const receive = await requestDePinChallenge(
        { host: gw.host, port: gw.port },
        { ...AUTH, mode: "RECEIVE" }
      );
      expect(receive.challenge).toBe(gw.issued[0]);
      expect(receive.timeout).toBe(60);
      expect(receive.messageToSign).toBe(
        `DEPIN-GET|FRANCE|NXaddr|${gw.issued[0]}`
      );

      const admin = await requestDePinChallenge(
        { host: gw.host, port: gw.port },
        { ...AUTH, mode: "ADMIN" }
      );
      expect(admin.messageToSign).toBe(
        `DEPIN-CLEAR|FRANCE|NXaddr|${gw.issued[1]}`
      );
      expect(gw.received).toEqual([
        "AUTH|FRANCE|NXaddr|RECEIVE",
        "AUTH|FRANCE|NXaddr|ADMIN",
      ]);
    } finally {
      await gw.close();
    }
  });
});

describe("transport robustness", () => {
  test("response fragmented across data events, split inside a multibyte char", async () => {
    const net = require("node:net");
    const payload = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      result: "ñandú 💚 done",
    });
    const bytes = Buffer.from(payload + "\n", "utf8");
    const emojiStart = bytes.indexOf(Buffer.from("💚", "utf8"));
    const cuts = [5, emojiStart + 2]; // second cut lands inside the emoji

    const server = net.createServer((socket) => {
      socket.on("data", () => {
        let offset = 0;
        const pieces = [...cuts, bytes.length].map((end) => {
          const piece = bytes.subarray(offset, end);
          offset = end;
          return piece;
        });
        pieces.forEach((piece, index) => {
          setTimeout(() => socket.write(piece), 10 * (index + 1));
        });
      });
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

    try {
      const rpc = getDePinRPC({
        host: "127.0.0.1",
        port: server.address().port,
      });
      const result = await rpc("depingetmsginfo", []);
      expect(result).toBe("ñandú 💚 done");
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test("connection closed without a newline rejects cleanly", async () => {
    const gw = await startGateway((line, socket) => {
      socket.end("partial-without-newline");
      return null;
    });
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port });
      await expect(rpc("depingetmsginfo", [])).rejects.toMatchObject({
        error: expect.stringMatching(/closed the connection/),
      });
    } finally {
      await gw.close();
    }
  });

  test("silent server triggers the timeout with a clean error", async () => {
    const gw = await startGateway(() => null); // never answers
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port, timeoutMs: 200 });
      await expect(rpc("depingetmsginfo", [])).rejects.toMatchObject({
        error: expect.stringMatching(/timed out after 200 ms/),
      });
    } finally {
      await gw.close();
    }
  });

  test("connection refused rejects cleanly", async () => {
    const gw = await startGateway();
    const deadPort = gw.port;
    await gw.close();
    const rpc = getDePinRPC({ host: "127.0.0.1", port: deadPort });
    await expect(rpc("depingetmsginfo", [])).rejects.toMatchObject({
      type: "DePinRequestError",
    });
  });

  test("ERROR| protocol responses surface as errors", async () => {
    const gw = await startGateway(() => "ERROR|Chat mempool not enabled");
    try {
      const rpc = getDePinRPC({ host: gw.host, port: gw.port });
      await expect(rpc("depingetmsginfo", [])).rejects.toMatchObject({
        error: expect.stringMatching(/Chat mempool not enabled/),
      });
    } finally {
      await gw.close();
    }
  });
});
