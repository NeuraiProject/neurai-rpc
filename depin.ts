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

import { createConnection } from "node:net";

/** Matches DEPIN_SOCKET_TIMEOUT in the node (seconds → ms). */
const DEPIN_SOCKET_TIMEOUT_MS = 30_000;

/** Matches DEPIN_MAX_PROTOCOL_SIZE in the node (10 MB) plus slack. */
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024 + 1024;

/** Challenge type as issued by the gateway (AUTH|token|address|MODE). */
export type DePinChallengeMode = "SEND" | "RECEIVE" | "ADMIN";

export interface DePinTarget {
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

export interface DePinAuthOptions {
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

export interface DePinChallenge {
  /** Challenge string from server */
  challenge: string;

  /** Timeout in seconds */
  timeout: number;

  /** Complete message that needs to be signed */
  messageToSign: string;
}

/**
 * Message-to-sign prefix per challenge mode, as verified by the node:
 * DEPIN-SEND (depinsendmsg), DEPIN-GET (RECEIVE challenges) and
 * DEPIN-CLEAR (ADMIN challenges for depinclearmsg).
 */
const SIGN_PREFIX: Record<DePinChallengeMode, string> = {
  SEND: "DEPIN-SEND",
  RECEIVE: "DEPIN-GET",
  ADMIN: "DEPIN-CLEAR",
};

/**
 * Gateway authentication requirements per JSON-RPC method.
 *
 * - SEND: challenge/signature appended to params; the gateway validates and
 *   trims them before dispatching.
 * - ADMIN: depinclearmsg only — the gateway expects
 *   [mode, address, challenge, signature] or
 *   [mode, scope, address, challenge, signature].
 * - BLOCKED: depingetmsg over the gateway is blocked by a node-side bug (the
 *   gateway reads fromaddress from params[3], where depingetmsg carries it at
 *   index 1 or 2 and only accepts up to 3 arguments).
 *
 * Every other method is dispatched by the gateway without authentication and
 * must be sent with its params untouched.
 */
const METHOD_AUTH: Record<string, "SEND" | "ADMIN" | "BLOCKED"> = {
  depinsendmsg: "SEND",
  depinclearmsg: "ADMIN",
  depingetmsg: "BLOCKED",
};

interface DePinRPCContext {
  target: DePinTarget;
  authOptions?: DePinAuthOptions;
}

function validateTarget(target: DePinTarget): void {
  if (typeof target === "string") {
    throw new Error(
      "getDePinRPC no longer accepts a URL string. The DePIN gateway speaks " +
        "raw TCP, not HTTP: pass an object { host, port }, e.g. " +
        '{ host: "127.0.0.1", port: 19002 }'
    );
  }
  if (!target || typeof target !== "object") {
    throw new Error("A target object { host, port } is required for DePIN RPC");
  }
  if (!target.host || typeof target.host !== "string") {
    throw new Error("target.host must be a non-empty string");
  }
  if (
    typeof target.port !== "number" ||
    !Number.isInteger(target.port) ||
    target.port < 1 ||
    target.port > 65535
  ) {
    throw new Error("target.port must be an integer between 1 and 65535");
  }
  if (
    target.timeoutMs !== undefined &&
    (typeof target.timeoutMs !== "number" || target.timeoutMs <= 0)
  ) {
    throw new Error("target.timeoutMs must be a positive number");
  }
}

function validateAuthOptions(authOptions: DePinAuthOptions): void {
  if (!authOptions.token) {
    throw new Error("Token is required for DePIN authentication");
  }
  if (!authOptions.address) {
    throw new Error("Address is required for DePIN authentication");
  }
  if (
    !authOptions.signMessage ||
    typeof authOptions.signMessage !== "function"
  ) {
    throw new Error("signMessage function is required for DePIN authentication");
  }
}

/**
 * Send one line over TCP and read one line back.
 *
 * The gateway protocol is strictly one request line, one response line, one
 * connection per request (the server closes after answering). Bytes are
 * accumulated as Buffers and only decoded once the newline is seen, so a
 * multi-byte UTF-8 character split across 'data' events cannot be corrupted.
 */
function sendLine(target: DePinTarget, line: string): Promise<string> {
  const timeoutMs = target.timeoutMs ?? DEPIN_SOCKET_TIMEOUT_MS;
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host: target.host, port: target.port });
    const chunks: Buffer[] = [];
    let received = 0;
    let settled = false;

    const finish = (error: Error | null, response?: string) => {
      if (settled) {
        return;
      }
      settled = true;
      socket.destroy();
      if (error) {
        reject(error);
      } else {
        resolve(response as string);
      }
    };

    socket.setTimeout(timeoutMs, () => {
      finish(
        new Error(
          `DePIN request timed out after ${timeoutMs} ms (${target.host}:${target.port})`
        )
      );
    });

