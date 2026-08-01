/**
 * Minimal in-process mock of the Neurai DePIN gateway for unit tests.
 *
 * Speaks the real line protocol: one request line terminated by '\n' per
 * connection, one response line back. Like the real node, challenges are
 * unique per AUTH and strictly single-use — ValidateChallenge erases the
 * nonce on validation, so a reused challenge answers "Challenge not found".
 *
 * The `onLine` handler receives the request line and the socket; returning a
 * string sends it (with '\n'), returning null leaves the socket open (for
 * timeout tests). When omitted, a default handler with single-use challenge
 * accounting is used; the issued challenges are exposed as `issued`.
 */
const net = require("node:net");

function makeDefaultHandler(state) {
  return (line) => {
    if (line.startsWith("AUTH|")) {
      const challenge = `chal-${++state.counter}`;
      state.issued.push(challenge);
      state.pending.add(challenge);
      return `CHALLENGE|${challenge}|60`;
    }
    let request;
    try {
      request = JSON.parse(line);
    } catch (e) {
      return "ERROR|Unknown command: " + line.split("|")[0];
    }
    // Same consumption rule as the node: authenticated methods carry the
    // challenge as the second-to-last param, and it is valid exactly once.
    if (
      request.method === "depinsendmsg" ||
      request.method === "depinclearmsg"
    ) {
      const challenge = request.params[request.params.length - 2];
      if (!state.pending.has(challenge)) {
        return JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          error: { code: -8, message: "Challenge not found" },
        });
      }
      state.pending.delete(challenge);
    }
    return JSON.stringify({
      jsonrpc: "2.0",
      id: request.id,
      result: { ok: true, method: request.method },
    });
  };
}

async function startGateway(onLine) {
  const received = [];
  const state = { counter: 0, issued: [], pending: new Set() };
  const handler = onLine || makeDefaultHandler(state);
  let connections = 0;
  const sockets = new Set();

  const server = net.createServer((socket) => {
    connections += 1;
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
    let buf = Buffer.alloc(0);
    socket.on("data", (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      const nl = buf.indexOf(0x0a);
      if (nl === -1) {
        return;
      }
      const line = buf.subarray(0, nl).toString("utf8");
      received.push(line);
      const reply = handler(line, socket);
      if (typeof reply === "string") {
        socket.end(reply + "\n");
      }
    });
    socket.on("error", () => {});
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  return {
    host: "127.0.0.1",
    port: server.address().port,
    received,
    issued: state.issued,
    connectionCount: () => connections,
    close: () =>
      new Promise((resolve) => {
        for (const s of sockets) {
          s.destroy();
        }
        server.close(resolve);
      }),
  };
}

module.exports = { startGateway };
