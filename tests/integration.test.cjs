/**
 * Optional integration tests against a real node / DePIN gateway.
 * Skipped unless the environment variables are set:
 *
 *   NEURAI_RPC_URL   e.g. http://127.0.0.1:19001  (+ NEURAI_RPC_USER / NEURAI_RPC_PASS)
 *   NEURAI_DEPIN_HOST / NEURAI_DEPIN_PORT   for the raw-TCP gateway
 *   NEURAI_TEST_PQ=1  to exercise the post-quantum wallet exports
 *
 * dumpextkeypq is deliberately NOT exercised here: it returns the wallet's
 * master PQ secret and must never be printed or persisted by a test.
 */
const { getRPC, methods } = require("../dist/index.cjs");
const { getDePinRPC } = require("../dist/depin.cjs");

const RPC_URL = process.env.NEURAI_RPC_URL;
const RPC_USER = process.env.NEURAI_RPC_USER || "anonymous";
const RPC_PASS = process.env.NEURAI_RPC_PASS || "anonymous";
const DEPIN_HOST = process.env.NEURAI_DEPIN_HOST;
const DEPIN_PORT = process.env.NEURAI_DEPIN_PORT;

const describeRpc = RPC_URL ? describe : describe.skip;
const describeDepin = DEPIN_HOST && DEPIN_PORT ? describe : describe.skip;
const testPq = RPC_URL && process.env.NEURAI_TEST_PQ === "1" ? test : test.skip;

describeRpc("node RPC integration", () => {
  const rpc = RPC_URL ? getRPC(RPC_USER, RPC_PASS, RPC_URL) : null;

  test("getblockcount returns a number", async () => {
    const count = await rpc(methods.getblockcount, []);
    expect(typeof count).toBe("number");
  });

  test("createrawtransaction with refinputs produces a v3 transaction", async () => {
    const fakeTxid =
      "aa".repeat(32); // createrawtransaction does not check existence
    const raw = await rpc(methods.createrawtransaction, [
      [{ txid: fakeTxid, vout: 0 }],
      { data: "00" },
      0,
      [{ txid: fakeTxid, vout: 1 }],
    ]);
    const decoded = await rpc(methods.decoderawtransaction, [raw]);
    expect(decoded.version).toBe(3);
  });

  testPq("exportxpqpub returns a hex blob", async () => {
    const hex = await rpc(methods.exportxpqpub, [2]);
    expect(typeof hex).toBe("string");
    expect(hex).toMatch(/^[0-9a-fA-F]+$/);
  });
});

describeDepin("DePIN gateway integration", () => {
  const target = {
    host: DEPIN_HOST,
    port: Number(DEPIN_PORT),
  };

  test("depingetmsginfo responds over raw TCP without auth", async () => {
    const rpc = getDePinRPC(target);
    const info = await rpc("depingetmsginfo", []);
    expect(info).toHaveProperty("enabled");
  });
});
