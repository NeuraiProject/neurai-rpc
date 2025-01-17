import { methods } from "./docs";

export { methods };
function throwSyntaxError() {
  throw new Error("Syntax error, call getRPC with (username, password, URL)");
}

export function getRPC(username: string, password: string, URL: string) {
  if (!username) {
    throwSyntaxError();
  }
  if (!password) {
    throwSyntaxError();
  }
  if (!URL) {
    throwSyntaxError();
  }

  return async function rpc(method: string, params: any[]) {
    const promise = new Promise((resolutionFunc, rejectionFunc) => {
      const data = {
        jsonrpc: "2.0",
        id: Math.random(),
        method,
        params,
      };

      try {
        const rpcResponse = postData(URL, data, username, password);

        rpcResponse
          .then(async (response) => {
            /*
              This means that we got a response.
              The response can still be an error/problem but the server responded

            */

            if (response.ok) {
              //Happy flow
              const obj = await response.json(); //Convert to JSON
              resolutionFunc(obj.result);
            } else if (response.status !== 200) {
              //OK something is wrong
              let obj = {
                error: null,
                description: null,
              };
              try {
                obj = await response.json();
              } catch (e) {}
              const myError = {
                statusText: response.statusText,
                status: response.status,
                description: obj.description,
                error: obj.error,
              };

              rejectionFunc(myError);
            }
          })
          .catch((e) => {
            rejectionFunc({
              originalError: e,
              type: "ServerUnreachable",
              error: "Could not communicate with Raven core node",
              description:
                "Are you sure that the URL is correct? The URL is usually mainnet = http://127.0.0.1:19001 and testnet =  http://127.0.0.1:119001",
            });
          });
      } catch (e) {
        rejectionFunc(e.response);
      }
    });
    return promise;
  };
}
function getValidMethods() {
  const keys = Object.keys(methods).sort();
  return keys.join(" ");
}
// Example POST method implementation:
async function postData(
  url = "",
  data = {},
  username: string,
  password: string
) {
  let base64Credentials = "";

  //btoa or Buffer, depends if we are in Node.js or in the browser
  if (typeof btoa === "function") {
    base64Credentials = btoa(`${username}:${password}`);
  } else if (Buffer) {
    base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
  }

  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      Authorization: "Basic " + base64Credentials,
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response;
}

