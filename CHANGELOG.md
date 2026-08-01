# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-08-01

### Breaking — DePIN client rewritten for the gateway's real protocol

The DePIN messaging gateway (port 19002) speaks a raw TCP line protocol, not
HTTP. The previous `fetch`-based client could never talk to a real node, so
the client was rewritten:

- **Transport**: raw TCP via `node:net` — one request line terminated by `\n`
  per connection, response read up to `\n`, 30 s timeout (matches the node's
  `DEPIN_SOCKET_TIMEOUT`), safe handling of fragmented and multibyte
  responses.
- **Node.js-only entry**: the DePIN client moved to the subpath
  `@neuraiproject/neurai-rpc/depin`, and is no longer re-exported from the
  package root, which stays free of Node built-ins and browser-safe.
  Migrate imports:
  `import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin"`.
- **Constructor**: `getDePinRPC({ host, port }, authOptions?)` — URL strings
  are rejected. Auth options are now optional: without them the client serves
  the gateway's unauthenticated methods and fails clearly on authenticated
  ones.
- **Correct per-method authentication** (the old client applied one generic
  flow to every method, which the gateway rejects):
  - `depinsendmsg` — SEND challenge, signs `DEPIN-SEND|token|address|challenge`,
    appends challenge/signature (gateway validates and trims them).
  - `depinclearmsg` — ADMIN challenge (owner only), signs
    `DEPIN-CLEAR|token|address|challenge`, sends
    `[mode, (scope,) address, challenge, signature]`; with a scope the
    challenge is requested for that scope token.
  - RECEIVE challenges now sign `DEPIN-GET|…` (the old `DEPIN-RECEIVE|…` was
    never accepted by the node).
  - Unauthenticated gateway methods (`depinreceivemsg`, `depinsubmitmsg`,
    `depingetmsginfo`, `depingetpoolcontent`, `depinpoolstats`,
    `depinmcpstatus`, `depinlistsections`, `depinpoolpkey`) are sent with
    their params untouched.
  - `depingetmsg` over the gateway is rejected with a clear error: it is
    blocked by a node-side bug (the gateway reads `fromaddress` from
    `params[3]`, where this method carries it at index 1 or 2). Use
    `depinreceivemsg` or the standard RPC port.
- Challenges are single-use on the node (the nonce is consumed on
  validation), so the client requests a fresh challenge for every
  authenticated call — never cached or reused — with one automatic retry
  (new nonce) on expiration.
- `DePinAuthOptions.mode` is only honored by `requestDePinChallenge()`
  (`"SEND" | "RECEIVE" | "ADMIN"`); `getDePinRPC` derives the challenge type
  per method and rejects a conflicting override.

### Added

- New RPC methods in the catalog (node from July 2026, except where noted):
  - `depinreceivemsg` - Retrieve pool messages with pagination (`after_hash`, `limit`)
  - `depingetancestorrecipients` - Active holders of a DEPIN branch with revealed pubkeys
  - `depinlistsections` - Hierarchical DePIN sections
  - `depinpoolpkey` - DePIN pool public key
  - `dumpextkeypq` - Master post-quantum extended private key (PQ wallet build)
  - `exportxpqpub` - Batch of ML-DSA-44 public keys (PQ wallet build)
- Node compatibility notes in the README.

### Fixed

- `getRPC` now rejects JSON-RPC errors that arrive with HTTP 200 (previously
  it resolved `undefined`, silently swallowing the error object).
- All documentation examples now use Neurai's real ports instead of
  Ravencoin's: standard RPC 19001 (was 8766) and P2P 19000 (was 8767 in
  `addnode`/`disconnectnode` examples).

### Changed

- `docs.json` fully re-synchronized against a node at today's HEAD: 61
  existing entries refreshed, including `depinclearmsg` (new `scope`
  parameter), `createrawtransaction` (new `refinputs` parameter, NIP-014 v3
  transactions, node from April 2026) and `getaddressdeltas` (wildcard `*`
  asset name).
- Build switched from parcel to tsup with two entries (`.` and `./depin`),
  each shipping ESM (`.mjs`), CJS (`.cjs`) and type declarations; `exports`
  map rewritten with `types`/`import`/`require` conditions per entry.
- Dropped the now-unused parcel toolchain and `buffer` polyfill from
  devDependencies and pinned esbuild to a patched version via `overrides` —
  `npm audit` reports 0 vulnerabilities.
- `files` whitelist added to `package.json` (internal working notes and tests
  are no longer published).
- Fixed the `create-docs` npm script (`node createDocs.mjs`).

