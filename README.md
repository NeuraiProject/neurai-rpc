# neurai-rpc

A package that will help you do RPC calls from Node.js to your Neurai node, that is your full Neurai node.

Endpoints for locally installed Neurai nodes.

- http://127.0.0.1:19001 for mainnet (Standard RPC, HTTP)
- http://127.0.0.1:19101 for testnet (Standard RPC, HTTP)
- TCP 127.0.0.1:19002 — DePIN Messaging gateway (raw TCP, not HTTP; default of `-depinmsgport` on every network)

Neurai as a service, you don't need your own node

- https://rpc-main.neurai.org/rpc for mainnet
- https://rpc-testnet.neurai.org/rpc for testnet

# Install

```
npm install @neuraiproject/neurai-rpc
```

# Standard RPC Usage

## Example using ES modules

This example uses Neurai as a service from https://rpc-main.neurai.org.

In node.js you need to give the file the ending .mjs for modular JavaScript.
Like `example.mjs`

```
import { getRPC, methods } from "@neuraiproject/neurai-rpc";

const username = "anonymous";
const password = "anonymous";
const URL = "https://rpc-main.neurai.org/rpc";
const rpc = getRPC(username, password, URL);

const params = [];
rpc(methods.getblockcount, params).then(console.log);
```

## Example using CommonJS

```

const { getRPC, methods } = require("@neuraiproject/neurai-rpc");
//methods is a list of all available methods/functions/commands/procedures

const rpc = getRPC("UsernameSecret", "PasswordSecret", "http://localhost:19001");

const promise = rpc(methods.getassetdata, ["ELVIS"]);
promise.catch((e) => {
  console.dir(e);
});

promise.then((response) => {
  console.log(response);
});


```

will print out

```
{ name: 'ELVIS', amount: 1, units: 8, reissuable: 1, has_ipfs: 0 }
```

# DePIN Messaging Usage (Node.js only)

DePIN (Decentralized Physical Infrastructure Network) messaging uses a raw TCP
line protocol on port 19002 — not HTTP — and authenticates with cryptographic
signatures instead of username/password. Because browsers cannot open raw TCP
connections, the DePIN client only works in Node.js and lives in its own
package entry: `@neuraiproject/neurai-rpc/depin`. To use DePIN from a browser
you need an external HTTP/WebSocket proxy in front of the gateway.

## Basic DePIN Example

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin";

// Function to sign messages with your private key
async function signMessage(message) {
  // Implement your signing logic here
  // Return base64-encoded signature
  return "signature_base64";
}

const depinRPC = getDePinRPC(
  { host: "127.0.0.1", port: 19002 },
  {
    token: "&FRANCE",
    address: "NYourAddressHere",
    signMessage: signMessage,
  }
);

// Send a DePIN message (challenge/signature handled automatically)
const result = await depinRPC("depinsendmsg", [
  "&FRANCE",
  "192.168.1.100:19002",
  "Hello team!",
  "NYourAddressHere"
]);
console.log(result);

