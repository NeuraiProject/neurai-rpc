# DePIN RPC Examples

Practical examples for the DePIN messaging client in
`@neuraiproject/neurai-rpc`.

> **Node.js only.** The DePIN gateway (default port 19002) speaks a raw TCP
> line protocol — not HTTP — so this client uses `node:net` sockets and lives
> in its own package entry. Browsers cannot open raw TCP connections; from a
> browser, talk to the node's standard HTTP RPC port instead (see
> `DEPIN_IMPLEMENTATION_GUIDE_EN.md` §4), or put an HTTP/WebSocket proxy in
> front of the gateway.

## Basic Setup

```javascript
import { getRPC, methods } from "@neuraiproject/neurai-rpc";
import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin";

// Standard RPC (HTTP) — works in Node.js and browsers
const standardRpc = getRPC("user", "password", "http://localhost:19001");

// DePIN gateway (raw TCP) — Node.js only
const depinRpc = getDePinRPC(
  { host: "127.0.0.1", port: 19002 },
  {
    token: "&FRANCE",
    address: "NXyouraddress...",
    signMessage: async (message) => {
      // Sign with the standard RPC (wallet must hold the address key),
      // or with any other wallet integration that returns base64.
      return await standardRpc(methods.signmessage, [
        "NXyouraddress...",
        message,
      ]);
    },
  }
);
```

The second argument is optional: without auth options the client can still
call every gateway method that the server serves without authentication
(`depinreceivemsg`, `depinsubmitmsg`, `depingetmsginfo`, `depingetpoolcontent`,
`depinpoolstats`, `depinmcpstatus`, `depinlistsections`, `depinpoolpkey`).

```javascript
const publicRpc = getDePinRPC({ host: "127.0.0.1", port: 19002 });
const info = await publicRpc("depingetmsginfo", []);
```

## Example 1: Send a DePIN Message

`depinsendmsg` needs a SEND challenge. The client requests it, signs
`DEPIN-SEND|token|address|challenge` with your `signMessage`, appends
challenge and signature where the gateway expects them, and retries once
automatically if the challenge expired.

```javascript
const result = await depinRpc("depinsendmsg", [
  "&FRANCE",              // token
  "192.168.1.100:19002", // destination gateway ip[:port]
  "Hello team!",         // message
  "NXyouraddress...",    // fromaddress — must be the authenticated address
]);
console.log(result);
```

If you omit `fromaddress` (3 params), the client fills it in with the
authenticated address.

## Example 2: Retrieve Messages with Pagination

`depinreceivemsg` is served without authentication and supports pagination
(node from July 2026+):

```javascript
// Everything for the address
const all = await depinRpc("depinreceivemsg", ["&FRANCE", "NXyouraddress..."]);

// Pages of 50, resuming after the last received hash
let afterHash = "";
while (true) {
  const page = await depinRpc("depinreceivemsg", [
    "&FRANCE",
    "NXyouraddress...",
    0,          // timestamp filter (0 = no filter)
    afterHash,  // "" starts from the beginning
    50,         // limit
  ]);
  if (!page || page.length === 0) break;
  process(page);
  afterHash = page[page.length - 1].hash;
}
```

> `depingetmsg` over the gateway is currently blocked by a node-side bug and
> the client rejects it with a clear error. Use `depinreceivemsg` (above), or
> call `depingetmsg` through the standard RPC port:
> `standardRpc(methods.depingetmsg, ["&FRANCE"])`.

## Example 3: Submit a Pre-encrypted Message

```javascript
const result = await depinRpc("depinsubmitmsg", [
  "48656c6c6f...", // hex-encoded encrypted message
]);
```

## Example 4: Clear Messages (ADMIN, owner only)

`depinclearmsg` over the gateway requires an ADMIN challenge signed as
`DEPIN-CLEAR|token|address|challenge` by an owner of the token (or of an
ancestor). The client inserts your address into the parameters the way the
gateway expects — you only pass the mode and optional scope:

```javascript
// Remove expired messages
await depinRpc("depinclearmsg", []);

// Remove ALL messages
await depinRpc("depinclearmsg", ["all"]);

// Remove messages older than 7 days
await depinRpc("depinclearmsg", [168]);

// Restrict the purge to one section's subtree — the ADMIN challenge is
// requested for that scope automatically
await depinRpc("depinclearmsg", ["all", "&FRANCE/GENERAL"]);
```

## Example 5: Sections and Branch Holders

```javascript
// Section names (full address mode needs the standard RPC port)
const sections = await depinRpc("depinlistsections", []);

// Active holders of a branch with their revealed pubkeys (standard RPC port)
const holders = await standardRpc(methods.depingetancestorrecipients, [
  "&FRANCE/PARIS",
]);
```

## Example 6: Manual Challenge Handling

```javascript
import { requestDePinChallenge } from "@neuraiproject/neurai-rpc/depin";

const challengeData = await requestDePinChallenge(
  { host: "127.0.0.1", port: 19002 },
  {
    token: "&FRANCE",
    address: "NXyouraddress...",
    signMessage: async (m) => "unused-here",
    mode: "SEND", // "SEND" | "RECEIVE" | "ADMIN" (default "RECEIVE")
  }
);

console.log(challengeData.challenge);     // random challenge from the server
console.log(challengeData.timeout);       // seconds until it expires
console.log(challengeData.messageToSign); // e.g. "DEPIN-SEND|&FRANCE|NX...|abc123"
```

Note: `mode` is only honored here. `getDePinRPC` derives the challenge type
from the method being called and rejects a conflicting `mode` in its auth
options.

## Example 7: Error Handling

```javascript
try {
  await depinRpc("depinsendmsg", ["&FRANCE", "10.0.0.1", "hi", "NXaddr..."]);
} catch (e) {
  if (e.type === "DePinRequestError") {
    // Transport problem: gateway unreachable, timeout, connection closed…
    console.error("Transport:", e.error);
  } else if (e.error) {
    // JSON-RPC error from the gateway/node
    console.error("RPC:", e.description);
  }
}
```

The client raises a clear error, without touching the network, when:

- the target is not `{ host, port }` (URL strings are rejected),
- an authenticated method is called on a client built without auth options,
- `depingetmsg` is attempted over the gateway (node-side bug, see README),
- `fromaddress` in `depinsendmsg` differs from the authenticated address.

## Notes

- One TCP connection per request; the request is a single line terminated by
  `\n` and the response is read up to the first `\n` (30 s timeout, matching
  the node's `DEPIN_SOCKET_TIMEOUT`).
- Challenges are single-use — the node consumes the nonce when it validates
  it — so the client requests a fresh challenge for every authenticated call;
  an expired-challenge error triggers one automatic retry (with a new nonce).
- The messaging token (`-depinmsgtoken`) must be a dedicated `&ASSET` DePIN
  asset (soulbound, `units=0`), currently testnet/regtest only in the node —
  the same type the DePIN asset RPCs operate on.
