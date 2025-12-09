
interface IMethods{
    abandontransaction: string;
abortrescan: string;
addmultisigaddress: string;
addnode: string;
addtagtoaddress: string;
addwitnessaddress: string;
backupwallet: string;
bumpfee: string;
cancelsnapshotrequest: string;
checkaddressrestriction: string;
checkaddresstag: string;
checkdepinvalidity: string;
checkglobalrestriction: string;
clearbanned: string;
clearmempool: string;
clearmessages: string;
combinerawtransaction: string;
createmultisig: string;
createrawtransaction: string;
decodeblock: string;
decoderawtransaction: string;
decodescript: string;
depinclearmsg: string;
depingetmsg: string;
depingetmsginfo: string;
depingetpoolcontent: string;
depinmcpstatus: string;
depinpoolstats: string;
depinsendmsg: string;
depinsubmitmsg: string;
disconnectnode: string;
distributereward: string;
dumpprivkey: string;
dumpwallet: string;
encryptwallet: string;
estimatefee: string;
estimatesmartfee: string;
freezeaddress: string;
freezedepin: string;
freezerestrictedasset: string;
fundrawtransaction: string;
generate: string;
generatetoaddress: string;
getaccount: string;
getaccountaddress: string;
getaddednodeinfo: string;
getaddressbalance: string;
getaddressdeltas: string;
getaddressesbyaccount: string;
getaddressmempool: string;
getaddresstxids: string;
getaddressutxos: string;
getassetdata: string;
getbalance: string;
getbestblockhash: string;
getblock: string;
getblockchaininfo: string;
getblockcount: string;
getblockhash: string;
getblockhashes: string;
getblockheader: string;
getblocktemplate: string;
getcacheinfo: string;
getchaintips: string;
getchaintxstats: string;
getconnectioncount: string;
getdifficulty: string;
getdistributestatus: string;
getgenerate: string;
getinfo: string;
getkawpowhash: string;
getmasterkeyinfo: string;
getmemoryinfo: string;
getmempoolancestors: string;
getmempooldescendants: string;
getmempoolentry: string;
getmempoolinfo: string;
getmininginfo: string;
getmywords: string;
getnettotals: string;
getnetworkhashps: string;
getnetworkinfo: string;
getnewaddress: string;
getpeerinfo: string;
getpubkey: string;
getrawchangeaddress: string;
getrawmempool: string;
getrawtransaction: string;
getreceivedbyaccount: string;
getreceivedbyaddress: string;
getrpcinfo: string;
getsnapshot: string;
getsnapshotrequest: string;
getspentinfo: string;
gettransaction: string;
gettxout: string;
gettxoutproof: string;
gettxoutsetinfo: string;
getunconfirmedbalance: string;
getverifierstring: string;
getwalletinfo: string;
help: string;
importaddress: string;
importmulti: string;
importprivkey: string;
importprunedfunds: string;
importpubkey: string;
importwallet: string;
issue: string;
issuequalifierasset: string;
issuerestrictedasset: string;
issueunique: string;
isvalidverifierstring: string;
keypoolrefill: string;
listaccounts: string;
listaddressesbyasset: string;
listaddressesfortag: string;
listaddressgroupings: string;
listaddressrestrictions: string;
listassetbalancesbyaddress: string;
listassets: string;
listbanned: string;
listdepinholders: string;
listglobalrestrictions: string;
listlockunspent: string;
listmyassets: string;
listreceivedbyaccount: string;
listreceivedbyaddress: string;
listsinceblock: string;
listsnapshotrequests: string;
listtagsforaddress: string;
listtransactions: string;
listunspent: string;
listwallets: string;
lockunspent: string;
move: string;
ping: string;
pprpcsb: string;
preciousblock: string;
prioritisetransaction: string;
pruneblockchain: string;
purgesnapshot: string;
reissue: string;
reissuerestrictedasset: string;
removeprunedfunds: string;
removetagfromaddress: string;
requestsnapshot: string;
rescanblockchain: string;
savemempool: string;
selfrevokedepin: string;
sendfrom: string;
sendfromaddress: string;
sendmany: string;
sendmessage: string;
sendrawtransaction: string;
sendtoaddress: string;
setaccount: string;
setban: string;
setgenerate: string;
setnetworkactive: string;
settxfee: string;
signmessage: string;
signmessagewithprivkey: string;
signrawtransaction: string;
stop: string;
submitblock: string;
subscribetochannel: string;
testmempoolaccept: string;
transfer: string;
transferfromaddress: string;
transferfromaddresses: string;
transferqualifier: string;
unfreezeaddress: string;
unfreezedepin: string;
unfreezerestrictedasset: string;
unsubscribefromchannel: string;
uptime: string;
validateaddress: string;
verifychain: string;
verifymessage: string;
verifytxoutproof: string;
viewallmessagechannels: string;
viewallmessages: string;
viewmyrestrictedaddresses: string;
viewmytaggedaddresses: string;
}

