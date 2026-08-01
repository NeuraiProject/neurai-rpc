/**
 * DePIN RPC Client for Neurai — Node.js only.
 *
 * The Neurai DePIN messaging gateway (default port 19002) speaks a raw TCP
 * line protocol, NOT HTTP: the server reads bytes up to the first '\n' and
 * processes that single line as either a protocol command (PING, INFO,
 * AUTH|..., ...) or a serialized JSON-RPC object, answering with a single
 * line as well. Because of that, this module uses `node:net` sockets and can
 * only run in Node.js. Browsers cannot open raw TCP connections; to use DePIN
 * from a browser you need an external HTTP/WebSocket proxy in front of the
 * gateway.
 *
 * Import this module through the package subpath:
 *
 * ```typescript
 * import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin";
 * ```
 */
/** Challenge type as issued by the gateway (AUTH|token|address|MODE). */
type DePinChallengeMode = "SEND" | "RECEIVE" | "ADMIN";
interface DePinTarget {
    /** Gateway host, e.g. "127.0.0.1" */
    host: string;
    /** Gateway TCP port, e.g. 19002 */
    port: number;
    /**
     * Socket timeout in milliseconds. Defaults to 30 000, matching the node's
     * DEPIN_SOCKET_TIMEOUT.
     */
    timeoutMs?: number;
}
interface DePinAuthOptions {
    /** DePIN token name (must start with '&', e.g. "&MYTOKEN" or a section like "&MYTOKEN/GENERAL") */
    token: string;
    /** Neurai address that will sign challenges */
    address: string;
    /** Function to sign messages (must return base64 signature) */
    signMessage: (message: string) => Promise<string>;
    /**
     * Challenge mode. Only honored by requestDePinChallenge(); getDePinRPC()
     * derives the mode from the method being called and rejects a conflicting
     * value here.
     */
    mode?: DePinChallengeMode;
}
interface DePinChallenge {
    /** Challenge string from server */
    challenge: string;
    /** Timeout in seconds */
    timeout: number;
    /** Complete message that needs to be signed */
    messageToSign: string;
}
/**
 * Create a DePIN RPC client for the raw-TCP gateway. Node.js only.
 *
 * @param target Gateway address, e.g. { host: "127.0.0.1", port: 19002 }
 * @param authOptions Optional authentication. Without it the client can call
 *   the unauthenticated gateway methods (depinreceivemsg, depinsubmitmsg,
 *   depingetmsginfo, depingetpoolcontent, depinpoolstats, depinmcpstatus,
 *   depinlistsections, depinpoolpkey); calling an authenticated method then
 *   fails with a clear error.
 * @returns Async RPC function
 *
 * @example
 * ```typescript
 * import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin";
 *
 * const depinRpc = getDePinRPC(
 *   { host: "127.0.0.1", port: 19002 },
 *   {
 *     token: "&MYTOKEN",
 *     address: "NXmyaddress...",
 *     signMessage: async (msg) => wallet.signMessage(msg),
 *   }
 * );
 *
 * // Authenticated send (challenge/signature handled automatically)
 * await depinRpc("depinsendmsg", [
 *   "&MYTOKEN", "127.0.0.1", "Hello from DePIN!", "NXmyaddress...",
 * ]);
 *
 * // Unauthenticated query (params sent untouched)
 * const info = await depinRpc("depingetmsginfo", []);
 * ```
 */
declare function getDePinRPC(target: DePinTarget, authOptions?: DePinAuthOptions): (method: string, params: any[]) => Promise<any>;
/**
 * Request a challenge without making an RPC call. Useful for testing or
 * manual challenge handling. Honors authOptions.mode ("SEND", "RECEIVE" or
 * "ADMIN"; default "RECEIVE") and returns the exact message that must be
 * signed for that mode (DEPIN-SEND|, DEPIN-GET| or DEPIN-CLEAR|).
 */
declare function requestDePinChallenge(target: DePinTarget, authOptions: DePinAuthOptions): Promise<DePinChallenge>;

export { type DePinAuthOptions, type DePinChallenge, type DePinChallengeMode, type DePinTarget, getDePinRPC, requestDePinChallenge };
