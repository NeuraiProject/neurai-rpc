# neurai-rpc

JavaScript/TypeScript client for the Neurai JSON-RPC API.

## Endpoints

- Mainnet node: `http://127.0.0.1:19001`
- Testnet node: `http://127.0.0.1:19101`
- Hosted mainnet: `https://rpc-main.neurai.org/rpc`
- Hosted testnet: `https://rpc-testnet.neurai.org/rpc`

DePIN protocol 2 uses the same authenticated HTTP JSON-RPC endpoint. The old
raw-TCP DePIN gateway and its dedicated port no longer exist.

## Install

```sh
npm install @neuraiproject/neurai-rpc
```

## Usage

```js
import { getRPC, methods } from "@neuraiproject/neurai-rpc";

const rpc = getRPC("username", "password", "http://127.0.0.1:19001");
const height = await rpc(methods.getblockcount, []);
console.log(height);
```

CommonJS uses `const { getRPC, methods } = require("@neuraiproject/neurai-rpc")`.
`getRPC` resolves with the JSON-RPC `result` and rejects HTTP failures and
JSON-RPC error objects, including errors returned with HTTP status 200.

## DePIN protocol 2

Use the normal `getRPC` client for every DePIN command:

```js
const info = await rpc(methods.depingetmsginfo, []);
const stats = await rpc(methods.depinpoolstats, []);

const sent = await rpc(methods.depinsendmsg, [
  "&FRANCE/GENERAL",
  "Hello team!",
  "NXsender...",
]);
```

Authenticated reads and administrative purges use signed, single-use
challenges. A wallet-backed flow uses these commands in order:

1. `depinsignrequest(address, token, type)`
2. `depinchallenge(token, address, timestamp, signature, type)`
3. `depindecrypt(address, encrypted)` to recover the challenge
4. `depinsignchallenge(address, token, challenge, type)`
5. `depinreceivemsg`, `depinlistsections`, or `depinclearmsg`
6. Verify `poolsig`, then decrypt the encrypted response

See [DEPIN_EXAMPLES.md](./DEPIN_EXAMPLES.md) for call sequences and
[DEPIN_IMPLEMENTATION_GUIDE_EN.md](./DEPIN_IMPLEMENTATION_GUIDE_EN.md) for the
protocol details.

### Method changes

Added:

- `depinchallenge`
- `depinsignrequest` (wallet helper)
- `depinsignchallenge` (wallet helper)
- `depindecrypt` (wallet helper)
- `getibdstatus` (header synchronization diagnostics)

Changed:

- `depinsendmsg(token, message, fromaddress)` is local; host/port parameters
  were removed.
- `depinreceivemsg` now requires a receive challenge and signature.
- `depinclearmsg` now requires an admin challenge and signature.
- Address mode in `depinlistsections` now requires scope, challenge, and
  signature.
- `depinsubmitmsg` accepts only an encrypted envelope object.
- `depingetmsg(token, fromaddress?)` is local-wallet only.

Removed:

- `depingetpoolcontent`
- `@neuraiproject/neurai-rpc/depin` and `getDePinRPC`, which implemented the
  retired TCP transport

## Compatibility

- DePIN protocol 2 methods require Neurai node 2.0.0 or later.
- `getibdstatus` requires a node from August 2026 or later.
- `createrawtransaction` with `refinputs` requires a node from April 2026 or
  later.
- `dumpextkeypq` and `exportxpqpub` require PQ wallet support.
- Wallet-only commands are unavailable when the wallet is disabled.

## Method catalog

`methods` exposes the supported command names with TypeScript declarations:

```js
await rpc(methods.getibdstatus, []);
await rpc(methods.checkdepinvalidity, ["&FRANCE", "NXaddress..."]);
```

Generated command documentation is in
[neurai_methods.md](./neurai_methods.md).

## Links

- [GitHub repository](https://github.com/neuraiproject/neurai-rpc)
- [NPM package](https://www.npmjs.com/package/@neuraiproject/neurai-rpc)

### Exact numeric values

RPC responses are parsed from their original JSON text. Safe numbers retain
`number` compatibility; numeric tokens that would lose digits (large raw
integers or high-precision decimals) are returned as strings. Normalize monetary
fields to bigint/decimal text in your application, never with parseFloat.

For request parameters use bigint for exact integer JSON tokens, or
`rpcNumber('100000000.00000001')` for an exact decimal JSON token. Ordinary
strings remain quoted strings: use the representation required by the RPC
method. Unsafe integer numbers, NaN and Infinity are rejected. No global
BigInt.prototype mutation is performed. `parseRpcJson` and `stringifyRpcJson`
are exported for callers implementing their own transport.