    socket.on("error", (e: Error) => {
      finish(
        new Error(
          `Could not communicate with DePIN gateway at ${target.host}:${target.port}: ${e.message}`
        )
      );
    });

    socket.on("connect", () => {
      socket.write(line.endsWith("\n") ? line : line + "\n");
    });

    socket.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
      received += chunk.length;

      if (received > MAX_RESPONSE_BYTES) {
        finish(new Error("DePIN response exceeded the 10 MB protocol limit"));
        return;
      }

      if (chunk.includes(0x0a)) {
        const all = Buffer.concat(chunks);
        const nl = all.indexOf(0x0a);
        finish(null, all.subarray(0, nl).toString("utf8"));
      }
    });

    socket.on("close", () => {
      finish(
        new Error(
          "DePIN gateway closed the connection before sending a complete response"
        )
      );
    });
  });
}

/**
 * Request a challenge from the DePIN gateway: AUTH|token|address|mode
 */
async function requestChallenge(
  target: DePinTarget,
  token: string,
  address: string,
  mode: DePinChallengeMode
): Promise<DePinChallenge> {
  const responseText = await sendLine(
    target,
    `AUTH|${token}|${address}|${mode}`
  );

  // Parse response: CHALLENGE|<challenge>|<timeout>
  if (!responseText.startsWith("CHALLENGE|")) {
    throw new Error(`Invalid challenge response: ${responseText}`);
  }

  const parts = responseText.split("|");
  if (parts.length < 3) {
    throw new Error(`Malformed challenge response: ${responseText}`);
  }

  const challenge = parts[1];
  const timeout = parseInt(parts[2], 10);

  if (!challenge || isNaN(timeout)) {
    throw new Error(`Invalid challenge data: ${responseText}`);
  }

  return {
    challenge,
    timeout,
    messageToSign: `${SIGN_PREFIX[mode]}|${token}|${address}|${challenge}`,
  };
}

/**
 * Request a fresh challenge for one authenticated call.
 *
 * Challenges are strictly single-use: the node erases the nonce from its map
 * when it validates it (ValidateChallenge in depinmsgpoolnet.cpp), so they
 * must never be cached or reused — a second request with the same nonce
 * fails with "Challenge not found".
 */
async function freshChallenge(
  context: DePinRPCContext,
  mode: DePinChallengeMode,
  token: string
): Promise<string> {
  const auth = context.authOptions as DePinAuthOptions;
  const challengeData = await requestChallenge(
    context.target,
    token,
    auth.address,
    mode
  );
  return challengeData.challenge;
}

async function signChallenge(
  auth: DePinAuthOptions,
  mode: DePinChallengeMode,
  token: string,
  challenge: string
): Promise<string> {
  const messageToSign = `${SIGN_PREFIX[mode]}|${token}|${auth.address}|${challenge}`;
  const signature = await auth.signMessage(messageToSign);
  if (!signature) {
    throw new Error("Signature function returned empty result");
  }
  return signature;
}

/**
 * Build the params the gateway expects for an authenticated method, using a
 * fresh single-use challenge.
 */