export const methods:IMethods ={






/** abandontransaction "txid"

Mark in-wallet transaction <txid> as abandoned
This will mark this transaction and all its in-wallet descendants as abandoned which will allow
for their inputs to be respent.  It can be used to replace "stuck" or evicted transactions.
It only works on transactions which are not included in a block and are not currently in the mempool.
It has no effect on transactions which are already conflicted or abandoned.

Arguments:
1. "txid"    (string, required) The transaction id

Result:

Examples:
> neurai-cli abandontransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "abandontransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
abandontransaction:'abandontransaction',





/** abortrescan

Stops current wallet rescan triggered e.g. by an importprivkey call.

Examples:

Import a private key
> neurai-cli importprivkey "mykey"

Abort the running wallet rescan
> neurai-cli abortrescan 

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "abortrescan", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
abortrescan:'abortrescan',





/** addmultisigaddress nrequired ["key",...] ( "account" )

Add a nrequired-to-sign multisignature address to the wallet.
Each key is a Neurai address or hex-encoded public key.
If 'account' is specified (DEPRECATED), assign address to that account.

Arguments:
1. nrequired        (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keys"         (string, required) A json array of neurai addresses or hex-encoded public keys
     [
       "address"  (string) neurai address or hex-encoded public key
       ...,
     ]
3. "account"      (string, optional) DEPRECATED. An account to assign the addresses to.

Result:
"address"         (string) A neurai address associated with the keys.

Examples:

Add a multisig address from 2 addresses
> neurai-cli addmultisigaddress 2 "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
addmultisigaddress:'addmultisigaddress',





/** addnode "node" "add|remove|onetry"

Attempts to add or remove a node from the addnode list.
Or try a connection to a node once.
Nodes added using addnode (or -connect) are protected from DoS disconnection and are not required to be
full nodes/support SegWit as other outbound peers are (though such peers will not be synced from).

Arguments:
1. "node"     (string, required) The node (see getpeerinfo for nodes)
2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

Examples:
> neurai-cli addnode "192.168.0.6:8767" "onetry"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addnode", "params": ["192.168.0.6:8767", "onetry"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
addnode:'addnode',





/** addtagtoaddress tag_name to_address (change_address) (asset_data)

Assign a tag to a address

Arguments:
1. "tag_name"            (string, required) the name of the tag you are assigning to the address, if it doens't have '#' at the front it will be added
2. "to_address"          (string, required) the address that will be assigned the tag
3. "change_address"      (string, optional) The change address for the qualifier token to be sent to
4. "asset_data"          (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the qualifier token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli addtagtoaddress "#TAG" "to_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addtagtoaddress", "params": ["#TAG" "to_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli addtagtoaddress "#TAG" "to_address" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addtagtoaddress", "params": ["#TAG" "to_address" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
addtagtoaddress:'addtagtoaddress',





/** addwitnessaddress "address"

Add a witness address for a script (with pubkey or redeemscript known).
It returns the witness script.

Arguments:
1. "address"       (string, required) An address known to the wallet

Result:
"witnessaddress",  (string) The value of the new address (P2SH of witness script).
}
**/
addwitnessaddress:'addwitnessaddress',





/** backupwallet "destination"

Safely copies current wallet file to destination, which can be a directory or a path with filename.

Arguments:
1. "destination"   (string) The destination directory or file

Examples:
> neurai-cli backupwallet "backup.dat"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backup.dat"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
backupwallet:'backupwallet',





/** bumpfee has been deprecated on the XNA Wallet.**/
bumpfee:'bumpfee',





/** cancelsnapshotrequest "asset_name" block_height

Cancels the specified snapshot request.

Arguments:
1. "asset_name"              (string, required) The asset name for which the snapshot will be taken
2. "block_height"            (number, required) The block height at which the snapshot will be take

Result:
{
  request_status: (string),
}

Examples:
> neurai-cli cancelsnapshotrequest "TRONCO" 12345
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "cancelsnapshotrequest", "params": ["PHATSTACKS" 34987] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
cancelsnapshotrequest:'cancelsnapshotrequest',





/** checkaddressrestriction address restricted_name

Checks to see if an address has been frozen by the given restricted asset

Arguments:
1. "address"          (string, required) the XNA address to search
1. "restricted_name"   (string, required) the restricted asset to search

Result:
"true/false", (boolean) If the address is frozen

Examples:
> neurai-cli checkaddressrestriction "address" "restricted_name"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "checkaddressrestriction", "params": ["address" "restricted_name"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
checkaddressrestriction:'checkaddressrestriction',





/** checkaddresstag address tag_name

Checks to see if an address has the given tag

Arguments:
1. "address"          (string, required) the XNA address to search
1. "tag_name"         (string, required) the tag to search

Result:
"true/false", (boolean) If the address has the tag

Examples:
> neurai-cli checkaddresstag "address" "tag_name"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "checkaddresstag", "params": ["address" "tag_name"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
checkaddresstag:'checkaddresstag',





/** checkdepinvalidity "asset_name" "address"

Check if a DEPIN asset is valid/active for a specific address

Arguments:
1. "asset_name"      (string, required) The DEPIN asset name (must start with &)
2. "address"         (string, required) The address to check

Result:
{
  "has_asset": true|false,      (boolean) Whether the address holds the asset
  "amount": n,                  (numeric) The amount (if has_asset is true)
  "valid": 1|0,                 (numeric) 1 = active/valid, 0 = blocked/revoked (if has_asset is true)
  "blocked": true|false         (boolean) Whether the asset is blocked (if has_asset is true)
}

Examples:
> neurai-cli checkdepinvalidity "&FRANCE" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "checkdepinvalidity", "params": ["&FRANCE", "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
checkdepinvalidity:'checkdepinvalidity',





/** checkglobalrestriction restricted_name

Checks to see if a restricted asset is globally frozen

Arguments:
1. "restricted_name"   (string, required) the restricted asset to search

Result:
"true/false", (boolean) If the restricted asset is frozen globally

Examples:
> neurai-cli checkglobalrestriction "restricted_name"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "checkglobalrestriction", "params": ["restricted_name"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
checkglobalrestriction:'checkglobalrestriction',





/** clearbanned

Clear all banned IPs.

Examples:
> neurai-cli clearbanned 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
clearbanned:'clearbanned',





/** clearmempool

Removes all transaction from the mempool

Examples:
> neurai-cli clearmempool 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearmempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
clearmempool:'clearmempool',





/** clearmessages 

Delete current database of messages

Result:[

]

Examples:
> neurai-cli clearmessages 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearmessages", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
clearmessages:'clearmessages',





/** combinerawtransaction ["hexstring",...]

Combine multiple partially signed transactions into one transaction.
The combined transaction may be another partially signed transaction or a 
fully signed transaction.
Arguments:
1. "txs"         (string) A json array of hex strings of partially signed transactions
    [
      "hexstring"     (string) A transaction hash
      ,...
    ]

Result:
"hex"            (string) The hex-encoded raw transaction with signature(s)

Examples:
> neurai-cli combinerawtransaction ["myhex1", "myhex2", "myhex3"]
**/
combinerawtransaction:'combinerawtransaction',





/** createmultisig nrequired ["key",...]

Creates a multi-signature address with n signature of m keys required.
It returns a json object with the address and redeemScript.

Arguments:
1. nrequired      (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keys"       (string, required) A json array of keys which are neurai addresses or hex-encoded public keys
     [
       "key"    (string) neurai address or hex-encoded public key
       ,...
     ]

Result:
{
  "address":"multisigaddress",  (string) The value of the new multisig address.
  "redeemScript":"script"       (string) The string value of the hex-encoded redemption script.
}

Examples:

Create a multisig address from 2 addresses
> neurai-cli createmultisig 2 "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
createmultisig:'createmultisig',





/** createrawtransaction [{"txid":"id","vout":n},...] {"address":(amount or object),"data":"hex",...}
                     ( locktime ) ( replaceable )

Create a transaction spending the given inputs and creating new outputs.
Outputs are addresses (paired with a XNA amount, data or object specifying an asset operation) or data.
Returns hex-encoded raw transaction.
Note that the transaction's inputs are not signed, and
it is not stored in the wallet or transmitted to the network.

Paying for Asset Operations:
  Some operations require an amount of XNA to be sent to a burn address:

    Operation          Amount + Burn Address
    transfer                 0
    transferwithmessage      0
    issue                  500 to RXissueAssetXXXXXXXXXXXXXXXXXhhZGt
    issue (subasset)       100 to RXissueSubAssetXXXXXXXXXXXXXWcwhwL
    issue_unique             5 to RXissueUniqueAssetXXXXXXXXXXWEAe58
    reissue                100 to RXReissueAssetXXXXXXXXXXXXXXVEFAWu
    issue_restricted      1500 to RXissueRestrictedXXXXXXXXXXXXzJZ1q
    reissue_restricted     100 to RXReissueAssetXXXXXXXXXXXXXXVEFAWu
    issue_qualifier       1000 to RXissueQuaLifierXXXXXXXXXXXXUgEDbC
    issue_qualifier (sub)  100 to RXissueSubQuaLifierXXXXXXXXXVTzvv5
    tag_addresses          0.1 to RXaddTagBurnXXXXXXXXXXXXXXXXZQm5ya (per address)
    untag_addresses        0.1 to RXaddTagBurnXXXXXXXXXXXXXXXXZQm5ya (per address)
    freeze_addresses         0
    unfreeze_addresses       0
    freeze_asset             0
    unfreeze_asset           0

Assets For Authorization:
  These operations require a specific asset input for authorization:
    Root Owner Token:
      reissue
      issue_unique
      issue_restricted
      reissue_restricted
      freeze_addresses
      unfreeze_addresses
      freeze_asset
      unfreeze_asset
    Root Qualifier Token:
      issue_qualifier (when issuing subqualifier)
    Qualifier Token:
      tag_addresses
      untag_addresses

Output Ordering:
  Asset operations require the following:
    1) All coin outputs come first (including the burn output).
    2) The owner token change output comes next (if required).
    3) An issue, reissue, or any number of transfers comes last
       (different types can't be mixed in a single transaction).

Arguments:
1. "inputs"                                (array, required) A json array of json objects
     [
       {
         "txid":"id",                      (string, required) The transaction id
         "vout":n,                         (number, required) The output number
         "sequence":n                      (number, optional) The sequence number
       } 
       ,...
     ]
2. "outputs"                               (object, required) a json object with outputs
     {
       "address":                          (string, required) The destination neurai address.
                                               Each output must have a different address.
         x.xxx                             (number or string, required) The XNA amount
           or
         {                                 (object) A json object of assets to send
           "transfer":
             {
               "asset-name":               (string, required) asset name
               asset-quantity              (number, required) the number of raw units to transfer
               ,...
             }
         }
           or
         {                                 (object) A json object of describing the transfer and message contents to send
           "transferwithmessage":
             {
               "asset-name":              (string, required) asset name
               asset-quantity,            (number, required) the number of raw units to transfer
               "message":"hash",          (string, required) ipfs hash or a txid hash
               "expire_time": n           (number, required) utc time in seconds to expire the message
             }
         }
           or
         {                                 (object) A json object describing new assets to issue
           "issue":
             {
               "asset_name":"asset-name",  (string, required) new asset name
               "asset_quantity":n,         (number, required) the number of raw units to issue
               "units":[1-8],              (number, required) display units, between 1 (integral) to 8 (max precision)
               "reissuable":[0-1],         (number, required) 1=reissuable asset
               "has_ipfs":[0-1],           (number, required) 1=passing ipfs_hash
               "ipfs_hash":"hash"          (string, optional) an ipfs hash for discovering asset metadata
             }
         }
           or
         {                                 (object) A json object describing new unique assets to issue
           "issue_unique":
             {
               "root_name":"root-name",         (string, required) name of the asset the unique asset(s) 
                                                      are being issued under
               "asset_tags":["asset_tag", ...], (array, required) the unique tag for each asset which is to be issued
               "ipfs_hashes":["hash", ...],     (array, optional) ipfs hashes corresponding to each supplied tag 
                                                      (should be same size as "asset_tags")
             }
         }
           or
         {                                 (object) A json object describing follow-on asset issue.
           "reissue":
             {
               "asset_name":"asset-name", (string, required) name of asset to be reissued
               "asset_quantity":n,          (number, required) the number of raw units to issue
               "reissuable":[0-1],          (number, optional) default is 1, 1=reissuable asset
               "ipfs_hash":"hash",        (string, optional) An ipfs hash for discovering asset metadata, 
                                                Overrides the current ipfs hash if given
               "owner_change_address"       (string, optional) the address where the owner token will be sent to. 
                                                If not given, it will be sent to the output address
             }
         }
           or
         {                                 (object) A json object describing how restricted asset to issue
           "issue_restricted":
             {
               "asset_name":"asset-name",(string, required) new asset name
               "asset_quantity":n,         (number, required) the number of raw units to issue
               "verifier_string":"text", (string, required) the verifier string to be used for a restricted 
                                               asset transfer verification
               "units":[0-8],              (number, required) display units, between 0 (integral) and 8 (max precision)
               "reissuable":[0-1],         (number, required) 1=reissuable asset
               "has_ipfs":[0-1],           (number, required) 1=passing ipfs_hash
               "ipfs_hash":"hash",       (string, optional) an ipfs hash for discovering asset metadata
               "owner_change_address"      (string, optional) the address where the owner token will be sent to. 
                                               If not given, it will be sent to the output address
             }
         }
           or
         {                                 (object) A json object describing follow-on asset issue.
           "reissue_restricted":
             {
               "asset_name":"asset-name", (string, required) name of asset to be reissued
               "asset_quantity":n,          (number, required) the number of raw units to issue
               "reissuable":[0-1],          (number, optional) default is 1, 1=reissuable asset
               "verifier_string":"text",  (string, optional) the verifier string to be used for a restricted asset 
                                                transfer verification
               "ipfs_hash":"hash",        (string, optional) An ipfs hash for discovering asset metadata, 
                                                Overrides the current ipfs hash if given
               "owner_change_address"       (string, optional) the address where the owner token will be sent to. 
                                                If not given, it will be sent to the output address
             }
         }
           or
         {                                 (object) A json object describing a new qualifier to issue.
           "issue_qualifier":
             {
               "asset_name":"asset_name", (string, required) a qualifier name (starts with '#')
               "asset_quantity":n,          (numeric, optional, default=1) the number of units to be issued (1 to 10)
               "has_ipfs":[0-1],            (boolean, optional, default=false), whether ifps hash is going 
                                                to be added to the asset
               "ipfs_hash":"hash",        (string, optional but required if has_ipfs = 1), an ipfs hash or a 
                                                txid hash once RIP5 is activated
               "root_change_address"        (string, optional) Only applies when issuing subqualifiers.
                                                The address where the root qualifier will be sent.
                                                If not specified, it will be sent to the output address.
               "change_quantity":"qty"    (numeric, optional) the asset change amount (defaults to 1)
             }
         }
           or
         {                                 (object) A json object describing addresses to be tagged.
                                             The address in the key will used as the asset change address.
           "tag_addresses":
             {
               "qualifier":"qualifier",          (string, required) a qualifier name (starts with '#')
               "addresses":["addr", ...],        (array, required) the addresses to be tagged (up to 10)
               "change_quantity":"qty",          (numeric, optional) the asset change amount (defaults to 1)
             }
         }
           or
         {                                 (object) A json object describing addresses to be untagged.
                                             The address in the key will be used as the asset change address.
           "untag_addresses":
             {
               "qualifier":"qualifier",          (string, required) a qualifier name (starts with '#')
               "addresses":["addr", ...],        (array, required) the addresses to be untagged (up to 10)
               "change_quantity":"qty",          (numeric, optional) the asset change amount (defaults to 1)
             }
         }
           or
         {                                 (object) A json object describing addresses to be frozen.
                                             The address in the key will used as the owner change address.
           "freeze_addresses":
             {
               "asset_name":"asset_name",        (string, required) a restricted asset name (starts with '$')
               "addresses":["addr", ...],        (array, required) the addresses to be frozen (up to 10)
             }
         }
           or
         {                                 (object) A json object describing addresses to be frozen.
                                             The address in the key will be used as the owner change address.
           "unfreeze_addresses":
             {
               "asset_name":"asset_name",        (string, required) a restricted asset name (starts with '$')
               "addresses":["addr", ...],        (array, required) the addresses to be untagged (up to 10)
             }
         }
           or
         {                                 (object) A json object describing an asset to be frozen.
                                             The address in the key will used as the owner change address.
           "freeze_asset":
             {
               "asset_name":"asset_name",        (string, required) a restricted asset name (starts with '$')
             }
         }
           or
         {                                 (object) A json object describing an asset to be frozen.
                                             The address in the key will be used as the owner change address.
           "unfreeze_asset":
             {
               "asset_name":"asset_name",        (string, required) a restricted asset name (starts with '$')
             }
         }
           or
       "data": "hex"                       (string, required) The key is "data", the value is hex encoded data
       ,...
     }
3. locktime                  (numeric, optional, default=0) Raw locktime. Non-0 value also locktime-activates inputs

Result:
"transaction"              (string) hex string of the transaction

Examples:
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0}]" "{\"address\":0.01}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0}]" "{\"data\":\"00010203\"}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0}]" "{\"RXissueAssetXXXXXXXXXXXXXXXXXhhZGt\":500,\"change_address\":change_amount,\"issuer_address\":{\"issue\":{\"asset_name\":\"MYASSET\",\"asset_quantity\":1000000,\"units\":1,\"reissuable\":0,\"has_ipfs\":1,\"ipfs_hash\":\"43f81c6f2c0593bde5a85e09ae662816eca80797\"}}}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0}]" "{\"RXissueRestrictedXXXXXXXXXXXXzJZ1q\":1500,\"change_address\":change_amount,\"issuer_address\":{\"issue_restricted\":{\"asset_name\":\"$MYASSET\",\"asset_quantity\":1000000,\"verifier_string\":\"#TAG & !KYC\",\"units\":1,\"reissuable\":0,\"has_ipfs\":1,\"ipfs_hash\":\"43f81c6f2c0593bde5a85e09ae662816eca80797\"}}}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0}]" "{\"RXissueUniqueAssetXXXXXXXXXXWEAe58\":20,\"change_address\":change_amount,\"issuer_address\":{\"issue_unique\":{\"root_name\":\"MYASSET\",\"asset_tags\":[\"ALPHA\",\"BETA\"],\"ipfs_hashes\":[\"43f81c6f2c0593bde5a85e09ae662816eca80797\",\"43f81c6f2c0593bde5a85e09ae662816eca80797\"]}}}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0},{\"txid\":\"myasset\",\"vout\":0}]" "{\"address\":{\"transfer\":{\"MYASSET\":50}}}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0},{\"txid\":\"myasset\",\"vout\":0}]" "{\"address\":{\"transferwithmessage\":{\"MYASSET\":50,\"message\":\"hash\",\"expire_time\": utc_time}}}"
> neurai-cli createrawtransaction "[{\"txid\":\"mycoin\",\"vout\":0},{\"txid\":\"myownership\",\"vout\":0}]" "{\"issuer_address\":{\"reissue\":{\"asset_name\":\"MYASSET\",\"asset_quantity\":2000000}}}"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": ["[{\"txid\":\"mycoin\",\"vout\":0}]", "{\"data\":\"00010203\"}"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
createrawtransaction:'createrawtransaction',





/** decodeblock "blockhex"

Arguments:
1. "blockhex"          (string, required) The block hex

Result:
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "size" : n,            (numeric) The block size
  "strippedsize" : n,    (numeric) The block size excluding witness data
  "weight" : n           (numeric) The block weight as defined in BIP 141
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
}

Examples:
> neurai-cli decodeblock "xxxx"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodeblock", "params": ["xxxx"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
decodeblock:'decodeblock',





/** decoderawtransaction "hexstring"

Return a JSON object representing the serialized, hex-encoded transaction.

Arguments:
1. "hexstring"      (string, required) The transaction hex string

Result:
{
  "txid" : "id",        (string) The transaction id
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The transaction size
  "vsize" : n,            (numeric) The virtual transaction size (differs from size for witness transactions)
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric) The output number
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "txinwitness": ["hex", ...] (array of string) hex-encoded witness data (if any)
       "sequence": n     (numeric) The script sequence number
     }
     ,...
  ],
  "vout" : [             (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in XNA
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "asset" : {               (json object) optional
           "name" : "name",      (string) the asset name
           "amount" : n,           (numeric) the amount of asset that was sent
           "message" : "message", (string optional) the message if one was sent
           "expire_time" : n,      (numeric optional) the message epoch expiration time if one was set
         "addresses" : [           (json array of string)
           "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (string) neurai address
           ,...
         ]
       }
     }
     ,...
  ],
}

Examples:
> neurai-cli decoderawtransaction "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
decoderawtransaction:'decoderawtransaction',





/** decodescript "hexstring"

Decode a hex-encoded script.

Arguments:
1. "hexstring"     (string) the hex encoded script

Result:
{
  "asm":"asm",   (string) Script public key
  "hex":"hex",   (string) hex encoded public key
  "type":"type", (string) The output type
  "asset" : {               (json object) optional
     "name" : "name",      (string) the asset name
     "amount" : n,           (numeric) the amount of asset that was sent
     "message" : "message", (string optional) the message if one was sent
     "expire_time" : n,      (numeric optional ) the message epoch expiration time if one was set
  "reqSigs": n,    (numeric) The required signatures
  "addresses": [   (json array of string)
     "address"     (string) neurai address
     ,...
  ],
  "p2sh":"address",       (string) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
  "(The following only appears if the script is an asset script)
  "asset_name":"name",      (string) Name of the asset.
  "amount":"x.xx",          (numeric) The amount of assets interacted with.
  "units": n,                (numeric) The units of the asset. (Only appears in the type (new_asset))
  "reissuable": true|false, (boolean) If this asset is reissuable. (Only appears in type (new_asset|reissue_asset))
  "hasIPFS": true|false,    (boolean) If this asset has an IPFS hash. (Only appears in type (new_asset if hasIPFS is true))
  "ipfs_hash": "hash",      (string) The ipfs hash for the new asset. (Only appears in type (new_asset))
  "new_ipfs_hash":"hash",    (string) If new ipfs hash (Only appears in type. (reissue_asset))
}

Examples:
> neurai-cli decodescript "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodescript", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
decodescript:'decodescript',





/** depinclearmsg ( "all" | hours )

Remove messages from DePIN messaging pool

Arguments:
1. mode    (string or numeric, optional) Cleanup mode:
           - omitted: Remove only expired messages (default)
           - "all": Remove ALL messages from pool
           - <hours>: Remove messages older than specified hours (numeric)

Result:
{
  "removed": n,        (numeric) Number of messages removed
  "remaining": n       (numeric) Number of messages remaining
}

Examples:
> neurai-cli depinclearmsg
> neurai-cli depinclearmsg "all"
> neurai-cli depinclearmsg 7
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depinclearmsg", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depinclearmsg:'depinclearmsg',





/** depingetmsg "token" ("ip[:port]"|"fromaddress") ("fromaddress")

Retrieve and decrypt DePIN messages for your addresses

Arguments:
1. "token"        (string, required) Token name
2. "ip[:port]" OR "fromaddress" (string, optional)
                    - IP address with optional port (e.g., "192.168.1.31" or "192.168.1.31:19002")
                    - OR Neurai address for local query with specific address
                    - Omit for local query with all addresses
3. "fromaddress"  (string, optional) Specific address to decrypt with (only if arg 2 is an IP)

Result:
[
  {
    "recipient": "address",      (string) Recipient address (your address)
    "sender": "address",         (string) Sender address
    "message": "text",           (string) Decrypted message
    "timestamp": n,              (numeric) Unix timestamp
    "date": "YYYY-MM-DD HH:MM:SS", (string) Formatted date
    "expires": "YYYY-MM-DD HH:MM:SS" (string) Expiration date
  },
  ...
]

Examples:
> neurai-cli depingetmsg "MYTOKEN"
> neurai-cli depingetmsg "MYTOKEN" "NXyouraddress..."
> neurai-cli depingetmsg "MYTOKEN" "192.168.1.78"
> neurai-cli depingetmsg "MYTOKEN" "192.168.1.78:19002" "NXyouraddress..."
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depingetmsg", "params": ["MYTOKEN"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depingetmsg:'depingetmsg',





/** depingetmsginfo

Returns information about the DePIN messaging system

Result:
{
  "enabled": true|false,        (boolean) Whether DePIN messaging is enabled
  "token": "name",              (string) Active token name
  "port": n,                    (numeric) Listening port
  "maxrecipients": n,           (numeric) Maximum recipients per message
  "maxmessagesize": n,          (numeric) Maximum message size in bytes
  "messageexpiryhours": n,      (numeric) Message expiry time in hours
  "maxpoolsizemb": n,           (numeric) Maximum pool size in MB
  "messages": n,                (numeric) Number of messages in mempool
  "memoryusage": n,             (numeric) Memory usage in bytes
  "memoryusagemb": n,           (numeric) Memory usage in MB
  "oldestmessage": "time",      (string) Timestamp of oldest message
  "newestmessage": "time"       (string) Timestamp of newest message
}

Examples:
> neurai-cli depingetmsginfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depingetmsginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depingetmsginfo:'depingetmsginfo',





/** depingetpoolcontent ( verbose sender_address recipient_address start_time end_time limit offset )

Inspect the contents of the DePIN message pool.

Arguments:
1. verbose           (boolean, "all", or "raw", optional, default=false) Show detailed message structure. Use "all" for all messages, "raw" to show encrypted hex data
2. sender_address    (string, optional) Filter by sender address
3. recipient_address (string, optional) Filter by recipient address
4. start_time        (numeric, optional) Filter messages after timestamp
5. end_time          (numeric, optional) Filter messages before timestamp
6. limit             (numeric, optional, default=100) Maximum messages to return
7. offset            (numeric, optional, default=0) Skip first N messages

Result (verbose=false):
[
  {
    "hash": "hex",
    "sender": "address",
    "timestamp": n,
    "date": "YYYY-MM-DD HH:MM:SS",
    "expires": "YYYY-MM-DD HH:MM:SS",
    "encryption_type": "ECIES_shared",
    "size": n
  },
  ...
]

Examples:
> neurai-cli depingetpoolcontent
> neurai-cli depingetpoolcontent true
> neurai-cli depingetpoolcontent "all"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depingetpoolcontent", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depingetpoolcontent:'depingetpoolcontent',





/** depinmcpstatus

Get status information about the DePIN MCP (AI) worker

Result:
{
  "enabled": true|false,         (boolean) Whether MCP worker is enabled
  "running": true|false,         (boolean) Whether MCP worker is running
  "mcp_url": "url",              (string) MCP server URL
  "model_name": "name",          (string) Name of the loaded AI model
  "command_key": "key",          (string) Command prefix (e.g. /ai)
  "depin_token": "token",        (string) DePIN token being monitored
  "poll_interval": n,            (numeric) Polling interval in seconds
  "commands_processed": n,       (numeric) Total commands processed
  "total_errors": n,             (numeric) Total errors encountered
  "last_poll_time": n            (numeric) Unix timestamp of last poll
}

Examples:
> neurai-cli depinmcpstatus
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depinmcpstatus", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depinmcpstatus:'depinmcpstatus',





/** depinpoolstats

Get statistical analysis of the DePIN message pool.

Result:
{
  "enabled": true|false,
  "token": "string",
  "total_messages": n,
  "total_size_bytes": n,
  "memory_usage_bytes": n,
  "oldest_message": "YYYY-MM-DD HH:MM:SS",
  "newest_message": "YYYY-MM-DD HH:MM:SS",
  "messages_by_age": {
    "last_hour": n,
    "last_day": n,
    "last_week": n
  },
  "unique_senders": n,
  "avg_message_size": n,
  "expiring_in_24h": n
}

Examples:
> neurai-cli depinpoolstats
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depinpoolstats", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depinpoolstats:'depinpoolstats',





/** depinsendmsg "token" "ip[:port]" "message" "fromaddress" (port)

Send an encrypted message through a remote DePIN gateway (challenge/response)

Arguments:
1. "token"        (string, required) Token name
2. "ip[:port]"    (string, required) Target node address (optional :port to contact remote gateway)
3. "message"      (string, required) Message to send (max 1KB)
4. "fromaddress" (string, required) Wallet address used for signing/encryption
5. port           (numeric, optional) Destination message port (defaults to 19002). Only used when specified after fromaddress

Result:
{
  "result": "success",          (string) Status
  "hash": "hash",                (string) Message hash
  "recipients": n,              (numeric) Number of recipients
  "timestamp": n                (numeric) Message timestamp
}

Examples:
> neurai-cli depinsendmsg "MYTOKEN" "192.168.1.100" "Hello team!" "NXsender..."
> neurai-cli depinsendmsg "MYTOKEN" "192.168.1.100:19005" "Hello team!" "NXsender..." 19005
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depinsendmsg", "params": ["MYTOKEN", "192.168.1.100", "Hello team!", "NXsender..."] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depinsendmsg:'depinsendmsg',





/** depinsubmitmsg "hexmessage"

Submit a pre-encrypted and signed DePIN message to the pool

This is the secure protocol where the client prepares the complete message
(encryption + signature) and the server only validates and stores it.

Arguments:
1. "hexmessage"   (string, required) Hex-encoded serialized CDepinMessage

Result:
{
  "result": "success",           (string) Status
  "hash": "hash",                (string) Message hash
  "timestamp": n                  (numeric) Unix timestamp
}

Note: This endpoint is typically called by remote nodes after challenge/response authentication.

Examples:
> neurai-cli depinsubmitmsg "0a3f2e..."
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "depinsubmitmsg", "params": ["0a3f2e..."] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
depinsubmitmsg:'depinsubmitmsg',





/** disconnectnode "[address]" [nodeid]

Immediately disconnects from the specified peer node.

Strictly one out of 'address' and 'nodeid' can be provided to identify the node.

To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.

Arguments:
1. "address"     (string, optional) The IP address/port of the node
2. "nodeid"      (number, optional) The node ID (see getpeerinfo for node IDs)

Examples:
> neurai-cli disconnectnode "192.168.0.6:8767"
> neurai-cli disconnectnode "" 1
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["192.168.0.6:8767"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
disconnectnode:'disconnectnode',





/** distributereward "asset_name" snapshot_height "distribution_asset_name" gross_distribution_amount ( "exception_addresses" ) ("change_address") ("dry_run")

Splits the specified amount of the distribution asset to all owners of asset_name that are not in the optional exclusion_addresses

Arguments:
1. "asset_name"                 (string, required) The reward will be distributed all owners of this asset
2. "snapshot_height"            (number, required) The block height of the ownership snapshot
3. "distribution_asset_name"    (string, required) The name of the asset that will be distributed, or XNA
4. "gross_distribution_amount"  (number, required) The amount of the distribution asset that will be split amongst all owners
5. "exception_addresses"        (string, optional) Ownership addresses that should be excluded
6. "change_address"             (string, optional) If the rewards can't be fully distributed. The change will be sent to this address

Result:
{
  error_txn_gen_failed: (string),
  error_nsf: (string),
  error_rejects: (string),
  error_db_update: (string),
  batch_results: [
    {
      transaction_id: (string),
      error_txn_rejected: (string),
      total_amount: (number),
      fee: (number),
      expected_count: (number),
      actual_count: (number),
    }
  ]
}

Examples:
> neurai-cli distributereward "TRONCO" 12345 "XNA" 1000
> neurai-cli distributereward "PHATSTACKS" 12345 "DIVIDENDS" 1000 "mwN7xC3yomYdvJuVXkVC7ymY9wNBjWNduD,n4Rf18edydDaRBh7t6gHUbuByLbWEoWUTg"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "distributereward", "params": ["TRONCO" 34987 "DIVIDENDS" 100000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "distributereward", "params": ["PHATSTACKS" 34987 "XNA" 100000 "mwN7xC3yomYdvJuVXkVC7ymY9wNBjWNduD,n4Rf18edydDaRBh7t6gHUbuByLbWEoWUTg"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
distributereward:'distributereward',





/** dumpprivkey "address"

Reveals the private key corresponding to 'address'.
Then the importprivkey can be used with this output

Arguments:
1. "address"   (string, required) The neurai address for the private key

Result:
"key"                (string) The private key

Examples:
> neurai-cli dumpprivkey "myaddress"
> neurai-cli importprivkey "mykey"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["myaddress"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
dumpprivkey:'dumpprivkey',





/** dumpwallet "filename"

Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.

Arguments:
1. "filename"    (string, required) The filename with path (either absolute or relative to neuraid)

Result:
{                           (json object)
  "filename" : {        (string) The filename with full absolute path
}

Examples:
> neurai-cli dumpwallet "test"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
dumpwallet:'dumpwallet',





/** encryptwallet "passphrase"

Encrypts the wallet with 'passphrase'. This is for first time encryption.
After this, any calls that interact with private keys such as sending or signing 
will require the passphrase to be set prior the making these calls.
Use the walletpassphrase call for this, and then walletlock call.
If the wallet is already encrypted, use the walletpassphrasechange call.
Note that this will shutdown the server.

Arguments:
1. "passphrase"    (string) The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long.

Examples:

Encrypt your wallet
> neurai-cli encryptwallet "my pass phrase"

Now set the passphrase to use the wallet, such as for signing or sending neurai
> neurai-cli walletpassphrase "my pass phrase"

Now we can do something like sign
> neurai-cli signmessage "address" "test message"

Now lock the wallet again by removing the passphrase
> neurai-cli walletlock 

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["my pass phrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
encryptwallet:'encryptwallet',





/** estimatefee nblocks

DEPRECATED. Please use estimatesmartfee for more intelligent estimates.
Estimates the approximate fee per kilobyte needed for a transaction to begin
confirmation within nblocks blocks. Uses virtual transaction size of transaction
as defined in BIP 141 (witness data is discounted).

Arguments:
1. nblocks     (numeric, required)

Result:
n              (numeric) estimated fee-per-kilobyte

A negative value is returned if not enough transactions and blocks
have been observed to make an estimate.
-1 is always returned for nblocks == 1 as it is impossible to calculate
a fee that is high enough to get reliably included in the next block.

Example:
> neurai-cli estimatefee 6
**/
estimatefee:'estimatefee',





/** estimatesmartfee conf_target ("estimate_mode")

Estimates the approximate fee per kilobyte needed for a transaction to begin
confirmation within conf_target blocks if possible and return the number of blocks
for which the estimate is valid. Uses virtual transaction size as defined
in BIP 141 (witness data is discounted).

Arguments:
1. conf_target     (numeric) Confirmation target in blocks (1 - 1008)
2. "estimate_mode" (string, optional, default=CONSERVATIVE) The fee estimate mode.
                   Whether to return a more conservative estimate which also satisfies
                   a longer history. A conservative estimate potentially returns a
                   higher feerate and is more likely to be sufficient for the desired
                   target, but is not as responsive to short term drops in the
                   prevailing fee market.  Must be one of:
       "UNSET" (defaults to CONSERVATIVE)
       "ECONOMICAL"
       "CONSERVATIVE"

Result:
{
  "feerate" : x.x,     (numeric, optional) estimate fee rate in XNA/kB
  "errors": [ str... ] (json array of strings, optional) Errors encountered during processing
  "blocks" : n         (numeric) block number where estimate was found
}

The request target will be clamped between 2 and the highest target
fee estimation is able to return based on how long it has been running.
An error is returned if not enough transactions and blocks
have been observed to make an estimate for any number of blocks.

Example:
> neurai-cli estimatesmartfee 6
**/
estimatesmartfee:'estimatesmartfee',





/** freezeaddress asset_name address (change_address) (asset_data)

Freeze an address from transferring a restricted asset

Arguments:
1. "asset_name"       (string, required) the name of the restricted asset you want to freeze
2. "address"          (string, required) the address that will be frozen
3. "change_address"   (string, optional) The change address for the owner token of the restricted asset
4. "asset_data"       (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the owner token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli freezeaddress "$RESTRICTED_ASSET" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "freezeaddress", "params": ["$RESTRICTED_ASSET" "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli freezeaddress "$RESTRICTED_ASSET" "address" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "freezeaddress", "params": ["$RESTRICTED_ASSET" "address" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
freezeaddress:'freezeaddress',





/** freezedepin "asset_name" "address" ("change_address")

Freeze a DEPIN asset for a specific address (owner only)

The address will still hold the asset but it will be marked as invalid

Requires the owner token (&ASSET!) in the wallet

Arguments:
1. "asset_name"       (string, required) The DEPIN asset name (must start with &)
2. "address"          (string, required) The address to freeze
3. "change_address"   (string, optional) The change address for the owner token

Result:
"txid"                (string) The transaction id

Examples:
> neurai-cli freezedepin "&FRANCE" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "freezedepin", "params": ["&FRANCE", "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
freezedepin:'freezedepin',





/** freezerestrictedasset asset_name (change_address) (asset_data)

Freeze all trading for a specific restricted asset

Arguments:
1. "asset_name"       (string, required) the name of the restricted asset you want to unfreeze
2. "change_address"   (string, optional) The change address for the owner token of the restricted asset
3. "asset_data"       (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the owner token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli freezerestrictedasset "$RESTRICTED_ASSET"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "freezerestrictedasset", "params": ["$RESTRICTED_ASSET"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli freezerestrictedasset "$RESTRICTED_ASSET" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "freezerestrictedasset", "params": ["$RESTRICTED_ASSET" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
freezerestrictedasset:'freezerestrictedasset',





/** fundrawtransaction "hexstring" ( options )

Add inputs to a transaction until it has enough in value to meet its out value.
This will not modify existing inputs, and will add at most one change output to the outputs.
No existing outputs will be modified unless "subtractFeeFromOutputs" is specified.
Note that inputs which were signed may need to be resigned after completion since in/outputs have been added.
The inputs added will not be signed, use signrawtransaction for that.
Note that all existing inputs must have their previous output transaction be in the wallet.
Note that all inputs selected must be of standard form and P2SH scripts must be
in the wallet using importaddress or addmultisigaddress (to calculate fees).
You can see whether this is the case by checking the "solvable" field in the listunspent output.
Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only

Arguments:
1. "hexstring"           (string, required) The hex string of the raw transaction
2. options                 (object, optional)
   {
     "changeAddress"          (string, optional, default pool address) The neurai address to receive the change
     "changePosition"         (numeric, optional, default random) The index of the change output
     "includeWatching"        (boolean, optional, default false) Also select inputs which are watch only
     "lockUnspents"           (boolean, optional, default false) Lock selected unspent outputs
     "feeRate"                (numeric, optional, default not set: makes wallet determine the fee) Set a specific fee rate in XNA/kB
     "subtractFeeFromOutputs" (array, optional) A json array of integers.
                              The fee will be equally deducted from the amount of each specified output.
                              The outputs are specified by their zero-based index, before any change output is added.
                              Those recipients will receive less neurais than you enter in their corresponding amount field.
                              If no outputs are specified here, the sender pays the fee.
                                  [vout_index,...]
                              Allows this transaction to be replaced by a transaction with higher fees
     "conf_target"            (numeric, optional) Confirmation target (in blocks)
     "estimate_mode"          (string, optional, default=UNSET) The fee estimate mode, must be one of:
         "UNSET"
         "ECONOMICAL"
         "CONSERVATIVE"
   }
                         for backward compatibility: passing in a true instead of an object will result in {"includeWatching":true}

Result:
{
  "hex":       "value", (string)  The resulting raw transaction (hex-encoded string)
  "fee":       n,         (numeric) Fee in XNA the resulting transaction pays
  "changepos": n          (numeric) The position of the added change output, or -1
}

Examples:

Create a transaction with no inputs
> neurai-cli createrawtransaction "[]" "{\"myaddress\":0.01}"

Add sufficient unsigned inputs to meet the output value
> neurai-cli fundrawtransaction "rawtransactionhex"

Sign the transaction
> neurai-cli signrawtransaction "fundedtransactionhex"

Send the transaction
> neurai-cli sendrawtransaction "signedtransactionhex"
**/
fundrawtransaction:'fundrawtransaction',





/** generate nblocks ( maxtries )

Mine up to nblocks blocks immediately (before the RPC call returns) to an address in the wallet.

Arguments:
1. nblocks      (numeric, required) How many blocks are generated immediately.
2. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

Result:
[ blockhashes ]     (array) hashes of blocks generated

Examples:

Generate 11 blocks
> neurai-cli generate 11
**/
generate:'generate',





/** generatetoaddress nblocks address (maxtries)

Mine blocks immediately to a specified address (before the RPC call returns)

Arguments:
1. nblocks      (numeric, required) How many blocks are generated immediately.
2. address      (string, required) The address to send the newly generated neurai to.
3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

Result:
[ blockhashes ]     (array) hashes of blocks generated

Examples:

Generate 11 blocks to myaddress
> neurai-cli generatetoaddress 11 "myaddress"
**/
generatetoaddress:'generatetoaddress',





/** getaccount "address"

DEPRECATED. Returns the account associated with the given address.

Arguments:
1. "address"         (string, required) The neurai address for account lookup.

Result:
"accountname"        (string) the account address

Examples:
> neurai-cli getaccount "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccount", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaccount:'getaccount',





/** getaccountaddress "account"

DEPRECATED. Returns the current Neurai address for receiving payments to this account.

Arguments:
1. "account"       (string, required) The account name for the address. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created and a new address created  if there is no account by the given name.

Result:
"address"          (string) The account neurai address

Examples:
> neurai-cli getaccountaddress 
> neurai-cli getaccountaddress ""
> neurai-cli getaccountaddress "myaccount"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccountaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaccountaddress:'getaccountaddress',





/** getaddednodeinfo ( "node" )

Returns information about the given added node, or all added nodes
(note that onetry addnodes are not listed here)

Arguments:
1. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.

Result:
[
  {
    "addednode" : "192.168.0.201",   (string) The node IP address or name (as provided to addnode)
    "connected" : true|false,          (boolean) If connected
    "addresses" : [                    (list of objects) Only when connected = true
       {
         "address" : "192.168.0.201:8767",  (string) The neurai server IP and port we're connected to
         "connected" : "outbound"           (string) connection, inbound or outbound
       }
     ]
  }
  ,...
]

Examples:
> neurai-cli getaddednodeinfo "192.168.0.201"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddednodeinfo", "params": ["192.168.0.201"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddednodeinfo:'getaddednodeinfo',





/** getaddressbalance

Returns the balance for an address(es) (requires addressindex to be enabled).

Arguments:
{
  "addresses:"
    [
      "address"  (string) The base58check encoded address
      ,...
    ]
},
"includeAssets" (boolean, optional, default false)  If true this will return an expanded result which includes asset balances


Result:
{
  "balance"  (string) The current balance in satoshis
  "received"  (string) The total number of satoshis received (including change)
}
OR
[
  {
    "assetName"  (string) The asset associated with the balance (XNA for Neurai)
    "balance"  (string) The current balance in satoshis
    "received"  (string) The total number of satoshis received (including change)
  },...

]
Examples:
> neurai-cli getaddressbalance '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}'
> neurai-cli getaddressbalance '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}', true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressbalance", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressbalance", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddressbalance:'getaddressbalance',





/** getaddressdeltas

Returns all changes for an address (requires addressindex to be enabled).

Arguments:
{
  "addresses"
    [
      "address"  (string) The base58check encoded address
      ,...
    ]
  "start" (number) The start block height
  "end" (number) The end block height
  "chainInfo" (boolean) Include chain info in results, only applies if start and end specified
  "assetName"   (string, optional) Get deltas for a particular asset instead of XNA.
}

Result:
[
  {
    "assetName"  (string) The asset associated with the deltas (XNA for Neurai)
    "satoshis"  (number) The difference of satoshis
    "txid"  (string) The related txid
    "index"  (number) The related input or output index
    "height"  (number) The block height
    "address"  (string) The base58check encoded address
  }
]

Examples:
> neurai-cli getaddressdeltas '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressdeltas", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getaddressdeltas '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"],"assetName":"MY_ASSET"}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressdeltas", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"],"assetName":"MY_ASSET"}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddressdeltas:'getaddressdeltas',





/** getaddressesbyaccount "account"

DEPRECATED. Returns the list of addresses for the given account.

Arguments:
1. "account"        (string, required) The account name.

Result:
[                     (json array of string)
  "address"         (string) a neurai address associated with the given account
  ,...
]

Examples:
> neurai-cli getaddressesbyaccount "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddressesbyaccount:'getaddressesbyaccount',





/** getaddressmempool

Returns all mempool deltas for an address (requires addressindex to be enabled).

Arguments:
{
  "addresses"
    [
      "address"  (string) The base58check encoded address
      ,...
    ]
},
"includeAssets" (boolean, optional, default false)  If true this will return an expanded result which includes asset deltas

Result:
[
  {
    "address"  (string) The base58check encoded address
    "assetName"  (string) The name of the associated asset (XNA for Neurai)
    "txid"  (string) The related txid
    "index"  (number) The related input or output index
    "satoshis"  (number) The difference of satoshis
    "timestamp"  (number) The time the transaction entered the mempool (seconds)
    "prevtxid"  (string) The previous txid (if spending)
    "prevout"  (string) The previous transaction output index (if spending)
  }
]

Examples:
> neurai-cli getaddressmempool '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressmempool", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getaddressmempool '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}', true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressmempool", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddressmempool:'getaddressmempool',





/** getaddresstxids

Returns the txids for an address(es) (requires addressindex to be enabled).

Arguments:
{
  "addresses"
    [
      "address"  (string) The base58check encoded address
      ,...
    ]
  "start" (number, optional) The start block height
  "end" (number, optional) The end block height
},
"includeAssets" (boolean, optional, default false)  If true this will return an expanded result which includes asset transactions

Result:
[
  "transactionid"  (string) The transaction id
  ,...
]

Examples:
> neurai-cli getaddresstxids '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddresstxids", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getaddresstxids '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}', true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddresstxids", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddresstxids:'getaddresstxids',





/** getaddressutxos

Returns all unspent outputs for an address (requires addressindex to be enabled).

Arguments:
{
  "addresses"
    [
      "address"  (string) The base58check encoded address
      ,...
    ],
  "chainInfo",  (boolean, optional, default false) Include chain info with results
  "assetName"   (string, optional) Get UTXOs for a particular asset instead of XNA ('*' for all assets).
}

Result
[
  {
    "address"  (string) The address base58check encoded
    "assetName" (string) The asset associated with the UTXOs (XNA for Neurai)
    "txid"  (string) The output txid
    "height"  (number) The block height
    "outputIndex"  (number) The output index
    "script"  (strin) The script hex encoded
    "satoshis"  (number) The number of satoshis of the output
  }
]

Examples:
> neurai-cli getaddressutxos '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressutxos", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getaddressutxos '{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"],"assetName":"MY_ASSET"}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressutxos", "params": [{"addresses": ["12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"],"assetName":"MY_ASSET"}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getaddressutxos:'getaddressutxos',





/** getassetdata "asset_name"

Returns assets metadata if that asset exists

Arguments:
1. "asset_name"               (string, required) the name of the asset

Result:
{
  name: (string),
  amount: (number),
  units: (number),
  reissuable: (number),
  has_ipfs: (number),
  ipfs_hash: (hash), (only if has_ipfs = 1 and that data is a ipfs hash)
  txid_hash: (hash), (only if has_ipfs = 1 and that data is a txid hash)
  verifier_string: (string)
}

Examples:
> neurai-cli getassetdata "ASSET_NAME"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getassetdata", "params": ["ASSET_NAME"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getassetdata:'getassetdata',





/** getbalance ( "account" minconf include_watchonly )

If account is not specified, returns the server's total available balance.
If account is specified (DEPRECATED), returns the balance in the account.
Note that the account "" is not the same as leaving the parameter out.
The server total may be different to the balance in the default "" account.

Arguments:
1. "account"         (string, optional) DEPRECATED. The account string may be given as a
                     specific account name to find the balance associated with wallet keys in
                     a named account, or as the empty string ("") to find the balance
                     associated with wallet keys not in any named account, or as "*" to find
                     the balance associated with all wallet keys regardless of account.
                     When this option is specified, it calculates the balance in a different
                     way than when it is not specified, and which can count spends twice when
                     there are conflicting pending transactions (such as those created by
                     the bumpfee command), temporarily resulting in low or even negative
                     balances. In general, account balance calculation is not considered
                     reliable and has resulted in confusing outcomes, so it is recommended to
                     avoid passing this argument.
2. minconf           (numeric, optional, default=1) Only include transactions confirmed at least this many times.
3. include_watchonly (bool, optional, default=false) Also include balance in watch-only addresses (see 'importaddress')

Result:
amount              (numeric) The total amount in XNA received for this account.

Examples:

The total amount in the wallet with 1 or more confirmations
> neurai-cli getbalance 

The total amount in the wallet at least 6 blocks confirmed
> neurai-cli getbalance "*" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["*", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getbalance:'getbalance',





/** getbestblockhash

Returns the hash of the best (tip) block in the longest blockchain.

Result:
"hex"      (string) the block hash hex encoded

Examples:
> neurai-cli getbestblockhash 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getbestblockhash:'getbestblockhash',





/** getblock "blockhash" ( verbosity ) 

If verbosity is 0, returns a string that is serialized, hex-encoded data for block 'hash'.
If verbosity is 1, returns an Object with information about block <hash>.
If verbosity is 2, returns an Object with information about block <hash> and information about each transaction. 

Arguments:
1. "blockhash"          (string, required) The block hash
2. verbosity              (numeric, optional, default=1) 0 for hex encoded data, 1 for a json object, and 2 for json object with transaction data

Result (for verbosity = 0):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Result (for verbosity = 1):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "strippedsize" : n,    (numeric) The block size excluding witness data
  "weight" : n           (numeric) The block weight as defined in BIP 141
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbosity = 2):
{
  ...,                     Same output as verbosity = 1.
  "tx" : [               (array of Objects) The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
         ,...
  ],
  ,...                     Same output as verbosity = 1.
}

Examples:
> neurai-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblock:'getblock',





/** getblockchaininfo
Returns an object containing various state info regarding blockchain processing.

Result:
{
  "chain": "xxxx",        (string) current network name as defined in BIP70 (main, test, regtest)
  "blocks": xxxxxx,         (numeric) the current number of blocks processed in the server
  "headers": xxxxxx,        (numeric) the current number of headers we have validated
  "bestblockhash": "...", (string) the hash of the currently best block
  "difficulty": xxxxxx,     (numeric) the current difficulty
  "mediantime": xxxxxx,     (numeric) median time for the current best block
  "verificationprogress": xxxx, (numeric) estimate of verification progress [0..1]
  "chainwork": "xxxx"     (string) total amount of work in active chain, in hexadecimal
  "size_on_disk": xxxxxx,   (numeric) the estimated size of the block and undo files on disk
  "pruned": xx,             (boolean) if the blocks are subject to pruning
  "pruneheight": xxxxxx,    (numeric) lowest-height complete block stored (only present if pruning is enabled)
  "automatic_pruning": xx,  (boolean) whether automatic pruning is enabled (only present if pruning is enabled)
  "prune_target_size": xxxxxx,  (numeric) the target size used by pruning (only present if automatic pruning is enabled)
  "softforks": [            (array) status of softforks in progress
     {
        "id": "xxxx",        (string) name of softfork
        "version": xx,         (numeric) block version
        "reject": {            (object) progress toward rejecting pre-softfork blocks
           "status": xx,       (boolean) true if threshold reached
        },
     }, ...
  ],
  "bip9_softforks": {          (object) status of BIP9 softforks in progress
     "xxxx" : {                (string) name of the softfork
        "status": "xxxx",    (string) one of "defined", "started", "locked_in", "active", "failed"
        "bit": xx,             (numeric) the bit (0-28) in the block version field used to signal this softfork (only for "started" status)
        "startTime": xx,       (numeric) the minimum median time past of a block at which the bit gains its meaning
        "timeout": xx,         (numeric) the median time past of a block at which the deployment is considered failed if not yet locked in
        "since": xx,           (numeric) height of the first block to which the status applies
        "statistics": {        (object) numeric statistics about BIP9 signalling for a softfork (only for "started" status)
           "period": xx,       (numeric) the length in blocks of the BIP9 signalling period 
           "threshold": xx,    (numeric) the number of blocks with the version bit set required to activate the feature 
           "elapsed": xx,      (numeric) the number of blocks elapsed since the beginning of the current period 
           "count": xx,        (numeric) the number of blocks with the version bit set in the current period 
           "possible": xx      (boolean) returns false if there are not enough blocks left in this period to pass activation threshold 
        }
     }
  }
  "warnings" : "...",         (string) any network and blockchain warnings.
}

Examples:
> neurai-cli getblockchaininfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblockchaininfo:'getblockchaininfo',





/** getblockcount

Returns the number of blocks in the longest blockchain.

Result:
n    (numeric) The current block count

Examples:
> neurai-cli getblockcount 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblockcount:'getblockcount',





/** getblockhash height

Returns hash of block in best-block-chain at height provided.

Arguments:
1. height         (numeric, required) The height index

Result:
"hash"         (string) The block hash

Examples:
> neurai-cli getblockhash 1000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblockhash:'getblockhash',





/** getblockhashes timestamp

Returns array of hashes of blocks within the timestamp range provided.

Arguments:
1. high         (numeric, required) The newer block timestamp
2. low          (numeric, required) The older block timestamp
3. options      (string, required) A json object
    {
      "noOrphans":true   (boolean) will only include blocks on the main chain
      "logicalTimes":true   (boolean) will include logical timestamps with hashes
    }

Result:
[
  "hash"         (string) The block hash
]
[
  {
    "blockhash": (string) The block hash
    "logicalts": (numeric) The logical timestamp
  }
]

Examples:
> neurai-cli getblockhashes 1231614698 1231024505
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhashes", "params": [1231614698, 1231024505] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getblockhashes 1231614698 1231024505 '{"noOrphans":false, "logicalTimes":true}'
**/
getblockhashes:'getblockhashes',





/** getblockheader "hash" ( verbose )

If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'.
If verbose is true, returns an Object with information about blockheader <hash>.

Arguments:
1. "hash"          (string, required) The block hash
2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data

Result (for verbose = true):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "0000...1f3"     (string) Expected number of hashes required to produce the current chain (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash",      (string) The hash of the next block
}

Result (for verbose=false):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Examples:
> neurai-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockheader", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblockheader:'getblockheader',





/** getblocktemplate ( TemplateRequest )

If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
It returns data needed to construct a block to work on.
For full specification, see BIPs 22, 23, 9, and 145:
    https://github.com/neurai/bips/blob/master/bip-0022.mediawiki
    https://github.com/neurai/bips/blob/master/bip-0023.mediawiki
    https://github.com/neurai/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
    https://github.com/neurai/bips/blob/master/bip-0145.mediawiki

Arguments:
1. template_request         (json object, optional) A json object in the following spec
     {
       "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
       "capabilities":[     (array, optional) A list of strings
           "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
           ,...
       ],
       "rules":[            (array, optional) A list of strings
           "support"          (string) client side supported softfork deployment
           ,...
       ]
     }


Result:
{
  "version" : n,                    (numeric) The preferred block version
  "rules" : [ "rulename", ... ],    (array of strings) specific block rules that are to be enforced
  "vbavailable" : {                 (json object) set of pending, supported versionbit (BIP 9) softfork deployments
      "rulename" : bitnumber          (numeric) identifies the bit number as indicating acceptance and readiness for the named softfork rule
      ,...
  },
  "vbrequired" : n,                 (numeric) bit mask of versionbits the server requires set in submissions
  "previousblockhash" : "xxxx",     (string) The hash of current highest block
  "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
      {
         "data" : "xxxx",             (string) transaction data encoded in hexadecimal (byte-for-byte)
         "txid" : "xxxx",             (string) transaction id encoded in little-endian hexadecimal
         "hash" : "xxxx",             (string) hash encoded in little-endian hexadecimal (including witness data)
         "depends" : [                (array) array of numbers 
             n                          (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
             ,...
         ],
         "fee": n,                    (numeric) difference in value between transaction inputs and outputs (in satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
         "sigops" : n,                (numeric) total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
         "weight" : n,                (numeric) total transaction weight, as counted for purposes of block limits
         "required" : true|false      (boolean) if provided and true, this transaction must be in the final block
      }
      ,...
  ],
  "coinbaseaux" : {                 (json object) data that should be included in the coinbase's scriptSig content
      "flags" : "xx"                  (string) key name is to be ignored, and value included in scriptSig
  },
  "coinbasevalue" : n,              (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in satoshis)
  "coinbasetxn" : { ... },          (json object) information for coinbase transaction
  "target" : "xxxx",                (string) The hash target
  "mintime" : xxx,                  (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  "mutable" : [                     (array of string) list of ways the block template may be changed 
     "value"                          (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
     ,...
  ],
  "noncerange" : "00000000ffffffff",(string) A range of valid nonces
  "sigoplimit" : n,                 (numeric) limit of sigops in blocks
  "sizelimit" : n,                  (numeric) limit of block size
  "weightlimit" : n,                (numeric) limit of block weight
  "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
  "bits" : "xxxxxxxx",              (string) compressed target of next block
  "height" : n                      (numeric) The height of the next block
}

Examples:
> neurai-cli getblocktemplate 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getblocktemplate:'getblocktemplate',





/** getcacheinfo 

Result:
[
  uxto cache size:
  asset total (exclude dirty):
  asset address map:
  asset address balance:
  my unspent asset:
  reissue data:
  asset metadata map:
  asset metadata list (est):
  dirty cache (est):
]

Examples:
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getcacheinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli getcacheinfo 
**/
getcacheinfo:'getcacheinfo',





/** getchaintips
Return information about all known tips in the block tree, including the main chain as well as orphaned branches.

Result:
[
  {
    "height": xxxx,         (numeric) height of the chain tip
    "hash": "xxxx",         (string) block hash of the tip
    "branchlen": 0          (numeric) zero for main chain
    "status": "active"      (string) "active" for the main chain
  },
  {
    "height": xxxx,
    "hash": "xxxx",
    "branchlen": 1          (numeric) length of branch connecting the tip to the main chain
    "status": "xxxx"        (string) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
  }
]
Possible values for status:
1.  "invalid"               This branch contains at least one invalid block
2.  "headers-only"          Not all blocks for this branch are available, but the headers are valid
3.  "valid-headers"         All blocks are available for this branch, but they were never fully validated
4.  "valid-fork"            This branch is not part of the active chain, but is fully validated
5.  "active"                This is the tip of the active main chain, which is certainly valid

Examples:
> neurai-cli getchaintips 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintips", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getchaintips:'getchaintips',





/** getchaintxstats ( nblocks blockhash )

Compute statistics about the total number and rate of transactions in the chain.

Arguments:
1. nblocks      (numeric, optional) Size of the window in number of blocks (default: one month).
2. "blockhash"  (string, optional) The hash of the block that ends the window.

Result:
{
  "time": xxxxx,                (numeric) The timestamp for the final block in the window in UNIX format.
  "txcount": xxxxx,             (numeric) The total number of transactions in the chain up to that point.
  "window_block_count": xxxxx,  (numeric) Size of the window in number of blocks.
  "window_tx_count": xxxxx,     (numeric) The number of transactions in the window. Only returned if "window_block_count" is > 0.
  "window_interval": xxxxx,     (numeric) The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0.
  "txrate": x.xx,               (numeric) The average rate of transactions per second in the window. Only returned if "window_interval" is > 0.
}

Examples:
> neurai-cli getchaintxstats 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintxstats", "params": [2016] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getchaintxstats:'getchaintxstats',





/** getconnectioncount

Returns the number of connections to other nodes.

Result:
n          (numeric) The connection count

Examples:
> neurai-cli getconnectioncount 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getconnectioncount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getconnectioncount:'getconnectioncount',





/** getdifficulty

Returns the proof-of-work difficulty as a multiple of the minimum difficulty.

Result:
n.nnn       (numeric) the proof-of-work difficulty as a multiple of the minimum difficulty.

Examples:
> neurai-cli getdifficulty 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getdifficulty:'getdifficulty',





/** getdistributestatus "asset_name" snapshot_height "distribution_asset_name" gross_distribution_amount ( "exception_addresses" )

Give information about the status of the distribution

Arguments:
1. "asset_name"                 (string, required) The reward will be distributed all owners of this asset
2. "snapshot_height"            (number, required) The block height of the ownership snapshot
3. "distribution_asset_name"    (string, required) The name of the asset that will be distributed, or XNA
4. "gross_distribution_amount"  (number, required) The amount of the distribution asset that will be split amongst all owners
5. "exception_addresses"        (string, optional) Ownership addresses that should be excluded

Examples:
> neurai-cli getdistributestatus "TRONCO" 12345 "XNA" 1000
> neurai-cli getdistributestatus "PHATSTACKS" 12345 "DIVIDENDS" 1000 "mwN7xC3yomYdvJuVXkVC7ymY9wNBjWNduD,n4Rf18edydDaRBh7t6gHUbuByLbWEoWUTg"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdistributestatus", "params": ["TRONCO" 34987 "DIVIDENDS" 100000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdistributestatus", "params": ["PHATSTACKS" 34987 "XNA" 100000 "mwN7xC3yomYdvJuVXkVC7ymY9wNBjWNduD,n4Rf18edydDaRBh7t6gHUbuByLbWEoWUTg"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getdistributestatus:'getdistributestatus',





/** getgenerate

Return if the server is set to generate coins or not. The default is false.
It is set with the command line argument -gen (or neurai.conf setting gen)
It can also be set with the setgenerate call.

Result
true|false      (boolean) If the server is set to generate coins or not

Examples:
> neurai-cli getgenerate 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getgenerate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getgenerate:'getgenerate',





/** getinfo

DEPRECATED. Returns an object containing various state info.

Result:
{
  "deprecation-warning": "..." (string) warning that the getinfo command is deprecated and will be removed in 0.16
  "version": xxxxx,           (numeric) the server version
  "protocolversion": xxxxx,   (numeric) the protocol version
  "walletversion": xxxxx,     (numeric) the wallet version
  "balance": xxxxxxx,         (numeric) the total Neurai balance of the wallet
  "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
  "timeoffset": xxxxx,        (numeric) the time offset
  "connections": xxxxx,       (numeric) the number of connections
  "proxy": "host:port",       (string, optional) the proxy used by the server
  "difficulty": xxxxxx,       (numeric) the current difficulty
  "testnet": true|false,      (boolean) if the server is using testnet or not
  "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
  "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,         (numeric) the transaction fee set in XNA/kB
  "relayfee": x.xxxx,         (numeric) minimum relay fee for transactions in XNA/kB
  "errors": "..."             (string) any error messages
}

Examples:
> neurai-cli getinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getinfo:'getinfo',





/** getkawpowhash "header_hash" "mix_hash" nonce, height, "target"

Get the kawpow hash for a block given its block data

Arguments
1. "header_hash"        (string, required) the prow_pow header hash that was given to the gpu miner from this rpc client
2. "mix_hash"           (string, required) the mix hash that was mined by the gpu miner via rpc
3. "nonce"              (string, required) the hex nonce of the block that hashed the valid block
4. "height"             (number, required) the height of the block data that is being hashed
5. "target"             (string, optional) the target of the block that is hash is trying to meet

Result:

Examples:
> neurai-cli getkawpowhash "header_hash" "mix_hash" "0x100000" 2456
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getkawpowhash", "params": ["header_hash" "mix_hash" "0x100000" 2456] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getkawpowhash:'getkawpowhash',





/** getmasterkeyinfo

Fetches and displays the master private key and the master public key.

Result:
{                           (json object)
  "bip32_root_private" : (string) extended master private key,
  "bip32_root_public" :  (string) extended master public key,
  "account_derivation_path" : (string) The derivation path to the account public/private keys
  "account_extended_private_key" : (string) extended account private key,
  "account_extended_public_key" :  (string) extended account public key,
}

Examples:
> neurai-cli getmasterkeyinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmasterkeyinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmasterkeyinfo:'getmasterkeyinfo',





/** getmemoryinfo ("mode")
Returns an object containing information about memory usage.
Arguments:
1. "mode" determines what kind of information is returned. This argument is optional, the default mode is "stats".
  - "stats" returns general statistics about memory usage in the daemon.
  - "mallocinfo" returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+).

Result (mode "stats"):
{
  "locked": {               (json object) Information about locked memory manager
    "used": xxxxx,          (numeric) Number of bytes used
    "free": xxxxx,          (numeric) Number of bytes available in current arenas
    "total": xxxxxxx,       (numeric) Total number of bytes managed
    "locked": xxxxxx,       (numeric) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    "chunks_used": xxxxx,   (numeric) Number allocated chunks
    "chunks_free": xxxxx,   (numeric) Number unused chunks
  }
}

Result (mode "mallocinfo"):
"<malloc version="1">..."

Examples:
> neurai-cli getmemoryinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmemoryinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmemoryinfo:'getmemoryinfo',





/** getmempoolancestors txid (verbose)

If txid is in the mempool, returns all in-mempool ancestors.

Arguments:
1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result (for verbose=false):
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool ancestor transaction
  ,...
]

Result (for verbose=true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
    "fee" : n,              (numeric) transaction fee in XNA
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "wtxid" : hash,         (string) hash of serialized transaction, including witness data
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> neurai-cli getmempoolancestors "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolancestors", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmempoolancestors:'getmempoolancestors',





/** getmempooldescendants txid (verbose)

If txid is in the mempool, returns all in-mempool descendants.

Arguments:
1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result (for verbose=false):
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool descendant transaction
  ,...
]

Result (for verbose=true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
    "fee" : n,              (numeric) transaction fee in XNA
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "wtxid" : hash,         (string) hash of serialized transaction, including witness data
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> neurai-cli getmempooldescendants "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempooldescendants", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmempooldescendants:'getmempooldescendants',





/** getmempoolentry txid

Returns mempool data for given transaction

Arguments:
1. "txid"                   (string, required) The transaction id (must be in mempool)

Result:
{                           (json object)
    "size" : n,             (numeric) virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
    "fee" : n,              (numeric) transaction fee in XNA
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "wtxid" : hash,         (string) hash of serialized transaction, including witness data
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
}

Examples:
> neurai-cli getmempoolentry "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolentry", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmempoolentry:'getmempoolentry',





/** getmempoolinfo

Returns details on the active state of the TX memory pool.

Result:
{
  "size": xxxxx,               (numeric) Current tx count
  "bytes": xxxxx,              (numeric) Sum of all virtual transaction sizes as defined in BIP 141. Differs from actual serialized size because witness data is discounted
  "usage": xxxxx,              (numeric) Total memory usage for the mempool
  "maxmempool": xxxxx,         (numeric) Maximum memory usage for the mempool
  "mempoolminfee": xxxxx       (numeric) Minimum fee rate in XNA/kB for tx to be accepted
}

Examples:
> neurai-cli getmempoolinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmempoolinfo:'getmempoolinfo',





/** getmininginfo

Returns a json object containing mining-related information.
Result:
{
  "blocks": nnn,             (numeric) The current block
  "currentblockweight": nnn, (numeric) The last block weight
  "currentblocktx": nnn,     (numeric) The last block transaction
  "difficulty": xxx.xxxxx    (numeric) The current difficulty
  "networkhashps": nnn,      (numeric) The network hashes per second
  "hashespersec": nnn,       (numeric) The hashes per second of built-in miner
  "pooledtx": n              (numeric) The size of the mempool
  "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
  "warnings": "..."          (string) any network and blockchain warnings
  "errors": "..."            (string) DEPRECATED. Same as warnings. Only shown when neuraid is started with -deprecatedrpc=getmininginfo
}

Examples:
> neurai-cli getmininginfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmininginfo:'getmininginfo',





/** getmywords ( "account" )

Returns the 12 words and passphrase used by BIP39 to generate the wallets private keys
Only returns value if wallet was created by the 12 words import/generation

Result:
"word_list:"    (string) A string of words separated by spaces
"passphrase:"    (optional) Only show if passphrase was used when creating the wallet

Examples:
> neurai-cli getmywords 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmywords", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getmywords:'getmywords',





/** getnettotals

Returns information about network traffic, including bytes in, bytes out,
and current time.

Result:
{
  "totalbytesrecv": n,   (numeric) Total bytes received
  "totalbytessent": n,   (numeric) Total bytes sent
  "timemillis": t,       (numeric) Current UNIX time in milliseconds
  "uploadtarget":
  {
    "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
    "target": n,                            (numeric) Target in bytes
    "target_reached": true|false,           (boolean) True if target is reached
    "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
    "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
    "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
  }
}

Examples:
> neurai-cli getnettotals 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnettotals", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getnettotals:'getnettotals',





/** getnetworkhashps ( nblocks height )

Returns the estimated network hashes per second based on the last n blocks.
Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
Pass in [height] to estimate the network speed at the time when a certain block was found.

Arguments:
1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
2. height      (numeric, optional, default=-1) To estimate at the time of the given height.

Result:
x             (numeric) Hashes per second estimated

Examples:
> neurai-cli getnetworkhashps 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getnetworkhashps:'getnetworkhashps',





/** getnetworkinfo
Returns an object containing various state info regarding P2P networking.

Result:
{
  "version": xxxxx,                      (numeric) the server version
  "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
  "protocolversion": xxxxx,              (numeric) the protocol version
  "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
  "localrelay": true|false,              (bool) true if transaction relay is requested from peers
  "timeoffset": xxxxx,                   (numeric) the time offset
  "connections": xxxxx,                  (numeric) the number of connections
  "networkactive": true|false,           (bool) whether p2p networking is enabled
  "networks": [                          (array) information per network
  {
    "name": "xxx",                     (string) network (ipv4, ipv6 or onion)
    "limited": true|false,               (boolean) is the network limited using -onlynet?
    "reachable": true|false,             (boolean) is the network reachable?
    "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
    "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
  }
  ,...
  ],
  "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for transactions in XNA/kB
  "incrementalfee": x.xxxxxxxx,          (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in XNA/kB
  "localaddresses": [                    (array) list of local addresses
  {
    "address": "xxxx",                 (string) network address
    "port": xxx,                         (numeric) network port
    "score": xxx                         (numeric) relative score
  }
  ,...
  ]
  "warnings": "..."                    (string) any network and blockchain warnings
}

Examples:
> neurai-cli getnetworkinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getnetworkinfo:'getnetworkinfo',





/** getnewaddress ( "account" )

Returns a new Neurai address for receiving payments.
If 'account' is specified (DEPRECATED), it is added to the address book 
so payments received with the address will be credited to 'account'.

Arguments:
1. "account"        (string, optional) DEPRECATED. The account name for the address to be linked to. If not provided, the default account "" is used. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.

Result:
"address"    (string) The new neurai address

Examples:
> neurai-cli getnewaddress 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getnewaddress:'getnewaddress',





/** getpeerinfo

Returns data about each connected network node as a json array of objects.

Result:
[
  {
    "id": n,                   (numeric) Peer index
    "addr":"host:port",      (string) The IP address and port of the peer
    "addrbind":"ip:port",    (string) Bind address of the connection to the peer
    "addrlocal":"ip:port",   (string) Local address as reported by the peer
    "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
    "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
    "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    "bytessent": n,            (numeric) The total bytes sent
    "bytesrecv": n,            (numeric) The total bytes received
    "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    "timeoffset": ttt,         (numeric) The time offset in seconds
    "pingtime": n,             (numeric) ping time (if available)
    "minping": n,              (numeric) minimum observed ping time (if any at all)
    "pingwait": n,             (numeric) ping wait (if non-zero)
    "version": v,              (numeric) The peer version, such as 7001
    "subver": "/Satoshi:0.8.5/",  (string) The string version
    "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    "addnode": true|false,     (boolean) Whether connection was due to addnode/-connect or if it was an automatic/inbound connection
    "startingheight": n,       (numeric) The starting height (block) of the peer
    "banscore": n,             (numeric) The ban score
    "synced_headers": n,       (numeric) The last header we have in common with this peer
    "synced_blocks": n,        (numeric) The last block we have in common with this peer
    "inflight": [
       n,                        (numeric) The heights of blocks we're currently asking from this peer
       ...
    ],
    "whitelisted": true|false, (boolean) Whether the peer is whitelisted
    "bytessent_per_msg": {
       "addr": n,              (numeric) The total bytes sent aggregated by message type
       ...
    },
    "bytesrecv_per_msg": {
       "addr": n,              (numeric) The total bytes received aggregated by message type
       ...
    }
  }
  ,...
]

Examples:
> neurai-cli getpeerinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getpeerinfo:'getpeerinfo',





/** getpubkey "address"

Returns the public key for an address that has revealed it by spending (requires pubkeyindex to be enabled).

Arguments:
1. "address"      (string, required) The Neurai address

Result:
{
  "address": "address",         (string) The Neurai address
  "pubkey": "hex",              (string) The public key in hex format
  "revealed": true|false,       (boolean) Whether the public key has been revealed
  "height": n,                  (numeric) Block height where it was revealed
  "txid": "hash"                (string) Transaction ID where it was revealed
}

Examples:
> neurai-cli getpubkey "NXa1b2c3d4e5f6..."
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpubkey", "params": ["NXa1b2c3d4e5f6..."] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getpubkey:'getpubkey',





/** getrawchangeaddress

Returns a new Neurai address, for receiving change.
This is for use with raw transactions, NOT normal use.

Result:
"address"    (string) The address

Examples:
> neurai-cli getrawchangeaddress 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getrawchangeaddress:'getrawchangeaddress',





/** getrawmempool ( verbose )

Returns all transaction ids in memory pool as a json array of string transaction ids.

Hint: use getmempoolentry to fetch a specific transaction from the mempool.

Arguments:
1. verbose (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result: (for verbose = false):
[                     (json array of string)
  "transactionid"     (string) The transaction id
  ,...
]

Result: (for verbose = true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
    "fee" : n,              (numeric) transaction fee in XNA
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "wtxid" : hash,         (string) hash of serialized transaction, including witness data
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> neurai-cli getrawmempool true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getrawmempool:'getrawmempool',





/** getrawtransaction "txid" ( verbose )

NOTE: By default this function only works for mempool transactions. If the -txindex option is
enabled, it also works for blockchain transactions.
DEPRECATED: for now, it also works for transactions with unspent outputs.

Return the raw transaction data.

If verbose is 'true', returns an Object with information about 'txid'.
If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.

Arguments:
1. "txid"      (string, required) The transaction id
2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object

Result (if verbose is not set or set to false):
"data"      (string) The serialized, hex-encoded data for 'txid'

Result (if verbose is set to true):
{
  "hex" : "data",       (string) The serialized, hex-encoded data for 'txid'
  "txid" : "id",        (string) The transaction id (same as provided)
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The serialized transaction size
  "vsize" : n,            (numeric) The virtual transaction size (differs from size for witness transactions)
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric) 
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "sequence": n      (numeric) The script sequence number
       "txinwitness": ["hex", ...] (array of string) hex-encoded witness data (if any)
     }
     ,...
  ],
  "vout" : [              (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in XNA
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "addresses" : [           (json array of string)
           "address"        (string) neurai address
           ,...
         ]
       }
     }
     ,...
  ],
  "blockhash" : "hash",   (string) the block hash
  "confirmations" : n,      (numeric) The confirmations
  "time" : ttt,             (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt         (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
}

Examples:
> neurai-cli getrawtransaction "mytxid"
> neurai-cli getrawtransaction "mytxid" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["mytxid", true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getrawtransaction:'getrawtransaction',





/** getreceivedbyaccount "account" ( minconf )

DEPRECATED. Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.

Arguments:
1. "account"      (string, required) The selected account, may be the default account using "".
2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount              (numeric) The total amount in XNA received for this account.

Examples:

Amount received by the default account with at least 1 confirmation
> neurai-cli getreceivedbyaccount ""

Amount received at the tabby account including unconfirmed amounts with zero confirmations
> neurai-cli getreceivedbyaccount "tabby" 0

The amount with at least 6 confirmations
> neurai-cli getreceivedbyaccount "tabby" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaccount", "params": ["tabby", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getreceivedbyaccount:'getreceivedbyaccount',





/** getreceivedbyaddress "address" ( minconf )

Returns the total amount received by the given address in transactions with at least minconf confirmations.

Arguments:
1. "address"         (string, required) The neurai address for transactions.
2. minconf             (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount   (numeric) The total amount in XNA received at this address.

Examples:

The amount from transactions with at least 1 confirmation
> neurai-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"

The amount including unconfirmed transactions, zero confirmations
> neurai-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" 0

The amount with at least 6 confirmations
> neurai-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getreceivedbyaddress:'getreceivedbyaddress',





/** getrpcinfo
Returns details of the RPC server.

Result:
{
 "active_commands" (array) All active commands
  [
   {               (object) Information about an active command
    "method"       (string)  The name of the RPC command 
    "duration"     (numeric)  The running time in microseconds
   },...
  ],
}
> neurai-cli getrpcinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrpcinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getrpcinfo:'getrpcinfo',





/** getsnapshot "asset_name" block_height

Returns details for the asset snapshot, at the specified height

Arguments:
1. "asset_name"               (string, required) the name of the asset
2. block_height                 (int, required) the block height of the snapshot

Result:
{
  name: (string),
  height: (number),
  owners: [
    {
      address: (string),
      amount_owned: (number),
    }
}

Examples:
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getsnapshot", "params": ["ASSET_NAME" 28546] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getsnapshot:'getsnapshot',





/** getsnapshotrequest "asset_name" block_height

Retrieves the specified snapshot request details.

Arguments:
1. "asset_name"              (string, required) The asset name for which the snapshot will be taken
2. "block_height"            (number, required) The block height at which the snapshot will be take

Result:
{
  asset_name: (string),
  block_height: (number),
}

Examples:
> neurai-cli getsnapshotrequest "TRONCO" 12345
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getsnapshotrequest", "params": ["PHATSTACKS" 34987] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getsnapshotrequest:'getsnapshotrequest',





/** getspentinfo

Returns the txid and index where an output is spent.

Arguments:
{
  "txid" (string) The hex string of the txid
  "index" (number) The start block height
}

Result:
{
  "txid"  (string) The transaction id
  "index"  (number) The spending input index
  ,...
}

Examples:
> neurai-cli getspentinfo '{"txid": "0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9", "index": 0}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getspentinfo", "params": [{"txid": "0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9", "index": 0}] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getspentinfo:'getspentinfo',





/** gettransaction "txid" ( include_watchonly )

Get detailed information about in-wallet transaction <txid>

Arguments:
1. "txid"                  (string, required) The transaction id
2. "include_watchonly"     (bool, optional, default=false) Whether to include watch-only addresses in balance calculation and details[]

Result:
{
  "amount" : x.xxx,        (numeric) The transaction amount in XNA
  "fee": x.xxx,            (numeric) The amount of the fee in XNA. This is negative and only available for the 
                              'send' category of transactions.
  "confirmations" : n,     (numeric) The number of confirmations
  "blockhash" : "hash",  (string) The block hash
  "blockindex" : xx,       (numeric) The index of the transaction in the block that includes it
  "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
  "txid" : "transactionid",   (string) The transaction id.
  "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
  "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
  "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
                                                   may be unknown for unconfirmed transactions not in the mempool
  "details" : [
    {
      "account" : "accountname",      (string) DEPRECATED. The account name involved in the transaction, can be "" for the default account.
      "address" : "address",          (string) The neurai address involved in the transaction
      "category" : "send|receive",    (string) The category, either 'send' or 'receive'
      "amount" : x.xxx,                 (numeric) The amount in XNA
      "label" : "label",              (string) A comment for the address/transaction, if any
      "vout" : n,                       (numeric) the vout value
      "fee": x.xxx,                     (numeric) The amount of the fee in XNA. This is negative and only available for the 
                                           'send' category of transactions.
      "abandoned": xxx                  (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 
                                           'send' category of transactions.
    }
    ,...
  ],
  "asset_details" : [
    {
      "asset_type" : "new_asset|transfer_asset|reissue_asset", (string) The type of asset transaction
      "asset_name" : "asset_name",          (string) The name of the asset
      "amount" : x.xxx,                 (numeric) The amount in XNA
      "address" : "address",          (string) The neurai address involved in the transaction
      "vout" : n,                       (numeric) the vout value
      "category" : "send|receive",    (string) The category, either 'send' or 'receive'
    }
    ,...
  ],
  "hex" : "data"         (string) Raw data for transaction
}

Examples:
> neurai-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> neurai-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
gettransaction:'gettransaction',





/** gettxout "txid" n ( include_mempool )

Returns details about an unspent transaction output.

Arguments:
1. "txid"             (string, required) The transaction id
2. "n"                (numeric, required) vout number
3. "include_mempool"  (boolean, optional) Whether to include the mempool. Default: true.     Note that an unspent output that is spent in the mempool won't appear.

Result:
{
  "bestblock" : "hash",    (string) the block hash
  "confirmations" : n,       (numeric) The number of confirmations
  "value" : x.xxx,           (numeric) The transaction value in XNA
  "scriptPubKey" : {         (json object)
     "asm" : "code",       (string) 
     "hex" : "hex",        (string) 
     "reqSigs" : n,          (numeric) Number of required signatures
     "type" : "pubkeyhash", (string) The type, eg pubkeyhash
     "addresses" : [          (array of string) array of neurai addresses
        "address"     (string) neurai address
        ,...
     ]
  },
  "coinbase" : true|false   (boolean) Coinbase or not
}

Examples:

Get unspent transactions
> neurai-cli listunspent 

View the details
> neurai-cli gettxout "txid" 1

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxout", "params": ["txid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
gettxout:'gettxout',





/** gettxoutproof ["txid",...] ( blockhash )

Returns a hex-encoded proof that "txid" was included in a block.

NOTE: By default this function only works sometimes. This is when there is an
unspent output in the utxo for this transaction. To make it always work,
you need to maintain a transaction index, using the -txindex command line option or
specify the block in which the transaction is included manually (by blockhash).

Arguments:
1. "txids"       (string) A json array of txids to filter
    [
      "txid"     (string) A transaction hash
      ,...
    ]
2. "blockhash"   (string, optional) If specified, looks for txid in the block with this hash

Result:
"data"           (string) A string that is a serialized, hex-encoded data for the proof.
**/
gettxoutproof:'gettxoutproof',





/** gettxoutsetinfo

Returns statistics about the unspent transaction output set.
Note this call may take some time.

Result:
{
  "height":n,     (numeric) The current block height (index)
  "bestblock": "hex",   (string) the best block hash hex
  "transactions": n,      (numeric) The number of transactions
  "txouts": n,            (numeric) The number of output transactions
  "bogosize": n,          (numeric) A meaningless metric for UTXO set size
  "hash_serialized_2": "hash", (string) The serialized hash
  "disk_size": n,         (numeric) The estimated size of the chainstate on disk
  "total_amount": x.xxx          (numeric) The total amount
}

Examples:
> neurai-cli gettxoutsetinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutsetinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
gettxoutsetinfo:'gettxoutsetinfo',





/** getunconfirmedbalance
Returns the server's total unconfirmed balance
**/
getunconfirmedbalance:'getunconfirmedbalance',





/** getverifierstring restricted_name

Retrieve the verifier string that belongs to the given restricted asset

Arguments:
1. "restricted_name"          (string, required) the asset_name

Result:
"verifier_string", (string) The verifier for the asset

Examples:
> neurai-cli getverifierstring "restricted_name"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getverifierstring", "params": ["restricted_name"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getverifierstring:'getverifierstring',





/** getwalletinfo
Returns an object containing various wallet state info.

Result:
{
  "walletname": xxxxx,             (string) the wallet name
  "walletversion": xxxxx,          (numeric) the wallet version
  "balance": xxxxxxx,              (numeric) the total confirmed balance of the wallet in XNA
  "unconfirmed_balance": xxx,      (numeric) the total unconfirmed balance of the wallet in XNA
  "immature_balance": xxxxxx,      (numeric) the total immature balance of the wallet in XNA
  "txcount": xxxxxxx,              (numeric) the total number of transactions in the wallet
  "keypoololdest": xxxxxx,         (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,             (numeric) how many new keys are pre-generated (only counts external keys)
  "keypoolsize_hd_internal": xxxx, (numeric) how many new keys are pre-generated for internal use (used for change outputs, only appears if the wallet is using this feature, otherwise external keys are used)
  "unlocked_until": ttt,           (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,              (numeric) the transaction fee configuration, set in XNA/kB
  "hdseedid": "<hash160>"          (string, optional) the Hash160 of the HD seed (only present when HD is enabled)
  "hdmasterkeyid": "<hash160>"     (string, optional) alias for hdseedid retained for backwards-compatibility. Will be removed in V0.18.
}

Examples:
> neurai-cli getwalletinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
getwalletinfo:'getwalletinfo',





/** help ( "command" )

List all commands, or get help for a specified command.

Arguments:
1. "command"     (string, optional) The command to get help on

Result:
"text"     (string) The help text
**/
help:'help',





/** importaddress "address" ( "label" rescan p2sh )

Adds a script (in hex) or address that can be watched as if it were in your wallet but cannot be used to spend.

Arguments:
1. "script"           (string, required) The hex-encoded script (or address)
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions
4. p2sh                 (boolean, optional, default=false) Add the P2SH version of the script as well

Note: This call can take minutes to complete if rescan is true.
If you have the full public key, you should call importpubkey instead of this.

Note: If you import a non-standard raw script in hex form, outputs sending to it will be treated
as change, and not show up in many RPCs.

Examples:

Import a script with rescan
> neurai-cli importaddress "myscript"

Import using a label without rescan
> neurai-cli importaddress "myscript" "testing" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["myscript", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
importaddress:'importaddress',





/** importmulti "requests" ( "options" )

Import addresses/scripts (with private or public keys, redeem script (P2SH)), rescanning all addresses in one-shot-only (rescan can be disabled via options).

Arguments:
1. requests     (array, required) Data to be imported
  [     (array of json objects)
    {
      "scriptPubKey": "<script>" | { "address":"<address>" }, (string / json, required) Type of scriptPubKey (string for script, json for address)
      "timestamp": timestamp | "now"                        , (integer / string, required) Creation time of the key in seconds since epoch (Jan 1 1970 GMT),
                                                              or the string "now" to substitute the current synced blockchain time. The timestamp of the oldest
                                                              key will determine how far back blockchain rescans need to begin for missing wallet transactions.
                                                              "now" can be specified to bypass scanning, for keys which are known to never have been used, and
                                                              0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
                                                              creation time of all keys being imported by the importmulti call will be scanned.
      "redeemscript": "<script>"                            , (string, optional) Allowed only if the scriptPubKey is a P2SH address or a P2SH scriptPubKey
      "pubkeys": ["<pubKey>", ... ]                         , (array, optional) Array of strings giving pubkeys that must occur in the output or redeemscript
      "keys": ["<key>", ... ]                               , (array, optional) Array of strings giving private keys whose corresponding public keys must occur in the output or redeemscript
      "internal": <true>                                    , (boolean, optional, default: false) Stating whether matching outputs should be treated as not incoming payments
      "watchonly": <true>                                   , (boolean, optional, default: false) Stating whether matching outputs should be considered watched even when they're not spendable, only allowed if keys are empty
      "label": <label>                                      , (string, optional, default: '') Label to assign to the address (aka account name, for now), only allowed with internal=false
    }
  ,...
  ]
2. options                 (json, optional)
  {
     "rescan": <false>,         (boolean, optional, default: true) Stating if should rescan the blockchain after all imports
  }

Examples:
> neurai-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }, { "scriptPubKey": { "address": "<my 2nd address>" }, "label": "example 2", "timestamp": 1455191480 }]'
> neurai-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }]' '{ "rescan": false}'

Response is an array with the same size as the input that has the execution result :
  [{ "success": true } , { "success": false, "error": { "code": -1, "message": "Internal Server Error"} }, ... ]
**/
importmulti:'importmulti',





/** importprivkey "privkey" ( "label" ) ( rescan )

Adds a private key (as returned by dumpprivkey) to your wallet.

Arguments:
1. "privkey"          (string, required) The private key (see dumpprivkey)
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions

Note: This call can take minutes to complete if rescan is true.

Examples:

Dump a private key
> neurai-cli dumpprivkey "myaddress"

Import the private key with rescan
> neurai-cli importprivkey "mykey"

Import using a label and without rescan
> neurai-cli importprivkey "mykey" "testing" false

Import using default blank label and without rescan
> neurai-cli importprivkey "mykey" "" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["mykey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
importprivkey:'importprivkey',





/** importprunedfunds

Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.

Arguments:
1. "rawtransaction" (string, required) A raw transaction in hex funding an already-existing address in wallet
2. "txoutproof"     (string, required) The hex output from gettxoutproof that contains the transaction
**/
importprunedfunds:'importprunedfunds',





/** importpubkey "pubkey" ( "label" rescan )

Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend.

Arguments:
1. "pubkey"           (string, required) The hex-encoded public key
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions

Note: This call can take minutes to complete if rescan is true.

Examples:

Import a public key with rescan
> neurai-cli importpubkey "mypubkey"

Import using a label without rescan
> neurai-cli importpubkey "mypubkey" "testing" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importpubkey", "params": ["mypubkey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
importpubkey:'importpubkey',





/** importwallet "filename"

Imports keys from a wallet dump file (see dumpwallet).

Arguments:
1. "filename"    (string, required) The wallet file

Examples:

Dump the wallet
> neurai-cli dumpwallet "test"

Import the wallet
> neurai-cli importwallet "test"

Import using the json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
importwallet:'importwallet',





/** issue "asset_name" qty "( to_address )" "( change_address )" ( units ) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"

Issue an asset, subasset or unique asset.
Asset name must not conflict with any existing asset.
Unit as the number of decimals precision for the asset (0 for whole units ("1"), 8 for max precision ("1.00000000")
Reissuable is true/false for whether additional units can be issued by the original issuer.
If issuing a unique asset these values are required (and will be defaulted to): qty=1, units=0, reissuable=false.

Arguments:
1. "asset_name"            (string, required) a unique name
2. "qty"                   (numeric, optional, default=1) the number of units to be issued
3. "to_address"            (string), optional, default=""), address asset will be sent to, if it is empty, address will be generated for you
4. "change_address"        (string), optional, default=""), address the the xna change will be sent to, if it is empty, change address will be generated for you
5. "units"                 (integer, optional, default=0, min=0, max=8), the number of decimals precision for the asset (0 for whole units ("1"), 8 for max precision ("1.00000000")
6. "reissuable"            (boolean, optional, default=true (false for unique assets)), whether future reissuance is allowed
7. "has_ipfs"              (boolean, optional, default=false), whether ipfs hash is going to be added to the asset
8. "ipfs_hash"             (string, optional but required if has_ipfs = 1), an ipfs hash or a txid hash once RIP5 is activated

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli issue "ASSET_NAME" 1000
> neurai-cli issue "ASSET_NAME" 1000 "myaddress"
> neurai-cli issue "ASSET_NAME" 1000 "myaddress" "changeaddress" 4
> neurai-cli issue "ASSET_NAME" 1000 "myaddress" "changeaddress" 2 true
> neurai-cli issue "ASSET_NAME" 1000 "myaddress" "changeaddress" 8 false true QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E
> neurai-cli issue "ASSET_NAME/SUB_ASSET" 1000 "myaddress" "changeaddress" 2 true
> neurai-cli issue "ASSET_NAME#uniquetag"
**/
issue:'issue',





/** issuequalifierasset "asset_name" qty "( to_address )" "( change_address )" ( has_ipfs ) "( ipfs_hash )"

Issue an qualifier or sub qualifier asset
If the '#' character isn't added, it will be added automatically
Amount is a number between 1 and 10
Asset name must not conflict with any existing asset.
Unit is always set to Zero (0) for qualifier assets
Reissuable is always set to false for qualifier assets

Arguments:
1. "asset_name"            (string, required) a unique name
2. "qty"                   (numeric, optional, default=1) the number of units to be issued
3. "to_address"            (string), optional, default=""), address asset will be sent to, if it is empty, address will be generated for you
4. "change_address"        (string), optional, default=""), address the the xna change will be sent to, if it is empty, change address will be generated for you
5. "has_ipfs"              (boolean, optional, default=false), whether ipfs hash is going to be added to the asset
6. "ipfs_hash"             (string, optional but required if has_ipfs = 1), an ipfs hash or a txid hash once RIP5 is activated

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli issuequalifierasset "#ASSET_NAME" 1000
> neurai-cli issuequalifierasset "ASSET_NAME" 1000 "myaddress"
> neurai-cli issuequalifierasset "#ASSET_NAME" 1000 "myaddress" "changeaddress"
> neurai-cli issuequalifierasset "ASSET_NAME" 1000 "myaddress" "changeaddress"
> neurai-cli issuequalifierasset "#ASSET_NAME" 1000 "myaddress" "changeaddress" true QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E
> neurai-cli issuequalifierasset "ASSET_NAME/SUB_QUALIFIER" 1000 "myaddress" "changeaddress"
> neurai-cli issuequalifierasset "#ASSET_NAME"
**/
issuequalifierasset:'issuequalifierasset',





/** issuerestrictedasset "asset_name" qty "verifier" "to_address" "( change_address )" (units) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"

Issue a restricted asset.
Restricted asset names must not conflict with any existing restricted asset.
Restricted assets have units set to 0.
Reissuable is true/false for whether additional asset quantity can be created and if the verifier string can be changed

Arguments:
1. "asset_name"            (string, required) a unique name, starts with '$', if '$' is not there it will be added automatically
2. "qty"                   (numeric, required) the quantity of the asset to be issued
3. "verifier"              (string, required) the verifier string that will be evaluated when restricted asset transfers are made
4. "to_address"            (string, required) address asset will be sent to, this address must meet the verifier string requirements
5. "change_address"        (string, optional, default="") address that the xna change will be sent to, if it is empty, change address will be generated for you
6. "units"                 (integer, optional, default=0, min=0, max=8) the number of decimals precision for the asset (0 for whole units ("1"), 8 for max precision ("1.00000000")
7. "reissuable"            (boolean, optional, default=true (false for unique assets)) whether future reissuance is allowed
8. "has_ipfs"              (boolean, optional, default=false) whether an ipfs hash or txid hash is going to be added to the asset
9. "ipfs_hash"             (string, optional but required if has_ipfs = 1) an ipfs hash or a txid hash once RIP5 is activated

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli issuerestrictedasset "$ASSET_NAME" 1000 "#KYC & !#AML" "myaddress"
> neurai-cli issuerestrictedasset "$ASSET_NAME" 1000 "#KYC & !#AML" "myaddress"
> neurai-cli issuerestrictedasset "$ASSET_NAME" 1000 "#KYC & !#AML" "myaddress" "changeaddress" 5
> neurai-cli issuerestrictedasset "$ASSET_NAME" 1000 "#KYC & !#AML" "myaddress" "changeaddress" 8 true
> neurai-cli issuerestrictedasset "$ASSET_NAME" 1000 "#KYC & !#AML" "myaddress" "changeaddress" 0 false true QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E
**/
issuerestrictedasset:'issuerestrictedasset',





/** issueunique "root_name" [asset_tags] ( [ipfs_hashes] ) "( to_address )" "( change_address )"

Issue unique asset(s).
root_name must be an asset you own.
An asset will be created for each element of asset_tags.
If provided ipfs_hashes must be the same length as asset_tags.
Five (5) XNA will be burned for each asset created.

Arguments:
1. "root_name"             (string, required) name of the asset the unique asset(s) are being issued under
2. "asset_tags"            (array, required) the unique tag for each asset which is to be issued
3. "ipfs_hashes"           (array, optional) ipfs hashes or txid hashes corresponding to each supplied tag (should be same size as "asset_tags")
4. "to_address"            (string, optional, default=""), address assets will be sent to, if it is empty, address will be generated for you
5. "change_address"        (string, optional, default=""), address the the xna change will be sent to, if it is empty, change address will be generated for you

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli issueunique "MY_ASSET" '["primo","secundo"]'
> neurai-cli issueunique "MY_ASSET" '["primo","secundo"]' '["first_hash","second_hash"]'
**/
issueunique:'issueunique',





/** isvalidverifierstring verifier_string

Checks to see if the given verifier string is valid

Arguments:
1. "verifier_string"   (string, required) the verifier string to check

Result:
"xxxxxxx", (string) If the verifier string is valid, and the reason

Examples:
> neurai-cli isvalidverifierstring "verifier_string"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "isvalidverifierstring", "params": ["verifier_string"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
isvalidverifierstring:'isvalidverifierstring',





/** keypoolrefill ( newsize )

Fills the keypool.

Arguments
1. newsize     (numeric, optional, default=100) The new keypool size

Examples:
> neurai-cli keypoolrefill 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
keypoolrefill:'keypoolrefill',





/** listaccounts ( minconf include_watchonly)

DEPRECATED. Returns Object that has account names as keys, account balances as values.

Arguments:
1. minconf             (numeric, optional, default=1) Only include transactions with at least this many confirmations
2. include_watchonly   (bool, optional, default=false) Include balances in watch-only addresses (see 'importaddress')

Result:
{                      (json object where keys are account names, and values are numeric balances
  "account": x.xxx,  (numeric) The property name is the account name, and the value is the total balance for the account.
  ...
}

Examples:

List account balances where there at least 1 confirmation
> neurai-cli listaccounts 

List account balances including zero confirmation transactions
> neurai-cli listaccounts 0

List account balances for 6 or more confirmations
> neurai-cli listaccounts 6

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [6] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listaccounts:'listaccounts',





/** listaddressesbyasset "asset_name" (onlytotal) (count) (start)

Returns a list of all address that own the given asset (with balances)
Or returns the total size of how many address own the given asset
Arguments:
1. "asset_name"               (string, required) name of asset
2. "onlytotal"                (boolean, optional, default=false) when false result is just a list of addresses with balances -- when true the result is just a single number representing the number of addresses
3. "count"                    (integer, optional, default=50000, MAX=50000) truncates results to include only the first _count_ assets found
4. "start"                    (integer, optional, default=0) results skip over the first _start_ assets found (if negative it skips back from the end)

Result:
[   (address): balance,
  ...
]

Examples:
> neurai-cli listaddressesbyasset "ASSET_NAME" false 2 0
> neurai-cli listaddressesbyasset "ASSET_NAME" true
> neurai-cli listaddressesbyasset "ASSET_NAME"
**/
listaddressesbyasset:'listaddressesbyasset',





/** listaddressesfortag tag_name

List all addresses that have been assigned a given tag

Arguments:
1. "tag_name"          (string, required) the tag asset name to search for

Result:
["address",        (string) The address
...,
]

Examples:
> neurai-cli listaddressesfortag "#TAG"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressesfortag", "params": ["#TAG"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listaddressesfortag:'listaddressesfortag',





/** listaddressgroupings

Lists groups of addresses which have had their common ownership
made public by common use as inputs or as the resulting change
in past transactions

Result:
[
  [
    [
      "address",            (string) The neurai address
      amount,                 (numeric) The amount in XNA
      "account"             (string, optional) DEPRECATED. The account
    ]
    ,...
  ]
  ,...
]

Examples:
> neurai-cli listaddressgroupings 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listaddressgroupings:'listaddressgroupings',





/** listaddressrestrictions address

List all assets that have frozen this address

Arguments:
1. "address"          (string), required) the address to list restrictions for

Result:
["asset_name",        (string) The restriction name
...,
]

Examples:
> neurai-cli listaddressrestrictions "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressrestrictions", "params": ["address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listaddressrestrictions:'listaddressrestrictions',





/** listassetbalancesbyaddress "address" (onlytotal) (count) (start)

Returns a list of all asset balances for an address.

Arguments:
1. "address"                  (string, required) a neurai address
2. "onlytotal"                (boolean, optional, default=false) when false result is just a list of assets balances -- when true the result is just a single number representing the number of assets
3. "count"                    (integer, optional, default=50000, MAX=50000) truncates results to include only the first _count_ assets found
4. "start"                    (integer, optional, default=0) results skip over the first _start_ assets found (if negative it skips back from the end)

Result:
{
  (asset_name) : (quantity),
  ...
}

Examples:
> neurai-cli listassetbalancesbyaddress "myaddress" false 2 0
> neurai-cli listassetbalancesbyaddress "myaddress" true
> neurai-cli listassetbalancesbyaddress "myaddress"
**/
listassetbalancesbyaddress:'listassetbalancesbyaddress',





/** listassets "( asset )" ( verbose ) ( count ) ( start )

Returns a list of all assets

This could be a slow/expensive operation as it reads from the database

Arguments:
1. "asset"                    (string, optional, default="*") filters results -- must be an asset name or a partial asset name followed by '*' ('*' matches all trailing characters)
2. "verbose"                  (boolean, optional, default=false) when false result is just a list of asset names -- when true results are asset name mapped to metadata
3. "count"                    (integer, optional, default=ALL) truncates results to include only the first _count_ assets found
4. "start"                    (integer, optional, default=0) results skip over the first _start_ assets found (if negative it skips back from the end)

Result (verbose=false):
[
  asset_name,
  ...
]

Result (verbose=true):
{
  (asset_name):
    {
      amount: (number),
      units: (number),
      reissuable: (number),
      has_ipfs: (number),
      ipfs_hash: (hash) (only if has_ipfs = 1 and data is a ipfs hash)
      ipfs_hash: (hash) (only if has_ipfs = 1 and data is a txid hash)
    },
  {...}, {...}
}

Examples:
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listassets", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli listassets ASSET
> neurai-cli listassets "ASSET*" true 10 20
**/
listassets:'listassets',





/** listbanned

List all banned IPs/Subnets.

Examples:
> neurai-cli listbanned 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listbanned:'listbanned',





/** listdepinholders "asset_name"

Returns all addresses holding a DEPIN asset with validity status

DEPIN assets are soulbound (non-transferable except by owner) and can be frozen/revoked

Arguments:
1. "asset_name"      (string, required) The DEPIN asset name (must start with &)

Result:
[
  {
    "address": "address",     (string) The address
    "amount": n,                (numeric) The amount (always 1 for DEPIN)
    "valid": 1|0                (numeric) 1 = active/valid, 0 = blocked/revoked
  },
  ...
]

Examples:
> neurai-cli listdepinholders "&FRANCE"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listdepinholders", "params": ["&FRANCE"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listdepinholders:'listdepinholders',





/** listglobalrestrictions

List all global restricted assets

Result:
["asset_name", (string) The asset name
...,
]

Examples:
> neurai-cli listglobalrestrictions 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listglobalrestrictions", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listglobalrestrictions:'listglobalrestrictions',





/** listlockunspent

Returns list of temporarily unspendable outputs.
See the lockunspent call to lock and unlock transactions for spending.

Result:
[
  {
    "txid" : "transactionid",     (string) The transaction id locked
    "vout" : n                      (numeric) The vout value
  }
  ,...
]

Examples:

List the unspent transactions
> neurai-cli listunspent 

Lock an unspent transaction
> neurai-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

List the locked transactions
> neurai-cli listlockunspent 

Unlock the transaction again
> neurai-cli lockunspent true "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listlockunspent:'listlockunspent',





/** listmyassets "( asset )" ( verbose ) ( count ) ( start ) (confs) 

Returns a list of all asset that are owned by this wallet

Arguments:
1. "asset"                    (string, optional, default="*") filters results -- must be an asset name or a partial asset name followed by '*' ('*' matches all trailing characters)
2. "verbose"                  (boolean, optional, default=false) when false results only contain balances -- when true results include outpoints
3. "count"                    (integer, optional, default=ALL) truncates results to include only the first _count_ assets found
4. "start"                    (integer, optional, default=0) results skip over the first _start_ assets found (if negative it skips back from the end)
5. "confs"                    (integet, optional, default=0) results are skipped if they don't have this number of confirmations

Result (verbose=false):
{
  (asset_name): balance,
  ...
}

Result (verbose=true):
{
  (asset_name):
    {
      "balance": balance,
      "outpoints":
        [
          {
            "txid": txid,
            "vout": vout,
            "amount": amount
          }
          {...}, {...}
        ]
    }
}
{...}, {...}

Examples:
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listmyassets", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli listmyassets ASSET
> neurai-cli listmyassets "ASSET*" true 10 20
> neurai-cli listmyassets "ASSET*" true 10 20 1
**/
listmyassets:'listmyassets',





/** listreceivedbyaccount ( minconf include_empty include_watchonly)

DEPRECATED. List balances by account.

Arguments:
1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. include_empty     (bool, optional, default=false) Whether to include accounts that haven't received any payments.
3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').

Result:
[
  {
    "involvesWatchonly" : true,   (bool) Only returned if imported addresses were involved in transaction
    "account" : "accountname",  (string) The account name of the receiving account
    "amount" : x.xxx,             (numeric) The total amount received by addresses with this account
    "confirmations" : n,          (numeric) The number of confirmations of the most recent transaction included
    "label" : "label"           (string) A comment for the address/transaction, if any
  }
  ,...
]

Examples:
> neurai-cli listreceivedbyaccount 
> neurai-cli listreceivedbyaccount 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaccount", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listreceivedbyaccount:'listreceivedbyaccount',





/** listreceivedbyaddress ( minconf include_empty include_watchonly)

List balances by receiving address.

Arguments:
1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. include_empty     (bool, optional, default=false) Whether to include addresses that haven't received any payments.
3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').

Result:
[
  {
    "involvesWatchonly" : true,        (bool) Only returned if imported addresses were involved in transaction
    "address" : "receivingaddress",  (string) The receiving address
    "account" : "accountname",       (string) DEPRECATED. The account of the receiving address. The default account is "".
    "amount" : x.xxx,                  (numeric) The total amount in XNA received by the address
    "confirmations" : n,               (numeric) The number of confirmations of the most recent transaction included
    "label" : "label",               (string) A comment for the address/transaction, if any
    "txids": [
       n,                                (numeric) The ids of transactions received with the address 
       ...
    ]
  }
  ,...
]

Examples:
> neurai-cli listreceivedbyaddress 
> neurai-cli listreceivedbyaddress 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listreceivedbyaddress:'listreceivedbyaddress',





/** listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )

Get all transactions in blocks since block [blockhash], or all transactions if omitted.
If "blockhash" is no longer a part of the main chain, transactions from the fork point onward are included.
Additionally, if include_removed is set, transactions affecting the wallet which were removed are returned in the "removed" array.

Arguments:
1. "blockhash"            (string, optional) The block hash to list transactions since
2. target_confirmations:    (numeric, optional, default=1) Return the nth block hash from the main chain. e.g. 1 would mean the best block hash. Note: this is not used as a filter, but only affects [lastblock] in the return value
3. include_watchonly:       (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')
4. include_removed:         (bool, optional, default=true) Show transactions that were removed due to a reorg in the "removed" array
                                                           (not guaranteed to work on pruned nodes)

Result:
{
  "transactions": [
    "account":"accountname",       (string) DEPRECATED. The account name associated with the transaction. Will be "" for the default account.
    "address":"address",    (string) The neurai address of the transaction. Not present for move transactions (category = move).
    "category":"send|receive",     (string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
    "amount": x.xxx,          (numeric) The amount in XNA. This is negative for the 'send' category, and for the 'move' category for moves 
                                          outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds.
    "vout" : n,               (numeric) the vout value
    "fee": x.xxx,             (numeric) The amount of the fee in XNA. This is negative and only available for the 'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions.
                                          When it's < 0, it means the transaction conflicted that many blocks ago.
    "blockhash": "hashvalue",     (string) The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
    "blockindex": n,          (numeric) The index of the transaction in the block that includes it. Available for 'send' and 'receive' category of transactions.
    "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    "txid": "transactionid",  (string) The transaction id. Available for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions.
    "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
                                                   may be unknown for unconfirmed transactions not in the mempool
    "abandoned": xxx,         (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "label" : "label"       (string) A comment for the address/transaction, if any
    "to": "...",            (string) If a comment to is associated with the transaction.
  ],
  "removed": [
    <structure is the same as "transactions" above, only present if include_removed=true>
    Note: transactions that were readded in the active chain will appear as-is in this array, and may thus have a positive confirmation count.
  ],
  "lastblock": "lastblockhash"     (string) The hash of the block (target_confirmations-1) from the best block on the main chain. This is typically used to feed back into listsinceblock the next time you call it. So you would generally use a target_confirmations of say 6, so you will be continually re-notified of transactions until they've reached 6 confirmations plus any new ones
}

Examples:
> neurai-cli listsinceblock 
> neurai-cli listsinceblock "000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad" 6
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listsinceblock:'listsinceblock',





/** listsnapshotrequests ["asset_name" [block_height]]

List snapshot request details.

Arguments:
asset_name: (string, optional) List only requests for a specific asset (default is "" for ALL)
block_height: (number, optional) List only requests for a particular block height (default is 0 for ALL)

Result:
[
  {
    asset_name: (string),
    block_height: (number)
  }
]

Examples:
> neurai-cli listsnapshotrequests 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsnapshotrequests", "params": ["TRONCO" 345333] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listsnapshotrequests:'listsnapshotrequests',





/** listtagsforaddress address

List all tags assigned to an address

Arguments:
1. "address"          (string, required) the address to list tags for

Result:
["tag_name",        (string) The tag name
...,
]

Examples:
> neurai-cli listtagsforaddress "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtagsforaddress", "params": ["address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listtagsforaddress:'listtagsforaddress',





/** listtransactions ( "account" count skip include_watchonly)

Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.

Arguments:
1. "account"    (string, optional) DEPRECATED. The account name. Should be "*".
2. count          (numeric, optional, default=10) The number of transactions to return
3. skip           (numeric, optional, default=0) The number of transactions to skip
4. include_watchonly (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')

Result:
[
  {
    "account":"accountname",       (string) DEPRECATED. The account name associated with the transaction. 
                                                It will be "" for the default account.
    "address":"address",    (string) The neurai address of the transaction. Not present for 
                                                move transactions (category = move).
    "category":"send|receive|move", (string) The transaction category. 'move' is a local (off blockchain)
                                                transaction between accounts, and not associated with an address,
                                                transaction id or block. 'send' and 'receive' transactions are 
                                                associated with an address, transaction id and block details
    "amount": x.xxx,          (numeric) The amount in XNA. This is negative for the 'send' category, and for the
                                         'move' category for moves outbound. It is positive for the 'receive' category,
                                         and for the 'move' category for inbound funds.
    "label": "label",       (string) A comment for the address/transaction, if any
    "vout": n,                (numeric) the vout value
    "fee": x.xxx,             (numeric) The amount of the fee in XNA. This is negative and only available for the 
                                         'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 
                                         'receive' category of transactions. Negative confirmations indicate the
                                         transaction conflicts with the block chain
    "trusted": xxx,           (bool) Whether we consider the outputs of this unconfirmed transaction safe to spend.
    "blockhash": "hashvalue", (string) The block hash containing the transaction. Available for 'send' and 'receive'
                                          category of transactions.
    "blockindex": n,          (numeric) The index of the transaction in the block that includes it. Available for 'send' and 'receive'
                                          category of transactions.
    "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    "txid": "transactionid", (string) The transaction id. Available for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (midnight Jan 1 1970 GMT). Available 
                                          for 'send' and 'receive' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "otheraccount": "accountname",  (string) DEPRECATED. For the 'move' category of transactions, the account the funds came 
                                          from (for receiving funds, positive amounts), or went to (for sending funds,
                                          negative amounts).
    "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
                                                     may be unknown for unconfirmed transactions not in the mempool
    "abandoned": xxx          (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 
                                         'send' category of transactions.
  }
]

Examples:

List the most recent 10 transactions in the systems
> neurai-cli listtransactions 

List transactions 100 to 120
> neurai-cli listtransactions "*" 20 100

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listtransactions:'listtransactions',





/** listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] [query_options])

Returns array of unspent transaction outputs
with between minconf and maxconf (inclusive) confirmations.
Optionally filter to only include txouts paid to specified addresses.

Arguments:
1. minconf          (numeric, optional, default=1) The minimum confirmations to filter
2. maxconf          (numeric, optional, default=9999999) The maximum confirmations to filter
3. "addresses"      (string) A json array of neurai addresses to filter
    [
      "address"     (string) neurai address
      ,...
    ]
4. include_unsafe (bool, optional, default=true) Include outputs that are not safe to spend
                  See description of "safe" attribute below.
5. query_options    (json, optional) JSON with query options
    {
      "minimumAmount"    (numeric or string, default=0) Minimum value of each UTXO in XNA
      "maximumAmount"    (numeric or string, default=unlimited) Maximum value of each UTXO in XNA
      "maximumCount"     (numeric or string, default=unlimited) Maximum number of UTXOs
      "minimumSumAmount" (numeric or string, default=unlimited) Minimum sum value of all UTXOs in XNA
    }

Result
[                   (array of json object)
  {
    "txid" : "txid",          (string) the transaction id 
    "vout" : n,               (numeric) the vout value
    "address" : "address",    (string) the neurai address
    "account" : "account",    (string) DEPRECATED. The associated account, or "" for the default account
    "scriptPubKey" : "key",   (string) the script key
    "amount" : x.xxx,         (numeric) the transaction output amount in XNA
    "confirmations" : n,      (numeric) The number of confirmations
    "redeemScript" : n        (string) The redeemScript if scriptPubKey is P2SH
    "spendable" : xxx,        (bool) Whether we have the private keys to spend this output
    "solvable" : xxx,         (bool) Whether we know how to spend this output, ignoring the lack of keys
    "safe" : xxx              (bool) Whether this output is considered safe to spend. Unconfirmed transactions
                              from outside keys and unconfirmed replacement transactions are considered unsafe
                              and are not eligible for spending by fundrawtransaction and sendtoaddress.
  }
  ,...
]

Examples
> neurai-cli listunspent 
> neurai-cli listunspent 6 9999999 "[\"1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg\",\"1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP\"]"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999 "[\"1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg\",\"1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli listunspent 6 9999999 '[]' true '{ "minimumAmount": 0.005 }'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, [] , true, { "minimumAmount": 0.005 } ] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listunspent:'listunspent',





/** listwallets
Returns a list of currently loaded wallets.
For full information on the wallet, use "getwalletinfo"

Result:
[                         (json array of strings)
  "walletname"            (string) the wallet name
   ...
]

Examples:
> neurai-cli listwallets 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listwallets", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
listwallets:'listwallets',





/** lockunspent unlock ([{"txid":"txid","vout":n},...])

Updates list of temporarily unspendable outputs.
Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.
If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.
A locked transaction output will not be chosen by automatic coin selection, when spending neurais.
Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list
is always cleared (by virtue of process exit) when a node stops or fails.
Also see the listunspent call

Arguments:
1. unlock            (boolean, required) Whether to unlock (true) or lock (false) the specified transactions
2. "transactions"  (string, optional) A json array of objects. Each object the txid (string) vout (numeric)
     [           (json array of json objects)
       {
         "txid":"id",    (string) The transaction id
         "vout": n         (numeric) The output number
       }
       ,...
     ]

Result:
true|false    (boolean) Whether the command was successful or not

Examples:

List the unspent transactions
> neurai-cli listunspent 

Lock an unspent transaction
> neurai-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

List the locked transactions
> neurai-cli listlockunspent 

Unlock the transaction again
> neurai-cli lockunspent true "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
lockunspent:'lockunspent',





/** move "fromaccount" "toaccount" amount ( minconf "comment" )

DEPRECATED. Move a specified amount from one account in your wallet to another.

Arguments:
1. "fromaccount"   (string, required) The name of the account to move funds from. May be the default account using "".
2. "toaccount"     (string, required) The name of the account to move funds to. May be the default account using "".
3. amount            (numeric) Quantity of XNA to move between accounts.
4. (dummy)           (numeric, optional) Ignored. Remains for backward compatibility.
5. "comment"       (string, optional) An optional comment, stored in the wallet only.

Result:
true|false           (boolean) true if successful.

Examples:

Move 0.01 XNA from the default account to the account named tabby
> neurai-cli move "" "tabby" 0.01

Move 0.01 XNA timotei to akiko with a comment and funds have 6 confirmations
> neurai-cli move "timotei" "akiko" 0.01 6 "happy birthday!"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "move", "params": ["timotei", "akiko", 0.01, 6, "happy birthday!"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
move:'move',





/** ping

Requests that a ping be sent to all other nodes, to measure ping time.
Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.

Examples:
> neurai-cli ping 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ping", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
ping:'ping',





/** pprpcsb "header_hash" "mix_hash" "nonce"

Attempts to submit new block to network mined by kawpow gpu miner via rpc.

Arguments
1. "header_hash"        (string, required) the prow_pow header hash that was given to the gpu miner from this rpc client
2. "mix_hash"           (string, required) the mix hash that was mined by the gpu miner via rpc
3. "nonce"              (string, required) the nonce of the block that hashed the valid block

Result:

Examples:
> neurai-cli pprpcsb "header_hash" "mix_hash" 100000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "pprpcsb", "params": ["header_hash" "mix_hash" 100000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
pprpcsb:'pprpcsb',





/** preciousblock "blockhash"

Treats a block as if it were received before others with the same work.

A later preciousblock call can override the effect of an earlier one.

The effects of preciousblock are not retained across restarts.

Arguments:
1. "blockhash"   (string, required) the hash of the block to mark as precious

Result:

Examples:
> neurai-cli preciousblock "blockhash"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "preciousblock", "params": ["blockhash"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
preciousblock:'preciousblock',





/** prioritisetransaction <txid> <dummy value> <fee delta>
Accepts the transaction into mined blocks at a higher (or lower) priority

Arguments:
1. "txid"       (string, required) The transaction id.
2. dummy          (numeric, optional) API-Compatibility for previous API. Must be zero or null.
                  DEPRECATED. For forward compatibility use named arguments and omit this parameter.
3. fee_delta      (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).
                  The fee is not actually paid, only the algorithm for selecting transactions into a block
                  considers the transaction as it would have paid a higher (or lower) fee.

Result:
true              (boolean) Returns true

Examples:
> neurai-cli prioritisetransaction "txid" 0.0 10000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["txid", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
prioritisetransaction:'prioritisetransaction',





/** pruneblockchain

Arguments:
1. "height"       (numeric, required) The block height to prune up to. May be set to a discrete height, or a unix timestamp
                  to prune blocks whose block time is at least 2 hours older than the provided timestamp.

Result:
n    (numeric) Height of the last block pruned.

Examples:
> neurai-cli pruneblockchain 1000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "pruneblockchain", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
pruneblockchain:'pruneblockchain',





/** purgesnapshot "asset_name" block_height

Removes details for the asset snapshot, at the specified height

Arguments:
1. "asset_name"               (string, required) the name of the asset
2. block_height                 (int, required) the block height of the snapshot

Result:
{
  name: (string),
  height: (number),
}

Examples:
> neurai-cli purgesnapshot "ASSET_NAME" 28546
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "purgesnapshot", "params": ["ASSET_NAME" 28546] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
purgesnapshot:'purgesnapshot',





/** reissue "asset_name" qty "to_address" "change_address" ( reissuable ) ( new_units) "( new_ipfs )" 

Reissues a quantity of an asset to an owned address if you own the Owner Token
Can change the reissuable flag during reissuance
Can change the ipfs hash during reissuance
Arguments:
1. "asset_name"               (string, required) name of asset that is being reissued
2. "qty"                      (numeric, required) number of assets to reissue
3. "to_address"               (string, required) address to send the asset to
4. "change_address"           (string, optional) address that the change of the transaction will be sent to
5. "reissuable"               (boolean, optional, default=true), whether future reissuance is allowed
6. "new_units"                (numeric, optional, default=-1), the new units that will be associated with the asset
7. "new_ipfs"                 (string, optional, default=""), whether to update the current ipfs hash or txid once RIP5 is active

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli reissue "ASSET_NAME" 20 "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "reissue", "params": ["ASSET_NAME" 20 "address" "change_address" "true" 8 "Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
reissue:'reissue',





/** reissuerestrictedasset "asset_name" qty to_address ( change_verifier ) ( "new_verifier" ) "( change_address )" ( new_units ) ( reissuable ) "( new_ipfs )"

Reissue an already created restricted asset
Reissuable is true/false for whether additional asset quantity can be created and if the verifier string can be changed

Arguments:
1. "asset_name"            (string, required) a unique name, starts with '$'
2. "qty"                   (numeric, required) the additional quantity of the asset to be issued
3. "to_address"            (string, required) address asset will be sent to, this address must meet the verifier string requirements
4. "change_verifier"       (boolean, optional, default=false) if the verifier string will get changed
5. "new_verifier"          (string, optional, default="") the new verifier string that will be evaluated when restricted asset transfers are made
6. "change_address"        (string, optional, default="") address that the xna change will be sent to, if it is empty, change address will be generated for you
7. "new_units"             (numeric, optional, default=-1) the new units that will be associated with the asset
8. "reissuable"            (boolean, optional, default=true (false for unique assets)) whether future reissuance is allowed
9. "new_ipfs"              (string, optional, default="") whether to update the current ipfs hash or txid once RIP5 is active

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli reissuerestrictedasset "$ASSET_NAME" 1000  "myaddress" true "KYC & !AML"
> neurai-cli reissuerestrictedasset "$ASSET_NAME" 1000  "myaddress" true "KYC & !AML" 
> neurai-cli reissuerestrictedasset "$ASSET_NAME" 1000  "myaddress" true "KYC & !AML" "changeaddress"
> neurai-cli reissuerestrictedasset "$ASSET_NAME" 1000  "myaddress" true "KYC & !AML" "changeaddress" -1 true
> neurai-cli reissuerestrictedasset "$ASSET_NAME" 1000  "myaddress" false "" "changeaddress" -1 false QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E
**/
reissuerestrictedasset:'reissuerestrictedasset',





/** removeprunedfunds "txid"

Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances.

Arguments:
1. "txid"           (string, required) The hex-encoded id of the transaction you are deleting

Examples:
> neurai-cli removeprunedfunds "a8d0c0184dde994a09ec054286f1ce581bebf46446a512166eae7628734ea0a5"

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "removeprunedfunds", "params": ["a8d0c0184dde994a09ec054286f1ce581bebf46446a512166eae7628734ea0a5"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
removeprunedfunds:'removeprunedfunds',





/** removetagfromaddress tag_name to_address (change_address) (asset_data)

Remove a tag from a address

Arguments:
1. "tag_name"            (string, required) the name of the tag you are removing from the address
2. "to_address"          (string, required) the address that the tag will be removed from
3. "change_address"      (string, optional) The change address for the qualifier token to be sent to
4. "asset_data"          (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the qualifier token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli removetagfromaddress "#TAG" "to_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "removetagfromaddress", "params": ["#TAG" "to_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli removetagfromaddress "#TAG" "to_address" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "removetagfromaddress", "params": ["#TAG" "to_address" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
removetagfromaddress:'removetagfromaddress',





/** requestsnapshot "asset_name" block_height

Schedules a snapshot of the specified asset at the specified block height.

Arguments:
1. "asset_name"              (string, required) The asset name for which the snapshot will be taken
2. "block_height"            (number, required) The block height at which the snapshot will be take

Result:
{
  request_status: "Added",
}

Examples:
> neurai-cli requestsnapshot "TRONCO" 12345
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "requestsnapshot", "params": ["PHATSTACKS" 34987] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
requestsnapshot:'requestsnapshot',





/** rescanblockchain ("start_height") ("stop_height")

Rescan the local blockchain for wallet related transactions.

Arguments:
1. "start_height"    (numeric, optional) block height where the rescan should start
2. "stop_height"     (numeric, optional) the last block height that should be scanned

Result:
{
  "start_height"     (numeric) The block height where the rescan has started. If omitted, rescan started from the genesis block.
  "stop_height"      (numeric) The height of the last rescanned block. If omitted, rescan stopped at the chain tip.
}

Examples:
> neurai-cli rescanblockchain 100000 120000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "rescanblockchain", "params": [100000, 120000] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
rescanblockchain:'rescanblockchain',





/** savemempool

Dumps the mempool to disk.

Examples:
> neurai-cli savemempool 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "savemempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
savemempool:'savemempool',





/** selfrevokedepin "asset_name"

Self-revoke a DEPIN asset held in this wallet

The asset will be marked as invalid but will remain in the address

This action can only be undone by the asset owner

Arguments:
1. "asset_name"       (string, required) The DEPIN asset name (must start with &)

Result:
"txid"                (string) The transaction id

Examples:
> neurai-cli selfrevokedepin "&FRANCE"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "selfrevokedepin", "params": ["&FRANCE"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
selfrevokedepin:'selfrevokedepin',





/** sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )

DEPRECATED (use sendtoaddress). Sent an amount from an account to a neurai address.

Arguments:
1. "fromaccount"       (string, required) The name of the account to send funds from. May be the default account using "".
                       Specifying an account does not influence coin selection, but it does associate the newly created
                       transaction with the account, so the account's balance computation and transaction history can reflect
                       the spend.
2. "toaddress"         (string, required) The neurai address to send funds to.
3. amount                (numeric or string, required) The amount in XNA (transaction fee is added on top).
4. minconf               (numeric, optional, default=1) Only use funds with at least this many confirmations.
5. "comment"           (string, optional) A comment used to store what the transaction is for. 
                                     This is not part of the transaction, just kept in your wallet.
6. "comment_to"        (string, optional) An optional comment to store the name of the person or organization 
                                     to which you're sending the transaction. This is not part of the transaction, 
                                     it is just kept in your wallet.

Result:
"txid"                 (string) The transaction id.

Examples:

Send 0.01 XNA from the default account to the address, must have at least 1 confirmation
> neurai-cli sendfrom "" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.01

Send 0.01 from the tabby account to the given address, funds must have at least 6 confirmations
> neurai-cli sendfrom "tabby" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.01 6 "donation" "seans outpost"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfrom", "params": ["tabby", "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.01, 6, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
sendfrom:'sendfrom',





/** sendfromaddress "from_address" "to_address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode")

Send an amount from a specific address to a given address. All xna change will get sent back to the from_address

Arguments:
1. "from_address"       (string, required) The neurai address to send from.
2. "to_address"            (string, required) The neurai address to send to.
3. "amount"             (numeric or string, required) The amount in XNA to send. eg 0.1
4. "comment"            (string, optional) A comment used to store what the transaction is for. 
                             This is not part of the transaction, just kept in your wallet.
5. "comment_to"         (string, optional) A comment to store the name of the person or organization 
                             to which you're sending the transaction. This is not part of the 
                             transaction, just kept in your wallet.
6. subtractfeefromamount  (boolean, optional, default=false) The fee will be deducted from the amount being sent.
                             The recipient will receive less neurais than you enter in the amount field.
7. conf_target            (numeric, optional) Confirmation target (in blocks)
8. "estimate_mode"      (string, optional, default=UNSET) The fee estimate mode, must be one of:
       "UNSET"
       "ECONOMICAL"
       "CONSERVATIVE"

Result:
"txid"                  (string) The transaction id.

Examples:
> neurai-cli sendfromaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1
> neurai-cli sendfromaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "donation" "seans outpost"
> neurai-cli sendfromaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "" "" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfromaddress", "params": ["1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
sendfromaddress:'sendfromaddress',





/** sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] replaceable conf_target "estimate_mode")

Send multiple times. Amounts are double-precision floating point numbers.

Arguments:
1. "fromaccount"         (string, required) DEPRECATED. The account to send the funds from. Should be "" for the default account
2. "amounts"             (string, required) A json object with addresses and amounts
    {
      "address":amount   (numeric or string) The neurai address is the key, the numeric amount (can be string) in XNA is the value
      ,...
    }
3. minconf                 (numeric, optional, default=1) Only use the balance confirmed at least this many times.
4. "comment"             (string, optional) A comment
5. subtractfeefrom         (array, optional) A json array with addresses.
                           The fee will be equally deducted from the amount of each selected address.
                           Those recipients will receive less neurais than you enter in their corresponding amount field.
                           If no addresses are specified here, the sender pays the fee.
    [
      "address"          (string) Subtract fee from this address
      ,...
    ]
6. conf_target            (numeric, optional) Confirmation target (in blocks)
7. "estimate_mode"      (string, optional, default=UNSET) The fee estimate mode, must be one of:
       "UNSET"
       "ECONOMICAL"
       "CONSERVATIVE"

Result:
"txid"                   (string) The transaction id for the send. Only 1 transaction is created regardless of 
                                    the number of addresses.

Examples:

Send two amounts to two different addresses:
> neurai-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}"

Send two amounts to two different addresses setting the confirmation and comment:
> neurai-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 6 "testing"

Send two amounts to two different addresses, subtract fee from amount:
> neurai-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 1 "" "[\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\",\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\"]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}", 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
sendmany:'sendmany',





/** sendmessage "channel_name" "ipfs_hash" (expire_time)

Creates and broadcasts a message transaction to the network for a channel this wallet owns
Arguments:
1. "channel_name"             (string, required) Name of the channel that you want to send a message with (message channel, administrator asset), if a non administrator asset name is given, the administrator '!' will be added to it
2. "ipfs_hash"                (string, required) The IPFS hash of the message
3. "expire_time"              (numeric, optional) UTC timestamp of when the message expires

Result:[
txid
]

Examples:
> neurai-cli sendmessage "ASSET_NAME!" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
> neurai-cli sendmessage "ASSET_NAME!" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
**/
sendmessage:'sendmessage',





/** sendrawtransaction "hexstring" ( allowhighfees )

Submits raw transaction (serialized, hex-encoded) to local node and network.

Also see createrawtransaction and signrawtransaction calls.

Arguments:
1. "hexstring"    (string, required) The hex string of the raw transaction)
2. allowhighfees    (boolean, optional, default=false) Allow high fees

Result:
"hex"             (string) The transaction hash in hex

Examples:

Create a transaction
> neurai-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
Sign the transaction, and get back the hex
> neurai-cli signrawtransaction "myhex"

Send the transaction (signed hex)
> neurai-cli sendrawtransaction "signedhex"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransaction", "params": ["signedhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
sendrawtransaction:'sendrawtransaction',





/** sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode")

Send an amount to a given address.

Arguments:
1. "address"            (string, required) The neurai address to send to.
2. "amount"             (numeric or string, required) The amount in XNA to send. eg 0.1
3. "comment"            (string, optional) A comment used to store what the transaction is for. 
                             This is not part of the transaction, just kept in your wallet.
4. "comment_to"         (string, optional) A comment to store the name of the person or organization 
                             to which you're sending the transaction. This is not part of the 
                             transaction, just kept in your wallet.
5. subtractfeefromamount  (boolean, optional, default=false) The fee will be deducted from the amount being sent.
                             The recipient will receive less neurais than you enter in the amount field.
6. conf_target            (numeric, optional) Confirmation target (in blocks)
7. "estimate_mode"      (string, optional, default=UNSET) The fee estimate mode, must be one of:
       "UNSET"
       "ECONOMICAL"
       "CONSERVATIVE"

Result:
"txid"                  (string) The transaction id.

Examples:
> neurai-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1
> neurai-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "donation" "seans outpost"
> neurai-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "" "" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
sendtoaddress:'sendtoaddress',





/** setaccount "address" "account"

DEPRECATED. Sets the account associated with the given address.

Arguments:
1. "address"         (string, required) The neurai address to be associated with an account.
2. "account"         (string, required) The account to assign the address to.

Examples:
> neurai-cli setaccount "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setaccount", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
setaccount:'setaccount',





/** setban "subnet" "add|remove" (bantime) (absolute)

Attempts to add or remove an IP/Subnet from the banned list.

Arguments:
1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask (default is /32 = single IP)
2. "command"      (string, required) 'add' to add an IP/Subnet to the list, 'remove' to remove an IP/Subnet from the list
3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the IP is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
4. "absolute"     (boolean, optional) If set, the bantime must be an absolute timestamp in seconds since epoch (Jan 1 1970 GMT)

Examples:
> neurai-cli setban "192.168.0.6" "add" 86400
> neurai-cli setban "192.168.0.0/24" "add"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setban", "params": ["192.168.0.6", "add", 86400] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
setban:'setban',





/** setgenerate generate ( genproclimit )

Set 'generate' true or false to turn generation on or off.
Generation is limited to 'genproclimit' processors, -1 is unlimited.
See the getgenerate call for the current setting.

Arguments:
1. generate         (boolean, required) Set to true to turn on generation, false to turn off.
2. genproclimit     (numeric, optional) Set the processor limit for when generation is on. Can be -1 for unlimited.

Examples:

Set the generation on with a limit of one processor
> neurai-cli setgenerate true 1

Check the setting
> neurai-cli getgenerate 

Turn off generation
> neurai-cli setgenerate false

Using json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [true, 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
setgenerate:'setgenerate',





/** setnetworkactive true|false

Disable/enable all p2p network activity.

Arguments:
1. "state"        (boolean, required) true to enable networking, false to disable
**/
setnetworkactive:'setnetworkactive',





/** settxfee amount

Set the transaction fee per kB. Overwrites the paytxfee parameter.

Arguments:
1. amount         (numeric or string, required) The transaction fee in XNA/kB

Result
true|false        (boolean) Returns true if successful

Examples:
> neurai-cli settxfee 0.00001
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
settxfee:'settxfee',





/** signmessage "address" "message"

Sign a message with the private key of an address

Arguments:
1. "address"         (string, required) The neurai address to use for the private key.
2. "message"         (string, required) The message to create a signature of.

Result:
"signature"          (string) The signature of the message encoded in base 64

Examples:

Unlock the wallet for 30 seconds
> neurai-cli walletpassphrase "mypassphrase" 30

Create the signature
> neurai-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"

Verify the signature
> neurai-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
signmessage:'signmessage',





/** signmessagewithprivkey "privkey" "message"

Sign a message with the private key of an address

Arguments:
1. "privkey"         (string, required) The private key to sign the message with.
2. "message"         (string, required) The message to create a signature of.

Result:
"signature"          (string) The signature of the message encoded in base 64

Examples:

Create the signature
> neurai-cli signmessagewithprivkey "privkey" "my message"

Verify the signature
> neurai-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessagewithprivkey", "params": ["privkey", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
signmessagewithprivkey:'signmessagewithprivkey',





/** signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )

Sign inputs for raw transaction (serialized, hex-encoded).
The second optional argument (may be null) is an array of previous transaction outputs that
this transaction depends on but may not yet be in the block chain.
The third optional argument (may be null) is an array of base58-encoded private
keys that, if given, will be the only keys used to sign the transaction.


Arguments:
1. "hexstring"     (string, required) The transaction hex string
2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
     [               (json array of json objects, or 'null' if none provided)
       {
         "txid":"id",             (string, required) The transaction id
         "vout":n,                  (numeric, required) The output number
         "scriptPubKey": "hex",   (string, required) script key
         "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
         "amount": value            (numeric, required) The amount spent
       }
       ,...
    ]
3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
    [                  (json array of strings, or 'null' if none provided)
      "privatekey"   (string) private key in base58-encoding
      ,...
    ]
4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
       "ALL"
       "NONE"
       "SINGLE"
       "ALL|ANYONECANPAY"
       "NONE|ANYONECANPAY"
       "SINGLE|ANYONECANPAY"

Result:
{
  "hex" : "value",           (string) The hex-encoded raw transaction with signature(s)
  "complete" : true|false,   (boolean) If the transaction has a complete set of signatures
  "errors" : [                 (json array of objects) Script verification errors (if there are any)
    {
      "txid" : "hash",           (string) The hash of the referenced, previous transaction
      "vout" : n,                (numeric) The index of the output to spent and used as input
      "scriptSig" : "hex",       (string) The hex-encoded signature script
      "sequence" : n,            (numeric) Script sequence number
      "error" : "text"           (string) Verification or signing error related to the input
    }
    ,...
  ]
}

Examples:
> neurai-cli signrawtransaction "myhex"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransaction", "params": ["myhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
signrawtransaction:'signrawtransaction',





/** stop

Stop Neurai server.**/
stop:'stop',





/** submitblock "hexdata"  ( "dummy" )

Attempts to submit new block to network.
See https://en.neurai.it/wiki/BIP_0022 for full specification.

Arguments
1. "hexdata"        (string, required) the hex-encoded block data to submit
2. "dummy"          (optional) dummy value, for compatibility with BIP22. This value is ignored.

Result:

Examples:
> neurai-cli submitblock "mydata"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
submitblock:'submitblock',





/** subscribetochannel 

Subscribe to a certain message channel

Arguments:
1. "channel_name"            (string, required) The channel name to subscribe to, it must end with '!' or have an '~' in the name

Result:[

]

Examples:
> neurai-cli subscribetochannel "ASSET_NAME!"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "subscribetochannel", "params": ["ASSET_NAME!"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
subscribetochannel:'subscribetochannel',





/** testmempoolaccept ["rawtxs"] ( allowhighfees )

Returns if raw transaction (serialized, hex-encoded) would be accepted by mempool.

This checks if the transaction violates the consensus or policy rules.

See sendrawtransaction call.

Arguments:
1. ["rawtxs"]       (array, required) An array of hex strings of raw transactions.
                                        Length must be one for now.
2. allowhighfees    (boolean, optional, default=false) Allow high fees

Result:
[                   (array) The result of the mempool acceptance test for each raw transaction in the input array.
                            Length is exactly one for now.
 {
  "txid"           (string) The transaction hash in hex
  "allowed"        (boolean) If the mempool allows this tx to be inserted
  "reject-reason"  (string) Rejection string (only present when 'allowed' is false)
 }
]

Examples:

Create a transaction
> neurai-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
Sign the transaction, and get back the hex
> neurai-cli signrawtransaction "myhex"

Test acceptance of the transaction (signed hex)
> neurai-cli testmempoolaccept "signedhex"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "testmempoolaccept", "params": [["signedhex"]] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
testmempoolaccept:'testmempoolaccept',





/** transfer "asset_name" qty "to_address" "message" expire_time "change_address" "asset_change_address"

Transfers a quantity of an owned asset to a given address
Arguments:
1. "asset_name"               (string, required) name of asset
2. "qty"                      (numeric, required) number of assets you want to send to the address
3. "to_address"               (string, required) address to send the asset to
4. "message"                  (string, optional) Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
5. "expire_time"              (numeric, optional) UTC timestamp of when the message expires
6. "change_address"       (string, optional, default = "") the transactions XNA change will be sent to this address
7. "asset_change_address"     (string, optional, default = "") the transactions Asset change will be sent to this address

Result:
txid[ 
txid
]

Examples:
> neurai-cli transfer "ASSET_NAME" 20 "address" "" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
> neurai-cli transfer "ASSET_NAME" 20 "address" "" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
**/
transfer:'transfer',





/** transferfromaddress "asset_name" "from_address" qty "to_address" "message" expire_time "xna_change_address" "asset_change_address"

Transfer a quantity of an owned asset in a specific address to a given address
Arguments:
1. "asset_name"               (string, required) name of asset
2. "from_address"             (string, required) address that the asset will be transferred from
3. "qty"                      (numeric, required) number of assets you want to send to the address
4. "to_address"               (string, required) address to send the asset to
5. "message"                  (string, optional) Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
6. "expire_time"              (numeric, optional) UTC timestamp of when the message expires
7. "xna_change_address"       (string, optional, default = "") the transaction XNA change will be sent to this address
8. "asset_change_address"     (string, optional, default = "") the transaction Asset change will be sent to this address

Result:
txid[ 
txid
]

Examples:
> neurai-cli transferfromaddress "ASSET_NAME" "fromaddress" 20 "address" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E", 156545652
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "transferfromaddress", "params": ["ASSET_NAME" "fromaddress" 20 "address" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E", 156545652] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
transferfromaddress:'transferfromaddress',





/** transferfromaddresses "asset_name" ["from_addresses"] qty "to_address" "message" expire_time "xna_change_address" "asset_change_address"

Transfer a quantity of an owned asset in specific address(es) to a given address
Arguments:
1. "asset_name"               (string, required) name of asset
2. "from_addresses"           (array, required) list of from addresses to send from
3. "qty"                      (numeric, required) number of assets you want to send to the address
4. "to_address"               (string, required) address to send the asset to
5. "message"                  (string, optional) Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
6. "expire_time"              (numeric, optional) UTC timestamp of when the message expires
7. "xna_change_address"       (string, optional, default = "") the transactions XNA change will be sent to this address
8. "asset_change_address"     (string, optional, default = "") the transactions Asset change will be sent to this address

Result:
txid[ 
txid
]

Examples:
> neurai-cli transferfromaddresses "ASSET_NAME" '["fromaddress1", "fromaddress2"]' 20 "to_address" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 154652365
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "transferfromaddresses", "params": ["ASSET_NAME" '["fromaddress1", "fromaddress2"]' 20 "to_address" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 154652365] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
transferfromaddresses:'transferfromaddresses',





/** transferqualifier "qualifier_name" qty "to_address" ("change_address") ("message") (expire_time) 

Transfer a qualifier asset owned by this wallet to the given address
Arguments:
1. "qualifier_name"           (string, required) name of qualifier asset
2. "qty"                      (numeric, required) number of assets you want to send to the address
3. "to_address"               (string, required) address to send the asset to
4. "change_address"           (string, optional, default = "") the transaction change will be sent to this address
5. "message"                  (string, optional) Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
6. "expire_time"              (numeric, optional) UTC timestamp of when the message expires

Result:
txid[ 
txid
]

Examples:
> neurai-cli transferqualifier "#QUALIFIER" 20 "to_address" "" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
> neurai-cli transferqualifier "#QUALIFIER" 20 "to_address" "change_address" "QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E" 15863654
**/
transferqualifier:'transferqualifier',





/** unfreezeaddress asset_name address (change_address) (asset_data)

Unfreeze an address from transferring a restricted asset

Arguments:
1. "asset_name"       (string, required) the name of the restricted asset you want to unfreeze
2. "address"          (string, required) the address that will be unfrozen
3. "change_address"   (string, optional) The change address for the owner token of the restricted asset
4. "asset_data"       (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the owner token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli unfreezeaddress "$RESTRICTED_ASSET" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unfreezeaddress", "params": ["$RESTRICTED_ASSET" "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli unfreezeaddress "$RESTRICTED_ASSET" "address" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unfreezeaddress", "params": ["$RESTRICTED_ASSET" "address" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
unfreezeaddress:'unfreezeaddress',





/** unfreezedepin "asset_name" "address" ("change_address")

Unfreeze a DEPIN asset for a specific address (owner only)

The asset will be marked as valid again

Requires the owner token (&ASSET!) in the wallet

Arguments:
1. "asset_name"       (string, required) The DEPIN asset name (must start with &)
2. "address"          (string, required) The address to unfreeze
3. "change_address"   (string, optional) The change address for the owner token

Result:
"txid"                (string) The transaction id

Examples:
> neurai-cli unfreezedepin "&FRANCE" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unfreezedepin", "params": ["&FRANCE", "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
unfreezedepin:'unfreezedepin',





/** unfreezerestrictedasset asset_name (change_address) (asset_data)

Unfreeze all trading for a specific restricted asset

Arguments:
1. "asset_name"       (string, required) the name of the restricted asset you want to unfreeze
2. "change_address"   (string, optional) The change address for the owner token of the restricted asset
4. "asset_data"       (string, optional) The asset data (ipfs or a hash) to be applied to the transfer of the owner token

Result:
"txid"                     (string) The transaction id

Examples:
> neurai-cli unfreezerestrictedasset "$RESTRICTED_ASSET"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unfreezerestrictedasset", "params": ["$RESTRICTED_ASSET"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
> neurai-cli unfreezerestrictedasset "$RESTRICTED_ASSET" "change_address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unfreezerestrictedasset", "params": ["$RESTRICTED_ASSET" "change_address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
unfreezerestrictedasset:'unfreezerestrictedasset',





/** unsubscribefromchannel 

Unsubscribe from a certain message channel

Arguments:
1. "channel_name"            (string, required) The channel name to unsubscribe from, must end with '!' or have an '~' in the name

Result:[

]

Examples:
> neurai-cli unsubscribefromchannel "ASSET_NAME!"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unsubscribefromchannel", "params": ["ASSET_NAME!"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
unsubscribefromchannel:'unsubscribefromchannel',





/** uptime

Returns the total uptime of the server.

Result:
ttt        (numeric) The number of seconds that the server has been running

Examples:
> neurai-cli uptime 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "uptime", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
uptime:'uptime',





/** validateaddress "address"

Return information about the given neurai address.

Arguments:
1. "address"     (string, required) The neurai address to validate

Result:
{
  "isvalid" : true|false,       (boolean) If the address is valid or not. If not, this is the only property returned.
  "address" : "address", (string) The neurai address validated
  "scriptPubKey" : "hex",       (string) The hex encoded scriptPubKey generated by the address
  "ismine" : true|false,        (boolean) If the address is yours or not
  "iswatchonly" : true|false,   (boolean) If the address is watchonly
  "isscript" : true|false,      (boolean) If the key is a script
  "script" : "type"             (string, optional) The output script type. Possible types: nonstandard, pubkey, pubkeyhash, scripthash, multisig, nulldata, witness_v0_keyhash, witness_v0_scripthash
  "hex" : "hex",                (string, optional) The redeemscript for the p2sh address
  "addresses"                   (string, optional) Array of addresses associated with the known redeemscript
    [
      "address"
      ,...
    ]
  "sigsrequired" : xxxxx        (numeric, optional) Number of signatures required to spend multisig output
  "pubkey" : "publickeyhex",    (string) The hex value of the raw public key
  "iscompressed" : true|false,  (boolean) If the address is compressed
  "account" : "account"         (string) DEPRECATED. The account associated with the address, "" is the default account
  "timestamp" : timestamp,        (number, optional) The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
  "hdkeypath" : "keypath"       (string, optional) The HD keypath if the key is HD and available
  "hdmasterkeyid" : "<hash160>" (string, optional) The Hash160 of the HD master pubkey
}

Examples:
> neurai-cli validateaddress "1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "validateaddress", "params": ["1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
validateaddress:'validateaddress',





/** verifychain ( checklevel nblocks )

Verifies blockchain database.

Arguments:
1. checklevel   (numeric, optional, 0-4, default=3) How thorough the block verification is.
2. nblocks      (numeric, optional, default=6, 0=all) The number of blocks to check.

Result:
true|false       (boolean) Verified or not

Examples:
> neurai-cli verifychain 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifychain", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
verifychain:'verifychain',





/** verifymessage "address" "signature" "message"

Verify a signed message

Arguments:
1. "address"         (string, required) The neurai address to use for the signature.
2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
3. "message"         (string, required) The message that was signed.

Result:
true|false   (boolean) If the signature is verified or not.

Examples:

Unlock the wallet for 30 seconds
> neurai-cli walletpassphrase "mypassphrase" 30

Create the signature
> neurai-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"

Verify the signature
> neurai-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifymessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "signature", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
verifymessage:'verifymessage',





/** verifytxoutproof "proof"

Verifies that a proof points to a transaction in a block, returning the transaction it commits to
and throwing an RPC error if the block is not in our best chain

Arguments:
1. "proof"    (string, required) The hex-encoded proof generated by gettxoutproof

Result:
["txid"]      (array, strings) The txid(s) which the proof commits to, or empty array if the proof is invalid
**/
verifytxoutproof:'verifytxoutproof',





/** viewallmessagechannels 

View all message channels the wallet is subscribed to

Result:[
"Asset Name"                      (string) The asset channel name

]

Examples:
> neurai-cli viewallmessagechannels 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "viewallmessagechannels", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
viewallmessagechannels:'viewallmessagechannels',





/** viewallmessages 

View all messages that the wallet contains

Result:
"Asset Name:"                     (string) The name of the asset the message was sent on
"Message:"                        (string) The IPFS hash of the message
"Time:"                           (Date) The time as a date in the format (YY-mm-dd Hour-minute-second)
"Block Height:"                   (number) The height of the block the message was included in
"Status:"                         (string) Status of the message (READ, UNREAD, ORPHAN, EXPIRED, SPAM, HIDDEN, ERROR)
"Expire Time:"                    (Date, optional) If the message had an expiration date assigned, it will be shown here in the format (YY-mm-dd Hour-minute-second)
"Expire UTC Time:"                (Date, optional) If the message contains an expire date that is too large, the UTC number will be displayed

Examples:
> neurai-cli viewallmessages 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "viewallmessages", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
viewallmessages:'viewallmessages',





/** viewmyrestrictedaddresses 

View all addresses this wallet owns that have been restricted

Result:
{
"Address:"                        (string) The address that was restricted
"Asset Name:"                     (string) The asset that the restriction applies to
"[Restricted|Derestricted]:"      (Date) The UTC datetime of the restriction or derestriction in the format (YY-mm-dd HH:MM:SS))
                                         (Only the most recent restriction/derestriction event will be returned for each address)
}...

Examples:
> neurai-cli viewmyrestrictedaddresses 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "viewmyrestrictedaddresses", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
viewmyrestrictedaddresses:'viewmyrestrictedaddresses',





/** viewmytaggedaddresses 

View all addresses this wallet owns that have been tagged

Result:
{
"Address:"                        (string) The address that was tagged
"Tag Name:"                       (string) The asset name
"[Assigned|Removed]:"             (Date) The UTC datetime of the assignment or removal of the tag in the format (YY-mm-dd HH:MM:SS)
                                         (Only the most recent tagging/untagging event will be returned for each address)
}...

Examples:
> neurai-cli viewmytaggedaddresses 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "viewmytaggedaddresses", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8766/
**/
viewmytaggedaddresses:'viewmytaggedaddresses',
}