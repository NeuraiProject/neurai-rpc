# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.6] - 2025-12-10

### Fixed
- **IMPORTANT**: Removed an incorrect restriction that required DePIN assets to start with `&`.
  - The Neurai DePIN system can operate with **any asset** on the blockchain.
  - Documentation updated in `docs.json`, `docs.ts`, `DEPIN_IMPLEMENTATION_GUIDE.md`, and `neurai_methods.md`.
  - Examples that showed tokens requiring the `&` prefix were corrected.
  - Affected commands: `checkdepinvalidity`, `listdepinholders`, `freezedepin`, `unfreezedepin`, `selfrevokedepin`.

### Changed
- Updated owner token example from `&ASSET!` to `ASSET!` in the documentation.
- Updated the technical implementation guide (`DEPIN_IMPLEMENTATION_GUIDE.md`) to reflect that any asset can be used.

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

**IMPORTANT**: If you were validating that DePIN tokens start with `&` in your code:

❌ **Incorrect (old code):**
```javascript
if (!token.startsWith('&')) {
  throw new Error('Token must start with &');
}
```

✅ **Correct (0.4.6+):**
```javascript
// DePIN tokens can be any asset on the blockchain
// Do not validate by prefix; use checkdepinvalidity instead
const validity = await rpc('checkdepinvalidity', [token, address]);
if (!validity.has_asset || validity.valid === 0) {
  throw new Error('Invalid DePIN token for this address');
}
```

**Updated examples:**
- `&FRANCE` → may be `FRANCE`, `&FRANCE`, or any other asset
- Owner token: `&ASSET!` → `ASSET!` (no mandatory prefix)

### Node configuration

Ensure the following in `neurai.conf`:

```ini
# DePIN Messaging
depinmsg=1
depintoken=YOUR_TOKEN_HERE    # Any valid asset
depinport=19002
depinmaxmessagesize=1024
depinmessageexpiry=168
depinmaxpoolsize=100

# Asset Index (required for listdepinholders)
assetindex=1
```

---

## Links

- [GitHub repository](https://github.com/NeuraiProject/neurai-rpc)
- [NPM Package](https://www.npmjs.com/package/@neuraiproject/neurai-rpc)
- [DePIN documentation](./DEPIN_IMPLEMENTATION_GUIDE.md)
- [Issues & Support](https://github.com/NeuraiProject/neurai-rpc/issues)
