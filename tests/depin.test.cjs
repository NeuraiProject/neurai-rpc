const { createDepinNodeRouter, getDepinRequest, DEPIN_REMOTE_METHODS, stringifyRpcJson, parseRpcJson } = require('../dist/index.cjs');
const crypto = require('node:crypto');
const id = (n) => ({ protocol: 5, network: 'aa'.repeat(32), pool_pubkey: n.repeat(66), pool_root: '&POOL', instance_id: n.repeat(64) });
const params = (identity) => [
  {
    ...identity,
    membership_revision: 'cc'.repeat(32),
    request_id: 'dd'.repeat(32),
    timestamp_ms: 123,
    token: '&POOL',
    address: 'identity',
    challenge: 'ee'.repeat(32),
    signature: 'signature',
    args: { cursor: { after_seq: 9007199254740993n } },
  },
];
test('catalog includes sequence reads and excludes removed signers', () => {
  expect(DEPIN_REMOTE_METHODS).toContain('depinreceiveseq');
  expect(DEPIN_REMOTE_METHODS).not.toContain('depinsignrpc');
});
test('request shape requires exactly one RPC 5 object, without rewriting it', () => {
  const p = params(id('1'));
  expect(getDepinRequest(p)).toBe(p[0]);
  expect(getDepinRequest({ request: p[0] })).toBe(p[0]);
  for (const bad of [[], [p[0], p[0]], [{ protocol: 2 }], { address: 'x', args: [] }, { request: p[0], extra: 1 }])
    expect(() => getDepinRequest(bad)).toThrow();
  expect(stringifyRpcJson(p)).toContain('9007199254740993');
  expect(parseRpcJson(stringifyRpcJson(p))[0].args.cursor.after_seq).toBe('9007199254740993');
});
test('routes to exact pool identity, never broadcasts private requests or retries writes', async () => {
  const a = { rpc: jest.fn(async () => id('1')) },
    b = { rpc: jest.fn(async () => id('2')) };
  const route = createDepinNodeRouter(
    () => [a, b],
    () => crypto.randomBytes(32).toString('hex'),
  );
  const p = params(id('2'));
  expect(await route('depinsubmitmsg', p)).toBe(b);
  for (const node of [a, b]) expect(node.rpc.mock.calls.every(([m]) => m === 'depingetmsginfo')).toBe(true);
  const calls = a.rpc.mock.calls.length + b.rpc.mock.calls.length;
  expect(await route('depinreceiveseq', p)).toBe(b);
  expect(a.rpc.mock.calls.length + b.rpc.mock.calls.length).toBe(calls);
  await expect(route('depinsubmitmsg', params(id('3')))).rejects.toMatchObject({ data: { depin_error: 'service_mismatch' } });
  expect(a.rpc.mock.calls.length + b.rpc.mock.calls.length).toBe(calls);
});
test('concurrent discovery coalesces, and unavailable matching pool cannot fall back', async () => {
  let active = [];
  const a = { rpc: jest.fn(async () => id('1')) };
  active = [a];
  const route = createDepinNodeRouter(
    () => active,
    () => crypto.randomBytes(32).toString('hex'),
  );
  await Promise.all(Array.from({ length: 20 }, () => route('depinreceiveseq', params(id('1')))));
  expect(a.rpc).toHaveBeenCalledTimes(1);
  active = [];
  await expect(route('depinclearmsg', params(id('1')))).rejects.toThrow('No healthy');
});
