/** Transport types only. Build and verify signatures with neurai-depin-msg. */
export const DEPIN_RPC_PROTOCOL = 5 as const;
export const DEPIN_REMOTE_METHODS = Object.freeze([
  'depingetmsginfo',
  'depinpoolstats',
  'depinmcpstatus',
  'depinchallenge',
  'depinreceivemsg',
  'depinreceiveseq',
  'depinlistsections',
  'depinclearmsg',
  'depinsubmitmsg',
  'depingetancestorrecipients',
] as const);
export type DepinRemoteMethod = (typeof DEPIN_REMOTE_METHODS)[number];
export interface DepinBootstrapRequest {
  protocol: 5;
  request_id: string;
  timestamp_ms: number | bigint;
}
export interface DepinSequenceCursor {
  version: 1;
  stream_id: string;
  after_seq: number | bigint;
  scope: string;
  address: string;
  from_timestamp: number | bigint;
}
export interface DepinRpcRequest extends DepinBootstrapRequest {
  network: string;
  pool_pubkey: string;
  pool_root: string;
  instance_id: string;
  membership_revision: string;
  token: string;
  address: string;
  challenge: string;
  args: Record<string, unknown>;
  signature: string;
}
export type DepinRpcParams = [DepinBootstrapRequest | DepinRpcRequest] | { request: DepinBootstrapRequest | DepinRpcRequest };
export interface DepinRpcResponse {
  protocol: 5;
  network: string;
  pool_pubkey: string;
  pool_root: string;
  instance_id: string;
  membership_revision: string;
  membership_height: number;
  membership_blockhash: string;
  request_hash: string;
  body_kind: 0 | 1;
  body?: string;
  encrypted?: string;
  poolsig: string;
}
export function isDepinRemoteMethod(method: string): method is DepinRemoteMethod {
  return (DEPIN_REMOTE_METHODS as readonly string[]).includes(method);
}
/** Keep every signed byte intact. The node performs canonical validation. */
export function getDepinRequest(params: unknown): DepinBootstrapRequest | DepinRpcRequest {
  const request =
    Array.isArray(params) && params.length === 1
      ? params[0]
      : params && typeof params === 'object' && Object.keys(params).length === 1
        ? (params as any).request
        : null;
  const protocol = request?.protocol;
  // HTTP services can parse numeric JSON tokens as genuine LosslessNumbers.
  if (
    !request ||
    typeof request !== 'object' ||
    Array.isArray(request) ||
    !(
      protocol === 5 ||
      (protocol?.isLosslessNumber === true &&
        protocol.value === '5' &&
        typeof protocol.toString === 'function' &&
        protocol.toString() === '5')
    )
  ) {
    throw Object.assign(new Error('DePIN protocol 5 requires one request object'), {
      code: -8,
      data: { depin_error: 'unsupported_protocol', expected_protocol: 5 },
    });
  }
  return request;
}

type RpcNode = { rpc: (method: string, params: any) => Promise<any> };
/** Route signed requests to their exact pool/instance, with no request rewriting.
 * Discovery is advisory routing metadata; the client verifies the final reply.
 * No private request is broadcast and no write is retried by this router.
 */
export function createDepinNodeRouter<T extends RpcNode>(healthyNodes: () => T[], randomId: () => string) {
  const identities = new WeakMap<T, { network: string; pool_pubkey: string; pool_root: string; instance_id: string }>();
  const pending = new WeakMap<T, Promise<void>>();
  const discoveredAt = new WeakMap<T, number>();
  async function discover(node: T) {
    let promise = pending.get(node);
    if (!promise && Date.now() - (discoveredAt.get(node) ?? 0) < 1000) return;
    if (!promise) {
      discoveredAt.set(node, Date.now());
      promise = (async () => {
        const reply = await node.rpc('depingetmsginfo', [{ protocol: 5, request_id: randomId(), timestamp_ms: Date.now() }]);
        if (
          reply?.protocol !== 5 ||
          typeof reply.network !== 'string' ||
          typeof reply.pool_pubkey !== 'string' ||
          typeof reply.pool_root !== 'string' ||
          typeof reply.instance_id !== 'string'
        )
          throw new Error('Node has no RPC 5 pool identity');
        identities.set(node, reply);
      })().finally(() => pending.delete(node));
      pending.set(node, promise);
    }
    await promise;
  }
  return async function route(method: string, params: unknown): Promise<T> {
    const request = getDepinRequest(params);
    const nodes = healthyNodes();
    if (!nodes.length) throw new Error('No healthy RPC node');
    if (method === 'depingetmsginfo') return nodes[0];
    const target = request as DepinRpcRequest;
    const matches = (node: T) => {
      const identity = identities.get(node);
      return (
        identity && ['network', 'pool_pubkey', 'pool_root', 'instance_id'].every((key) => (identity as any)[key] === (target as any)[key])
      );
    };
    let found = nodes.find(matches);
    if (found) return found;
    // One discovery per healthy node, coalesced across concurrent requests.
    await Promise.all(nodes.map((node) => discover(node).catch(() => identities.delete(node))));
    found = nodes.find(matches);
    if (!found)
      throw Object.assign(new Error('DePIN service_mismatch: target pool or instance is unavailable; refresh bootstrap'), {
        code: -32600,
        data: { depin_error: 'service_mismatch', expected_protocol: 5 },
      });
    return found;
  };
}
