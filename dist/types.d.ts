interface IMethods {
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
export const methods: IMethods;
/**
 * DePIN RPC Client for Neurai
 *
 * This module provides support for communicating with Neurai DePIN messaging
 * on port 19002 using the challenge/response authentication protocol.
 */
export interface DePinAuthOptions {
    /** DePIN token name (e.g., "MYTOKEN") */
    token: string;
    /** Neurai address that will sign challenges */
    address: string;
    /** Function to sign messages (must return base64 signature) */
    signMessage: (message: string) => Promise<string>;
    /** Operation mode: SEND or RECEIVE (default: RECEIVE) */
    mode?: 'SEND' | 'RECEIVE';
}
export interface DePinChallenge {
    /** Challenge string from server */
    challenge: string;
    /** Timeout in seconds */
    timeout: number;
    /** Complete message that needs to be signed */
    messageToSign: string;
}
/**
 * Create a DePIN RPC client with challenge/response authentication
 *
 * @param url DePIN server URL (e.g., "http://localhost:19002")
 * @param authOptions Authentication options including token, address, and signing function
 * @returns Async RPC function
 *
 * @example
 * ```typescript
 * import { getDePinRPC } from "@neuraiproject/neurai-rpc";
 *
 * const depinRpc = getDePinRPC("http://localhost:19002", {
 *   token: "MYTOKEN",
 *   address: "NXmyaddress...",
 *   signMessage: async (msg) => {
 *     // Use your wallet to sign the message
 *     return await wallet.signMessage(msg);
 *   },
 *   mode: "SEND"
 * });
 *
 * // Send a DePIN message
 * const result = await depinRpc("depinsendmsg", [
 *   "MYTOKEN",
 *   "localhost",
 *   "Hello from DePIN!",
 *   "NXmyaddress..."
 * ]);
 * ```
 */
export function getDePinRPC(url: string, authOptions: DePinAuthOptions): (method: string, params: any[]) => Promise<unknown>;
/**
 * Helper function to request a challenge without making an RPC call
 * Useful for testing or manual challenge handling
 */
export function requestDePinChallenge(url: string, authOptions: DePinAuthOptions): Promise<DePinChallenge>;
export function getRPC(username: string, password: string, URL: string): (method: string, params: any[]) => Promise<unknown>;

//# sourceMappingURL=types.d.ts.map