// Unauthenticated queries need no auth options at all:
const publicRPC = getDePinRPC({ host: "127.0.0.1", port: 19002 });
const info = await publicRPC("depingetmsginfo", []);
```

For complete DePIN examples including error handling and advanced usage, see [DEPIN_EXAMPLES.md](./DEPIN_EXAMPLES.md).

The messaging token configured for a DePIN gateway (`-depinmsgtoken`) must be a dedicated `&ASSET` DePIN asset (e.g. `&FRANCE`). DePIN assets are soulbound, must use `units=0`, and are currently enabled on testnet and regtest only in the node; the same `&` type is what the DePIN asset-management RPCs operate on.

## DePIN Authentication

The gateway uses a challenge-response authentication protocol over the TCP
line protocol:

1. Client sends `AUTH|token|address|MODE` (MODE is `SEND`, `RECEIVE` or `ADMIN`)
2. Server returns `CHALLENGE|<challenge>|<timeout>` (challenge expires, typically 60 seconds)
3. Client signs the mode-specific message with the address key:
   - `DEPIN-SEND|token|address|challenge` for `depinsendmsg`
   - `DEPIN-GET|token|address|challenge` for RECEIVE challenges
   - `DEPIN-CLEAR|token|address|challenge` for `depinclearmsg` (ADMIN, owner only)
4. Client sends the JSON-RPC request with the challenge and signature placed
   where the gateway expects them for that method
5. Server verifies the signature against the address

`getDePinRPC` handles all of this automatically — per-method challenge type,
signature format and parameter placement, requesting a fresh challenge for
every authenticated call (challenges are single-use: the node consumes the
nonce when validating it) and retrying once on challenge expiration. Methods
that the gateway serves
without authentication (`depinreceivemsg`, `depinsubmitmsg`, `depingetmsginfo`,
`depingetpoolcontent`, `depinpoolstats`, `depinmcpstatus`, `depinlistsections`,
`depinpoolpkey`) are sent with their params untouched.

Note: `depingetmsg` over the gateway is currently blocked by a node-side bug
(the gateway reads `fromaddress` from the wrong parameter position for this
method); the client rejects it with a clear error. Use `depinreceivemsg`, or
call `depingetmsg` through the standard RPC port.

## Node compatibility

- `createrawtransaction` with `refinputs` (NIP-014, v3 transactions) requires a node from April 2026 or later.
- `depingetancestorrecipients`, `depinlistsections`, sub-DePIN sections and `depinreceivemsg` pagination (`after_hash`, `limit`) require a node from July 2026 or later.
- `dumpextkeypq` and `exportxpqpub` (post-quantum wallet, ML-DSA-44) require a node built with PQ wallet support (July 2026 or later).
- `depinsendmsg` and `depingetmsg` only exist on nodes built with the DePIN gateway enabled.

## Example list all generated addresses in a Wallet (Raven core)

Use method `listreceivedbyaddress` to receive a list of all generated addresses.
Write the result to a .json file

```
const { getRPC, methods } = require("@neuraiproject/neurai-rpc");
//methods is a list of all available methods/functions/commands/procedures

const method = methods.listreceivedbyaddress;
const minConfirmations = 1;
const includeEmpty = true;

const params = [minConfirmations, includeEmpty];

const rpc = getRPC("UsernameSecret", "PasswordSecret", "http://localhost:19001");

const promise = rpc(method, params);
promise.catch((e) => {
  console.dir(e);
});

promise.then((response) => {
  const addresses = [];
  response.map(function (obj) {
    addresses.push(obj.address);
  });
  writeToFile(addresses);
  console.log("DONE, check out addresses.json");
});

function writeToFile(list){
    const json = JSON.stringify(list, null, 4);
    require("fs").writeFileSync("./addresses.json", json);

}

```

# Methods / commands / Procedure calls

Here is a list of all method/commands [All methods](neurai_methods.md)

In your local Neurai wallet, you can go to

help > debug window > console

type `help`
..and you get a list of all available commands

```
== Addressindex ==
getaddressbalance
getaddressdeltas
getaddressmempool
getaddresstxids
getaddressutxos

== Assets ==
getassetdata "asset_name"
getcacheinfo 
getsnapshot "asset_name" block_height
issue "asset_name" qty "( to_address )" "( change_address )" ( units ) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"
issueunique "root_name" [asset_tags] ( [ipfs_hashes] ) "( to_address )" "( change_address )"
listaddressesbyasset "asset_name" (onlytotal) (count) (start)
listassetbalancesbyaddress "address" (onlytotal) (count) (start)
listassets "( asset )" ( verbose ) ( count ) ( start )
listmyassets "( asset )" ( verbose ) ( count ) ( start ) (confs) 
purgesnapshot "asset_name" block_height
reissue "asset_name" qty "to_address" "change_address" ( reissuable ) ( new_units) "( new_ipfs )" 
transfer "asset_name" qty "to_address" "message" expire_time "change_address" "asset_change_address"
transferfromaddress "asset_name" "from_address" qty "to_address" "message" expire_time "xna_change_address" "asset_change_address"
transferfromaddresses "asset_name" ["from_addresses"] qty "to_address" "message" expire_time "xna_change_address" "asset_change_address"

