# neurai-rpc

HTTP JSON-RPC transport and method catalog for Neurai, including **DePIN RPC 5**.

```js
import {getRPC, methods, assertRpcGenesis, TESTNET_GENESIS_HASH} from '@neuraiproject/neurai-rpc';
const rpc = getRPC(username, password, endpoint);
await assertRpcGenesis(rpc, TESTNET_GENESIS_HASH);
const height = await rpc(methods.getblockcount, []);
```

The transport supports Node 18+ and browser `fetch`. JSON-RPC errors reject even when the node returns HTTP 200. Error objects retain the node's numeric code, message and `data`; HTTP/network failures remain distinguishable. Never put wallet secrets in a public proxy request.

## Exact numbers

`parseRpcJson` keeps unsafe response numeric tokens as decimal strings for compatibility with chain/amount APIs. `stringifyRpcJson` emits `bigint` and `rpcNumber(decimalText)` as exact JSON numbers, and rejects unsafe JavaScript numeric parameters.

```js
import {rpcNumber, stringifyRpcJson} from '@neuraiproject/neurai-rpc';
await rpc('sendtoaddress', [address, rpcNumber('0.12345678')]); // Local wallet RPC only.
console.log(stringifyRpcJson({after_seq: 9007199254740993n}));
```

## DePIN RPC 5

Use `@neuraiproject/neurai-depin-msg` 4.x to build and authenticate requests/replies. This transport does not sign, decrypt or authenticate `poolsig` on the application's behalf.

All ten remote messaging methods take exactly one request object (`[request]` or named `{request}`): bootstrap, stats, MCP status, challenge, directory, sections, sequence/timestamp reads, submission and clear. `depinreceiveseq` is the default read path in the messaging SDK. Each addressed operation signs all parameters, target chain/pool/instance, membership revision and a fresh request ID. No RPC 2/3/4 fallback is provided.

Bootstrap is also request-bound:

```js
const response = await rpc(methods.depingetmsginfo, [{
  protocol: 5,
  request_id: random32ByteLowercaseHex,
  timestamp_ms: Date.now(),
}]);
// Verify response identity and signature with the SDK before using its contents.
```

Local `depinsignrpc(method, request)` replaces the removed `depinsignrequest`, `depinsignchallenge` and `depinsignreadseq` helpers. It belongs only on an unlocked local signing wallet. `depindecrypt`, `depinsendmsg`, `depingetmsg` and `depinpoolpkey` also remain local helpers and must not be publicly exposed merely because they appear in the node catalog.

Legacy and strict ECDSA v3 identities are supported by RPC 5. PQ messaging remains outside this contract. A signature over a directory is the pool's statement, not independent proof of asset ownership.

See [examples](DEPIN_EXAMPLES.md) and [integration guide](DEPIN_IMPLEMENTATION_GUIDE_EN.md). The package exports request/response/cursor types, `DEPIN_REMOTE_METHODS`, `getDepinRequest` and `createDepinNodeRouter`. The router performs advisory pool/instance discovery, routes a private request only to its exact healthy destination and never broadcasts, rewrites or automatically replays a write. Clients still verify the final signed response.

```sh
npm run create-docs
npm run build
npm test -- --runInBand
```

Integration tests requiring a live node are separate from the offline suite. The method catalog is generated from `docs.json`; it includes both public and local wallet/admin methods, so it is not a proxy whitelist.