async function buildAuthenticatedParams(
  context: DePinRPCContext,
  method: string,
  params: any[]
): Promise<{ params: any[]; mode: DePinChallengeMode; token: string }> {
  const auth = context.authOptions as DePinAuthOptions;

  if (method === "depinsendmsg") {
    // Gateway shape: [token, ip, message, fromaddress, (port), challenge, signature]
    // It requires >= 4 params before the appended pair, reads fromaddress
    // from params[3] and validates the challenge against (params[0], params[3]).
    const sendParams = [...params];
    if (sendParams.length === 3) {
      // Fill in fromaddress with the authenticated address.
      sendParams.push(auth.address);
    }
    if (sendParams.length < 4 || typeof sendParams[3] !== "string") {
      throw new Error(
        "depinsendmsg over the gateway needs [token, ip, message, fromaddress]"
      );
    }
    if (sendParams[3] !== auth.address) {
      throw new Error(
        `depinsendmsg fromaddress (${sendParams[3]}) must be the authenticated address (${auth.address})`
      );
    }
    const token = String(sendParams[0]);
    const challenge = await freshChallenge(context, "SEND", token);
    const signature = await signChallenge(auth, "SEND", token, challenge);
    return {
      params: [...sendParams, challenge, signature],
      mode: "SEND",
      token,
    };
  }

  // depinclearmsg — ADMIN challenge, owner only. Caller shape: [] | [mode] |
  // [mode, scope]. Gateway shape: [mode, address, challenge, signature] or
  // [mode, scope, address, challenge, signature]. With a scope the challenge
  // must have been issued FOR that scope token.
  if (params.length > 2) {
    throw new Error(
      'depinclearmsg accepts at most [mode, scope], e.g. ["all", "&TOKEN/GENERAL"]'
    );
  }
  const mode = params.length >= 1 ? params[0] : null;
  const scope = params.length === 2 ? params[1] : undefined;
  if (scope !== undefined && typeof scope !== "string") {
    throw new Error("depinclearmsg scope must be a string");
  }
  const token = scope || auth.token;
  const challenge = await freshChallenge(context, "ADMIN", token);
  const signature = await signChallenge(auth, "ADMIN", token, challenge);
  return {
    params:
      scope === undefined
        ? [mode, auth.address, challenge, signature]
        : [mode, scope, auth.address, challenge, signature],
    mode: "ADMIN",
    token,
  };
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
export function getDePinRPC(
  target: DePinTarget,
  authOptions?: DePinAuthOptions
) {
  validateTarget(target);
  if (authOptions !== undefined) {
    validateAuthOptions(authOptions);
  }

  const context: DePinRPCContext = {
    target,
    authOptions,
  };

  async function depinRpc(
    method: string,
    params: any[],
    isRetry: boolean = false
  ): Promise<any> {
    try {
      const authKind = METHOD_AUTH[method];

      if (authKind === "BLOCKED") {
        throw new Error(
          "depingetmsg over the DePIN gateway is blocked by a node-side bug " +
            "(the gateway reads fromaddress from params[3], but depingetmsg " +
            "carries it at index 1 or 2 and accepts at most 3 arguments). " +
            "Use depinreceivemsg over the gateway, or call depingetmsg " +
            "through the node RPC port instead."
        );
      }

      let mode: DePinChallengeMode | undefined;
      let token: string | undefined;
      let requestParams = params;

      if (authKind !== undefined) {
        if (!context.authOptions) {
          throw new Error(
            `${method} requires authentication: create the client with ` +
              "getDePinRPC(target, { token, address, signMessage })"
          );
        }
        const derived: DePinChallengeMode =
          authKind === "SEND" ? "SEND" : "ADMIN";
        if (context.authOptions.mode && context.authOptions.mode !== derived) {
          throw new Error(
            `${method} needs a ${derived} challenge, which conflicts with ` +
              `mode "${context.authOptions.mode}" in the auth options. The ` +
              "mode option is only honored by requestDePinChallenge(); omit " +
              "it here — getDePinRPC derives it per method."
          );
        }
        const built = await buildAuthenticatedParams(context, method, params);
        requestParams = built.params;
        mode = built.mode;
        token = built.token;
      }

      const requestData = {
        jsonrpc: "2.0",
        id: Math.random(),
        method,
        params: requestParams,
      };

      const responseText = await sendLine(
        context.target,
        JSON.stringify(requestData)
      );

      if (responseText.startsWith("ERROR|")) {
        throw new Error(responseText.slice("ERROR|".length));
      }

      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        throw new Error(
          `Invalid JSON-RPC response from DePIN gateway: ${responseText.slice(0, 200)}`
        );
      }

      if (responseData.error) {
        // On an expired challenge: retry once — the retry requests a fresh
        // nonce, since every authenticated attempt does.
        if (
          !isRetry &&
          mode !== undefined &&
          token !== undefined &&
          responseData.error.message &&
          responseData.error.message.includes("expired")
        ) {
          return depinRpc(method, params, true);
        }

        throw {
          error: responseData.error,
          description: responseData.error.message || "Unknown error",
        };
      }

      return responseData.result;
    } catch (error: any) {
      if (error && (error.error || error.description)) {
        // Already a structured RPC error
        throw error;
      }
      throw {
        originalError: error,
        type: "DePinRequestError",
        error:
          (error && error.message) ||
          "Failed to communicate with DePIN gateway",
        description:
          "Check that the DePIN gateway host/port are correct and that the " +
          "node is running with the gateway enabled",
      };
    }
  }

  return (method: string, params: any[]) => depinRpc(method, params);
}

/**
 * Request a challenge without making an RPC call. Useful for testing or
 * manual challenge handling. Honors authOptions.mode ("SEND", "RECEIVE" or
 * "ADMIN"; default "RECEIVE") and returns the exact message that must be
 * signed for that mode (DEPIN-SEND|, DEPIN-GET| or DEPIN-CLEAR|).
 */
export async function requestDePinChallenge(
  target: DePinTarget,
  authOptions: DePinAuthOptions
): Promise<DePinChallenge> {
  validateTarget(target);
  validateAuthOptions(authOptions);
  const mode: DePinChallengeMode = authOptions.mode || "RECEIVE";
  return requestChallenge(target, authOptions.token, authOptions.address, mode);
}