== Blockchain ==
clearmempool
decodeblock "blockhex"
getbestblockhash
getblock "blockhash" ( verbosity ) 
getblockchaininfo
getblockcount

getblockhash height
getblockhashes timestamp
getblockheader "hash" ( verbose )
getchaintips
getchaintxstats ( nblocks blockhash )
getdifficulty
getmempoolancestors txid (verbose)
getmempooldescendants txid (verbose)
getmempoolentry txid
getmempoolinfo
getpubkey "address"
getrawmempool ( verbose )
getspentinfo
gettxout "txid" n ( include_mempool )
gettxoutproof ["txid",...] ( blockhash )
gettxoutsetinfo
preciousblock "blockhash"
pruneblockchain
savemempool
verifychain ( checklevel nblocks )
verifytxoutproof "proof"

== Control ==
getinfo
getmemoryinfo ("mode")
getrpcinfo
help ( "command" )
stop
uptime

== Depin asset ==
checkdepinvalidity "asset_name" "address"
freezedepin "asset_name" "address" ("change_address")
listdepinholders "asset_name"
selfrevokedepin "asset_name"
unfreezedepin "asset_name" "address" ("change_address")

== Depin messaging ==
depinclearmsg ( "all" | hours ) ( "scope" )
depingetancestorrecipients "token" ( max_results ) ( "stop_at" )
depingetmsg "token" ("ip[:port]"|"fromaddress") ("fromaddress")
depingetmsginfo
depingetpoolcontent ( verbose sender_address recipient_address start_time end_time limit offset )
depinlistsections ( "address" )
depinmcpstatus
depinpoolpkey
depinpoolstats
depinreceivemsg "token" "address" (timestamp) ("after_hash") (limit)
depinsendmsg "token" "ip[:port]" "message" "fromaddress" (port)
depinsubmitmsg "hexmessage"|{"sender":"...","encrypted":"..."}
listdepinaddresses "asset_name" (count) (start)

== Generating ==
generate nblocks ( maxtries )
generatetoaddress nblocks address (maxtries)
getgenerate
setgenerate generate ( genproclimit )

== Messages ==
clearmessages 
sendmessage "channel_name" "ipfs_hash" (expire_time)
subscribetochannel 
unsubscribefromchannel 
viewallmessagechannels 
viewallmessages 

== Mining ==
getblocktemplate ( TemplateRequest )
getkawpowhash "header_hash" "mix_hash" nonce, height, "target"
getmininginfo
getnetworkhashps ( nblocks height )
pprpcsb "header_hash" "mix_hash" "nonce"
prioritisetransaction <txid> <dummy value> <fee delta>
submitblock "hexdata"  ( "dummy" )

== Network ==
addnode "node" "add|remove|onetry"
clearbanned
disconnectnode "[address]" [nodeid]
getaddednodeinfo ( "node" )
getconnectioncount
getnettotals
getnetworkinfo
getpeerinfo
listbanned
ping
setban "subnet" "add|remove" (bantime) (absolute)
setnetworkactive true|false

== Rawtransactions ==
combinerawtransaction ["hexstring",...]
createrawtransaction [{"txid":"id","vout":n},...] {"address":(amount or object),"data":"hex",...}
decoderawtransaction "hexstring"
decodescript "hexstring"
fundrawtransaction "hexstring" ( options )
getrawtransaction "txid" ( verbose )
sendrawtransaction "hexstring" ( allowhighfees )
signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )
testmempoolaccept ["rawtxs"] ( allowhighfees )

