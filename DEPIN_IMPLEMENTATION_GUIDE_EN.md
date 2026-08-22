# Neurai DePIN protocol 2 integration guide

## Architecture

DePIN protocol 2 is served through Neurai's standard authenticated HTTP
JSON-RPC interface: port `19001` on mainnet and `19101` on testnet. There is no
separate TCP gateway. Applications use `getRPC` for every DePIN operation.

## Roles

- The service node owns a dedicated wallet key used as the pool key. Its
  public key is published by `depingetmsginfo`.
- A holder address must have its public key revealed on chain before the node
  can encrypt responses for it.
- Clients pin the pool public key on first use, verify `poolsig` on replies,
  and encrypt `depinsubmitmsg` envelopes for that key.
- `depinsignrequest`, `depinsignchallenge`, and `depindecrypt` are convenience
  RPCs for keys held by the local node wallet. External wallets implement the
  same signing and ECIES operations client-side.

## Challenge authentication

Authenticated reads use type `receive`; destructive cleanup uses type
`admin`.

1. Sign `DEPIN-REQ|<type>|<token>|<address>|<unix_time_ms>`.
2. Call `depinchallenge(token, address, timestamp, signature, type)`.
3. Verify the response's `poolsig` and decrypt its `encrypted` field.
4. Sign `DEPIN-GET|<token>|<address>|<nonce>` for reads or
   `DEPIN-CLEAR|<token>|<address>|<nonce>` for cleanup.
5. Pass the nonce and signature to the protected RPC.

Request signatures are time-bounded and replay-protected. Challenges are
bound to type, token/scope, and address; they expire and are consumed by their
first successful use. Read responses can include `next_challenge` to avoid
another challenge-request round trip.

## Messaging RPCs

Public and diagnostic:

- `depingetmsginfo()` publishes protocol configuration and the pool key.
- `depinpoolstats()` returns pool statistics.
- `depinmcpstatus()` returns MCP worker state.
- `depinlistsections()` returns public section names.
- `depingetancestorrecipients(token, max_results?, stop_at?)` resolves active
  holders with revealed public keys.

Wallet-backed local operations:

- `depinsendmsg(token, message, fromaddress)` signs, encrypts, and stores a
  message in the local pool.
- `depingetmsg(token, fromaddress?)` decrypts local-pool messages.
- `depinpoolpkey()` derives the pool key from the service wallet.
- `depinsignrequest`, `depinsignchallenge`, and `depindecrypt` assist scripts.

Remote and non-custodial operations:

- `depinsubmitmsg({sender, encrypted})` accepts a signed message wrapped in an
  ECIES envelope for the pool key. Bare serialized hex is invalid.
- `depinreceivemsg(token, address, challenge, signature, timestamp?,
  after_hash?, limit?)` returns an encrypted, pool-signed page.
- `depinlistsections(address, scope, challenge, signature)` returns encrypted
  personal access and counters for the selected subtree.
- `depinclearmsg(scope, address, challenge, signature, mode?)` performs an
  owner-authorized purge. Omit mode for expired messages, use `"all"` for all
  messages, or pass a numeric age in hours.

`depingetpoolcontent` was removed because it exposed pool-wide metadata
without an identity to authenticate.

## DePIN asset RPCs

- `checkdepinvalidity(asset_name, address)`
- `listdepinholders(asset_name)`
- `listdepinaddresses(asset_name, count?, start?)`
- `freezedepin(asset_name, address, change_address?)`
- `unfreezedepin(asset_name, address, change_address?)`
- `selfrevokedepin(asset_name)`

Wallet-changing methods require an enabled wallet. Chain-wide holder queries
require the indexes specified by the node's RPC help.

## JavaScript client

```js
import { getRPC, methods } from "@neuraiproject/neurai-rpc";

const rpc = getRPC("rpcuser", "rpcpassword", "http://127.0.0.1:19001");
const info = await rpc(methods.depingetmsginfo, []);
```

The library transports JSON-RPC and exposes current method names. It does not
hold private keys or silently trust pool keys. See
[DEPIN_EXAMPLES.md](./DEPIN_EXAMPLES.md) for the wallet-assisted sequence.

## Migration from protocol 1

- Replace imports from `@neuraiproject/neurai-rpc/depin` with the package root.
- Replace `getDePinRPC({host, port}, ...)` with `getRPC(user, password, URL)`.
- Remove DePIN host/port arguments and configuration fields.
- Update protected calls to the signed challenge flow.
- Replace bare `depinsubmitmsg` payloads with encrypted envelope objects.
- Remove calls to `depingetpoolcontent`.
