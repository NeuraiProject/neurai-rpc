# DePIN protocol 2 examples

All calls use the normal authenticated HTTP JSON-RPC endpoint.

```js
import { getRPC, methods } from "@neuraiproject/neurai-rpc";

const rpc = getRPC("username", "password", "http://127.0.0.1:19001");
const address = "NXholder...";
const token = "&FRANCE/GENERAL";
```

## Pool information

```js
const info = await rpc(methods.depingetmsginfo, []);
const stats = await rpc(methods.depinpoolstats, []);
```

Pin `info.depinpoolpkey` on first use. Use it to verify pool signatures and to
encrypt envelopes submitted through `depinsubmitmsg`.

## Send with the local wallet

```js
const result = await rpc(methods.depinsendmsg, [
  token,
  "Hello team!",
  "NXsender...",
]);
```

`fromaddress` must belong to the node wallet. For a non-custodial remote
client, prepare and sign the message client-side, encrypt its serialized form
for `depingetmsginfo.depinpoolpkey`, and call:

```js
await rpc(methods.depinsubmitmsg, [{
  sender: "NXsender...",
  encrypted: "<ECIES envelope hex>",
}]);
```

## Obtain a receive challenge

```js
const requestProof = await rpc(methods.depinsignrequest, [
  address,
  token,
  "receive",
]);

const challengeReply = await rpc(methods.depinchallenge, [
  token,
  address,
  requestProof.timestamp,
  requestProof.signature,
  "receive",
]);

// Verify challengeReply.poolsig against the pinned pool key first.
const challengeBody = await rpc(methods.depindecrypt, [
  address,
  challengeReply.encrypted,
]);

const challengeProof = await rpc(methods.depinsignchallenge, [
  address,
  token,
  challengeBody.challenge,
  "receive",
]);
```

## Receive messages

```js
const encryptedPage = await rpc(methods.depinreceivemsg, [
  token,
  address,
  challengeBody.challenge,
  challengeProof.signature,
  0,
  "",
  50,
]);

// Verify encryptedPage.poolsig first.
const page = await rpc(methods.depindecrypt, [address, encryptedPage.encrypted]);
console.log(page.messages);
```

The decrypted response can contain `next_challenge`. Sign it for the next page
instead of requesting a new challenge.

## List sections

```js
const publicSections = await rpc(methods.depinlistsections, []);

const encryptedSections = await rpc(methods.depinlistsections, [
  address,
  token,
  challengeBody.challenge,
  challengeProof.signature,
]);
```

Challenges are single-use. Obtain a fresh one if a previous call consumed it.

## Clear messages as an owner

Repeat the challenge flow with type `admin`, then call:

```js
await rpc(methods.depinclearmsg, [
  token,
  "NXowner...",
  adminChallenge,
  adminSignature,
  "all",
]);
```

Use an empty scope for the configured pool root. Omit the final mode to remove
expired messages, use `"all"` for every message, or pass an age in hours. The
challenge must have been issued for exactly the same scope.