## [0.4.6] - 2025-12-10

### Fixed
- Clarified the DePIN documentation to distinguish between:
  - the messaging token configured in `depintoken`, which can be any asset
  - the dedicated DePIN asset type used by asset-management RPCs, which uses the `&` prefix in current core
- Corrected examples for the dedicated DePIN asset-management RPCs.

### Changed
- Documented the dedicated DePIN asset behavior for package consumers as enabled on mainnet and testnet, with `units=0` on issue/reissue.
- Added missing RPC documentation for `listdepinaddresses` and `listpqaddresses`.

## [0.4.5] - 2025-12-09

### Added
- 13 new RPC commands for the DePIN (Decentralized Physical Infrastructure Networks) system:

  **DePIN Asset Management:**
  - `checkdepinvalidity` - Verify whether a DePIN asset is valid for an address
  - `listdepinholders` - List all holders of a DePIN asset with their validity status
  - `freezedepin` - Freeze a DePIN asset for an address (owner only)
  - `unfreezedepin` - Unfreeze a DePIN asset (owner only)
  - `selfrevokedepin` - Self-revoke a DePIN asset (holder)

  **DePIN Messaging System:**
  - `depingetmsginfo` - Get messaging system information
  - `depinsendmsg` - Send encrypted messages through a remote gateway (challenge/response)
  - `depinsubmitmsg` - Submit pre-encrypted messages to the local pool
  - `depingetmsg` - Retrieve and decrypt DePIN messages
  - `depinclearmsg` - Remove messages from the pool
  - `depingetpoolcontent` - Inspect the message pool
  - `depinpoolstats` - Get message pool statistics

  **AI/MCP Worker:**
  - `depinmcpstatus` - MCP (Model Context Protocol) worker status

### Changed
- TypeScript configuration updated with `tsconfig.json`.
- Targeting ES2015 for full Promise/Buffer/startsWith support.
- Parcel package versions consolidated to 2.16.3.

### Fixed
- Removed TypeScript compilation warnings.
- Resolved version conflicts in Parcel dependencies.

### Documentation
- Added `DEPIN_IMPLEMENTATION_GUIDE.md` - full technical guide to implement DePIN in web wallets.
- Detailed documentation of the dual-port architecture (8766 RPC + 19002 DePIN).
- Complete code examples with `DePINClient` and `DePINChat` classes.
- Documentation of the shared ECIES encryption protocol.
- Documentation of the challenge/response authentication protocol.

## [0.4.4] - 2025-12-08

### Added
- `getpubkey` command - Retrieve the public key associated with an address
- Specific documentation in `GETPUBKEY.md`
- Test scripts: `test-getpubkey.js` with CLI argument support

### Changed
- Added `@types/node` as a development dependency

## Previous Versions

See repository commits for the full history of changes.

---

## Migration Notes

### From 0.4.5 to 0.4.6

**IMPORTANT**: Distinguish between DePIN messaging tokens and dedicated DePIN assets:

❌ **Incorrect (treating them as the same thing):**
```javascript
const token = 'FRANCE';
await rpc('checkdepinvalidity', [token, address]);
```

✅ **Correct (0.4.6+):**
```javascript
const messagingToken = 'FRANCE';
const depinAsset = '&FRANCE';

// Messaging token for depinmsg can be any asset.
// Dedicated DePIN asset-management commands use the &-prefixed DePIN asset type.
const validity = await rpc('checkdepinvalidity', [depinAsset, address]);
if (!validity.has_asset || validity.valid === 0) {
  throw new Error('Invalid DePIN asset for this address');
}
```

**Updated examples:**
- Messaging token: `FRANCE` can still be any asset
- Dedicated DePIN asset: `&FRANCE`
- Owner token for a dedicated DePIN asset: `&FRANCE!`

### Node configuration

Ensure the following in `neurai.conf`:

```ini
# DePIN Messaging
depinmsg=1
depintoken=YOUR_TOKEN_HERE    # Messaging token, can be any valid asset
depinport=19002
depinmaxmessagesize=1024
depinmessageexpiry=168
depinmaxpoolsize=100

# Asset indexes (required for listdepinholders/listdepinaddresses)
assetindex=1
pubkeyindex=1
```

---

## Links

- [GitHub repository](https://github.com/NeuraiProject/neurai-rpc)
- [NPM Package](https://www.npmjs.com/package/@neuraiproject/neurai-rpc)
- [DePIN documentation](./DEPIN_IMPLEMENTATION_GUIDE.md)
- [Issues & Support](https://github.com/NeuraiProject/neurai-rpc/issues)
