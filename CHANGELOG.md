# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
