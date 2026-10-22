# Integrating DePIN RPC 5

Use neurai-depin-msg 4.x for authentication, encryption and message validation; neurai-rpc 0.8.x provides HTTP transport, exact numeric JSON and the updated catalog. [Runnable composition examples](DEPIN_EXAMPLES.md) describe the request arguments.

1. Bootstrap with a fresh request ID. Bind the reply to the local request hash and expected genesis, then verify the pool key/root under explicit pinning or TOFU policy. Never silently re-pin.
2. Keep the verified instance and membership revision. Sign the full method, arguments and context for every addressed operation, including submit and challenge issuance.
3. Verify each response's request hash, service identity, confidentiality kind, membership metadata and signature before parsing or decrypting it.
4. Resolve recipient addresses and keys from a verified directory. Preserve exact destination identities: Legacy and ECDSA addresses sharing one key are different permissions. Use typed recipients for ECIES 2. A directory signature does not independently prove asset ownership.
5. Use admission-sequence cursors, retaining all six fields and exact integer values. Persisting a cursor also requires retaining its corresponding local history. A membership change does not itself reset the stream.
6. On a verified `membership_stale`, refresh the directory and renew every cached receive/admin challenge for the old pool revision. Re-encrypt and re-sign an affected send. Bound retries; never automatically replay an ambiguous submit or clear result.
7. A restart changes the instance. Bootstrap again under the existing pin. A new stream requires restarting pagination with hash deduplication.
8. Handle transport errors separately from signed operation errors. Keep node `error.data` intact; do not manufacture a signed wrapper in a proxy.

## Relay requirements

Forward one complete request object unchanged. Expose `depinreceiveseq` and the other nine public messaging RPCs. Never expose `depinsignrpc` or local wallet decryption/sending helpers. Do not cache any request-bound response, including public bootstrap/directory/sections: the response contains a unique request hash and the live pool signature/context.

When several node backends are configured, route private requests to the matching genesis, pool key, root and instance. An unrelated healthy node cannot replace that destination. Discovery metadata is advisory; the client still verifies the final response. Do not broadcast private requests or retry writes during failover.

Use a lossless parser/serializer for sequence numbers. Reject duplicate JSON keys and numeric-object impersonation. Preserve invalid lexical numeric tokens so the node can reject them rather than normalizing a signed request silently.

HTTP and WSS need the same checks. The wallet service exposes `depin.receive_seq` as the WSS alias of `depinreceiveseq`; WSS node errors carry `node_code` and `data` inside the transport error. A valid node RPC response remains opaque to the relay.

## Scope and migration

The protocol accepts canonical Legacy and strict ECDSA v3 addresses. PQ encryption/key publication is deferred. ESP32 authentication firmware and its separate library require a later migration; do not reuse old DEPIN-REQ/GET/CLEAR authentication strings.

Canonical Legacy ECIES 1 history is retained. RPC 2/3/4 authentication is rejected. Noncanonical recipient ordering emitted by some older SDK versions is also rejected by the current strict parser. ECIES 2 adds typed identities for mixed/ECDSA recipients; state format 2 and cursor format 1 do not change with RPC 5.

The RPC method catalog includes local wallet/admin commands. Use an explicit whitelist for a public service rather than exporting the whole catalog. Publishing packages or deploying services is a separate operator action.