/*
export const methods = {
  "getaddressbalance": "getaddressbalance",
  "getaddressdeltas": "getaddressdeltas",
  "getaddressmempool": "getaddressmempool",
  "getaddresstxids": "getaddresstxids",
  "getaddressutxos": "getaddressutxos",
  "getassetdata": "getassetdata",
  "getcacheinfo": "getcacheinfo",
  "getsnapshot": "getsnapshot",
  "issue": "issue",
  "issueunique": "issueunique",
  "listaddressesbyasset": "listaddressesbyasset",
  "listassetbalancesbyaddress": "listassetbalancesbyaddress",
  "listassets": "listassets",
  "listmyassets": "listmyassets",
  "purgesnapshot": "purgesnapshot",
  "reissue": "reissue",
  "transfer": "transfer",
  "transferfromaddress": "transferfromaddress",
  "transferfromaddresses": "transferfromaddresses",
  "clearmempool": "clearmempool",
  "decodeblock": "decodeblock",
  "getbestblockhash": "getbestblockhash",
  "getblock": "getblock",
  "getblockchaininfo": "getblockchaininfo",
  "getblockcount": "getblockcount",
  "getblockhash": "getblockhash",
  "getblockhashes": "getblockhashes",
  "getblockheader": "getblockheader",
  "getchaintips": "getchaintips",
  "getchaintxstats": "getchaintxstats",
  "getdifficulty": "getdifficulty",
  "getmempoolancestors": "getmempoolancestors",
  "getmempooldescendants": "getmempooldescendants",
  "getmempoolentry": "getmempoolentry",
  "getmempoolinfo": "getmempoolinfo",
  "getrawmempool": "getrawmempool",
  "getspentinfo": "getspentinfo",
  "gettxout": "gettxout",
  "gettxoutproof": "gettxoutproof",
  "gettxoutsetinfo": "gettxoutsetinfo",
  "preciousblock": "preciousblock",
  "pruneblockchain": "pruneblockchain",
  "savemempool": "savemempool",
  "verifychain": "verifychain",
  "verifytxoutproof": "verifytxoutproof",
  "getinfo": "getinfo",
  "getmemoryinfo": "getmemoryinfo",
  "getrpcinfo": "getrpcinfo",
  "help": "help",
  "stop": "stop",
  "uptime": "uptime",
  "generate": "generate",
  "generatetoaddress": "generatetoaddress",
  "getgenerate": "getgenerate",
  "setgenerate": "setgenerate",
  "clearmessages": "clearmessages",
  "sendmessage": "sendmessage",
  "subscribetochannel": "subscribetochannel",
  "unsubscribefromchannel": "unsubscribefromchannel",
  "viewallmessagechannels": "viewallmessagechannels",
  "viewallmessages": "viewallmessages",
  "getblocktemplate": "getblocktemplate",
  "getkawpowhash": "getkawpowhash",
  "getmininginfo": "getmininginfo",
  "getnetworkhashps": "getnetworkhashps",
  "pprpcsb": "pprpcsb",
  "prioritisetransaction": "prioritisetransaction",
  "submitblock": "submitblock",
  "addnode": "addnode",
  "clearbanned": "clearbanned",
  "disconnectnode": "disconnectnode",
  "getaddednodeinfo": "getaddednodeinfo",
  "getconnectioncount": "getconnectioncount",
  "getnettotals": "getnettotals",
  "getnetworkinfo": "getnetworkinfo",
  "getpeerinfo": "getpeerinfo",
  "listbanned": "listbanned",
  "ping": "ping",
  "setban": "setban",
  "setnetworkactive": "setnetworkactive",
  "combinerawtransaction": "combinerawtransaction",
  "createrawtransaction": "createrawtransaction",
  "decoderawtransaction": "decoderawtransaction",
  "decodescript": "decodescript",
  "fundrawtransaction": "fundrawtransaction",
  "getrawtransaction": "getrawtransaction",
  "sendrawtransaction": "sendrawtransaction",
  "signrawtransaction": "signrawtransaction",
  "testmempoolaccept": "testmempoolaccept",
  "addtagtoaddress": "addtagtoaddress",
  "checkaddressrestriction": "checkaddressrestriction",
  "checkaddresstag": "checkaddresstag",
  "checkglobalrestriction": "checkglobalrestriction",
  "freezeaddress": "freezeaddress",
  "freezerestrictedasset": "freezerestrictedasset",
  "getverifierstring": "getverifierstring",
  "issuequalifierasset": "issuequalifierasset",
  "issuerestrictedasset": "issuerestrictedasset",
  "isvalidverifierstring": "isvalidverifierstring",
  "listaddressesfortag": "listaddressesfortag",
  "listaddressrestrictions": "listaddressrestrictions",
  "listglobalrestrictions": "listglobalrestrictions",
  "listtagsforaddress": "listtagsforaddress",
  "reissuerestrictedasset": "reissuerestrictedasset",
  "removetagfromaddress": "removetagfromaddress",
  "transferqualifier": "transferqualifier",
  "unfreezeaddress": "unfreezeaddress",
  "unfreezerestrictedasset": "unfreezerestrictedasset",
  "viewmyrestrictedaddresses": "viewmyrestrictedaddresses",
  "viewmytaggedaddresses": "viewmytaggedaddresses",
  "cancelsnapshotrequest": "cancelsnapshotrequest",
  "distributereward": "distributereward",
  "getdistributestatus": "getdistributestatus",
  "getsnapshotrequest": "getsnapshotrequest",
  "listsnapshotrequests": "listsnapshotrequests",
  "requestsnapshot": "requestsnapshot",
  "createmultisig": "createmultisig",
  "estimatefee": "estimatefee",
  "estimatesmartfee": "estimatesmartfee",
  "signmessagewithprivkey": "signmessagewithprivkey",
  "validateaddress": "validateaddress",
  "verifymessage": "verifymessage",
  "abandontransaction": "abandontransaction",
  "abortrescan": "abortrescan",
  "addmultisigaddress": "addmultisigaddress",
  "addwitnessaddress": "addwitnessaddress",
  "backupwallet": "backupwallet",
  "bumpfee": "bumpfee",
  "dumpprivkey": "dumpprivkey",
  "dumpwallet": "dumpwallet",
  "encryptwallet": "encryptwallet",
  "getaccount": "getaccount",
  "getaccountaddress": "getaccountaddress",
  "getaddressesbyaccount": "getaddressesbyaccount",
  "getbalance": "getbalance",
  "getmasterkeyinfo": "getmasterkeyinfo",
  "getmywords": "getmywords",
  "getnewaddress": "getnewaddress",
  "getrawchangeaddress": "getrawchangeaddress",
  "getreceivedbyaccount": "getreceivedbyaccount",
  "getreceivedbyaddress": "getreceivedbyaddress",
  "gettransaction": "gettransaction",
  "getunconfirmedbalance": "getunconfirmedbalance",
  "getwalletinfo": "getwalletinfo",
  "importaddress": "importaddress",
  "importmulti": "importmulti",
  "importprivkey": "importprivkey",
  "importprunedfunds": "importprunedfunds",
  "importpubkey": "importpubkey",
  "importwallet": "importwallet",
  "keypoolrefill": "keypoolrefill",
  "listaccounts": "listaccounts",
  "listaddressgroupings": "listaddressgroupings",
  "listlockunspent": "listlockunspent",
  "listreceivedbyaccount": "listreceivedbyaccount",
  "listreceivedbyaddress": "listreceivedbyaddress",
  "listsinceblock": "listsinceblock",
  "listtransactions": "listtransactions",
  "listunspent": "listunspent",
  "listwallets": "listwallets",
  "lockunspent": "lockunspent",
  "move": "move",
  "removeprunedfunds": "removeprunedfunds",
  "rescanblockchain": "rescanblockchain",
  "sendfrom": "sendfrom",
  "sendfromaddress": "sendfromaddress",
  "sendmany": "sendmany",
  "sendtoaddress": "sendtoaddress",
  "setaccount": "setaccount",
  "settxfee": "settxfee",
  "signmessage": "signmessage"
}*/
