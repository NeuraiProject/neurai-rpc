/**
 * Unit tests for the standard HTTP RPC client. fetch is mocked — the default
 * test suite never touches the network. The remote smoke test lives in
 * integration.test.cjs, gated by NEURAI_RPC_URL.
 */
const { getRPC, methods } = require("../dist/index.cjs");

afterEach(() => {
  delete global.fetch;
});

function mockFetchOnce(response) {
  global.fetch = jest.fn(async () => response);
}

describe("getRPC", () => {
  test("resolves with the RPC result and sends Basic auth", async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({ result: 123456, error: null, id: 1 }),
    });

    const rpc = getRPC("user", "pass", "http://127.0.0.1:19001");
    const result = await rpc(methods.getblockcount, []);
    expect(result).toBe(123456);

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe("http://127.0.0.1:19001");
    expect(options.headers.Authorization).toBe(
      "Basic " + Buffer.from("user:pass").toString("base64")
    );
    const body = JSON.parse(options.body);
    expect(body.method).toBe("getblockcount");
    expect(body.params).toEqual([]);
  });

  test("rejects a JSON-RPC error even when HTTP status is 200", async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({
        result: null,
        error: { code: -8, message: "Invalid parameter" },
        id: 1,
      }),
    });

    const rpc = getRPC("user", "pass", "http://127.0.0.1:19001");
    await expect(rpc(methods.getblockcount, ["bad"])).rejects.toMatchObject({
      error: { code: -8, message: "Invalid parameter" },
      description: "Invalid parameter",
    });
  });

  test("rejects with status details on an HTTP error response", async () => {
    mockFetchOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({ error: "unauthorized", description: "bad creds" }),
    });

    const rpc = getRPC("user", "wrong", "http://127.0.0.1:19001");
    await expect(rpc(methods.getblockcount, [])).rejects.toMatchObject({
      status: 401,
      statusText: "Unauthorized",
    });
  });

  test("rejects as ServerUnreachable when the server cannot be contacted", async () => {
    global.fetch = jest.fn(async () => {
      throw new Error("ECONNREFUSED");
    });

    const rpc = getRPC("user", "pass", "http://256.256.256.256:1");
    await expect(rpc(methods.getblockcount, [])).rejects.toMatchObject({
      type: "ServerUnreachable",
    });
  });

  test("requires username, password and URL", () => {
    expect(() => getRPC("", "pass", "http://x")).toThrow(/Syntax error/);
    expect(() => getRPC("user", "", "http://x")).toThrow(/Syntax error/);
    expect(() => getRPC("user", "pass", "")).toThrow(/Syntax error/);
  });

  test("methods catalog includes the 0.5.0 additions", () => {
    for (const m of [
      "depinreceivemsg",
      "depingetancestorrecipients",
      "depinlistsections",
      "depinpoolpkey",
      "dumpextkeypq",
      "exportxpqpub",
    ]) {
      expect(methods[m]).toBe(m);
    }
  });
});