== Restricted assets ==
addtagtoaddress tag_name to_address (change_address) (asset_data)
checkaddressrestriction address restricted_name
checkaddresstag address tag_name
checkglobalrestriction restricted_name
freezeaddress asset_name address (change_address) (asset_data)
freezerestrictedasset asset_name (change_address) (asset_data)
getverifierstring restricted_name
issuequalifierasset "asset_name" qty "( to_address )" "( change_address )" ( has_ipfs ) "( ipfs_hash )"
issuerestrictedasset "asset_name" qty "verifier" "to_address" "( change_address )" (units) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"
isvalidverifierstring verifier_string
listaddressesfortag tag_name
listaddressrestrictions address
listglobalrestrictions
listtagsforaddress address
reissuerestrictedasset "asset_name" qty to_address ( change_verifier ) ( "new_verifier" ) "( change_address )" ( new_units ) ( reissuable ) "( new_ipfs )"
removetagfromaddress tag_name to_address (change_address) (asset_data)
transferqualifier "qualifier_name" qty "to_address" ("change_address") ("message") (expire_time) 
unfreezeaddress asset_name address (change_address) (asset_data)
unfreezerestrictedasset asset_name (change_address) (asset_data)

== Restricted ==
viewmyrestrictedaddresses 
viewmytaggedaddresses 

== Rewards ==
cancelsnapshotrequest "asset_name" block_height
distributereward "asset_name" snapshot_height "distribution_asset_name" gross_distribution_amount ( "exception_addresses" ) ("change_address") ("dry_run")
getdistributestatus "asset_name" snapshot_height "distribution_asset_name" gross_distribution_amount ( "exception_addresses" )
getsnapshotrequest "asset_name" block_height
listsnapshotrequests ["asset_name" [block_height]]
requestsnapshot "asset_name" block_height

== Util ==
createmultisig nrequired ["key",...]
estimatefee nblocks
estimatesmartfee conf_target ("estimate_mode")
signmessagewithprivkey "privkey" "message"
validateaddress "address"
verifymessage "address" "signature" "message"

== Wallet ==
abandontransaction "txid"
abortrescan
addmultisigaddress nrequired ["key",...] ( "account" )
addwitnessaddress "address"
backupwallet "destination"
bumpfee has been deprecated on the XNA Wallet.
dumpextkeypq
dumpprivkey "address"
dumpwallet "filename"
encryptwallet "passphrase"
exportxpqpub count ( chain offset )
getaccount "address"
getaccountaddress "account"
getaddressesbyaccount "account"
getbalance ( "account" minconf include_watchonly )
getmasterkeyinfo
getmywords ( "account" )
getnewaddress ( "account" )
getrawchangeaddress
getreceivedbyaccount "account" ( minconf )
getreceivedbyaddress "address" ( minconf )
gettransaction "txid" ( include_watchonly )
getunconfirmedbalance
getwalletinfo
importaddress "address" ( "label" rescan p2sh )
importmulti "requests" ( "options" )
importprivkey "privkey" ( "label" ) ( rescan )
importprunedfunds
importpubkey "pubkey" ( "label" rescan )
importwallet "filename"
keypoolrefill ( newsize )
listaccounts ( minconf include_watchonly)
listaddressgroupings
listlockunspent
listpqaddresses
listreceivedbyaccount ( minconf include_empty include_watchonly)
listreceivedbyaddress ( minconf include_empty include_watchonly)
listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )
listtransactions ( "account" count skip include_watchonly)
listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] [query_options])
listwallets
lockunspent unlock ([{"txid":"txid","vout":n},...])
move "fromaccount" "toaccount" amount ( minconf "comment" )
removeprunedfunds "txid"
rescanblockchain ("start_height") ("stop_height")
sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )
sendfromaddress "from_address" "to_address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode")
sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] replaceable conf_target "estimate_mode")
sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode")
setaccount "address" "account"
settxfee amount
signmessage "address" "message"
```
