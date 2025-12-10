# neurai-rpc

A package that will help you do RPC calls from Node.js to your Neurai node, that is your full Neurai node.

URLs for locally installed Neurai nodes.

- http://127.0.0.1:19001 for mainnet (Standard RPC)
- http://127.0.0.1:19002 for mainnet (DePIN Messaging)
- http://127.0.0.1:19101 for testnet (Standard RPC)
- http://127.0.0.1:19102 for testnet (DePIN Messaging)

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

# DePIN Messaging Usage

DePIN (Decentralized Physical Infrastructure Network) messaging uses port 19002 and requires cryptographic signature authentication instead of username/password.

## Basic DePIN Example

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

// Function to sign messages with your private key
async function signMessage(message) {
  // Implement your signing logic here
  // Return base64-encoded signature
  return "signature_base64";
}

const depinRPC = await getDePinRPC({
  depinUrl: "http://localhost:19002",
  address: "NYourAddressHere",
  signMessage: signMessage
});

// Send a DePIN message
const result = await depinRPC("depinsendmsg", ["SEND", "ipfs_hash", 3600]);
console.log(result);
```

For complete DePIN examples including browser wallet integration, error handling, and advanced usage, see [DEPIN_EXAMPLES.md](./DEPIN_EXAMPLES.md).

## DePIN Authentication

Port 19002 uses a challenge-response authentication protocol:

1. Client requests a challenge from the server
2. Server returns a random challenge string with expiration time (60 seconds)
3. Client signs the challenge with their private key
4. Client sends RPC request with address and signature
5. Server verifies the signature against the address

The `getDePinRPC` function handles this authentication flow automatically, including challenge caching and automatic retry on expiration.

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
submitblock "hexdata" ( "dummy" )

== Network ==
addnode "node" "add|remove|onetry"
clearbanned
disconnectnode "[address]" [nodeid]
getaddednodeinfo ( "node" )
getconnectioncount
getnettotals
getnetworkinfo
getpeerinfo
getpubkey "address"
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
dumpprivkey "address"
dumpwallet "filename"
encryptwallet "passphrase"
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
listreceivedbyaccount ( minconf include_empty include_watchonly)
listreceivedbyaddress ( minconf include_empty include_watchonly)
listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )
listtransactions ( "account" count skip include_watchonly)
listunspent ( minconf maxconf ["addresses",...] [include_unsafe] [query_options])
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
