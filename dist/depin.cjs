var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// depin.ts
var depin_exports = {};
__export(depin_exports, {
  getDePinRPC: () => getDePinRPC,
  requestDePinChallenge: () => requestDePinChallenge
});
module.exports = __toCommonJS(depin_exports);
var import_node_net = require("net");
var DEPIN_SOCKET_TIMEOUT_MS = 3e4;
var MAX_RESPONSE_BYTES = 10 * 1024 * 1024 + 1024;
var SIGN_PREFIX = {
  SEND: "DEPIN-SEND",
  RECEIVE: "DEPIN-GET",
  ADMIN: "DEPIN-CLEAR"
};
var METHOD_AUTH = {
  depinsendmsg: "SEND",
  depinclearmsg: "ADMIN",
  depingetmsg: "BLOCKED"
};
function validateTarget(target) {
  if (typeof target === "string") {
    throw new Error(
      'getDePinRPC no longer accepts a URL string. The DePIN gateway speaks raw TCP, not HTTP: pass an object { host, port }, e.g. { host: "127.0.0.1", port: 19002 }'
    );
  }
  if (!target || typeof target !== "object") {
    throw new Error("A target object { host, port } is required for DePIN RPC");
  }
  if (!target.host || typeof target.host !== "string") {
    throw new Error("target.host must be a non-empty string");
  }
  if (typeof target.port !== "number" || !Number.isInteger(target.port) || target.port < 1 || target.port > 65535) {
    throw new Error("target.port must be an integer between 1 and 65535");
  }
  if (target.timeoutMs !== void 0 && (typeof target.timeoutMs !== "number" || target.timeoutMs <= 0)) {
    throw new Error("target.timeoutMs must be a positive number");
  }
}
function validateAuthOptions(authOptions) {
  if (!authOptions.token) {
    throw new Error("Token is required for DePIN authentication");
  }
  if (!authOptions.address) {
    throw new Error("Address is required for DePIN authentication");
  }
  if (!authOptions.signMessage || typeof authOptions.signMessage !== "function") {
    throw new Error("signMessage function is required for DePIN authentication");
  }
}
function sendLine(target, line) {
  const timeoutMs = target.timeoutMs ?? DEPIN_SOCKET_TIMEOUT_MS;
  return new Promise((resolve, reject) => {
    const socket = (0, import_node_net.createConnection)({ host: target.host, port: target.port });
    const chunks = [];
    let received = 0;
    let settled = false;
    const finish = (error, response) => {
      if (settled) {
        return;
      }
      settled = true;
      socket.destroy();
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    };
    socket.setTimeout(timeoutMs, () => {
      finish(
        new Error(
          `DePIN request timed out after ${timeoutMs} ms (${target.host}:${target.port})`
        )
      );
    });
    socket.on("error", (e) => {
      finish(
        new Error(
          `Could not communicate with DePIN gateway at ${target.host}:${target.port}: ${e.message}`
        )
      );
    });
    socket.on("connect", () => {
      socket.write(line.endsWith("\n") ? line : line + "\n");
    });
    socket.on("data", (chunk) => {
      chunks.push(chunk);
      received += chunk.length;
      if (received > MAX_RESPONSE_BYTES) {
        finish(new Error("DePIN response exceeded the 10 MB protocol limit"));
        return;
      }
      if (chunk.includes(10)) {
        const all = Buffer.concat(chunks);
        const nl = all.indexOf(10);
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
async function requestChallenge(target, token, address, mode) {
  const responseText = await sendLine(
    target,
    `AUTH|${token}|${address}|${mode}`
  );
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
    messageToSign: `${SIGN_PREFIX[mode]}|${token}|${address}|${challenge}`
  };
}
async function freshChallenge(context, mode, token) {
  const auth = context.authOptions;
  const challengeData = await requestChallenge(
    context.target,
    token,
    auth.address,
    mode
  );
  return challengeData.challenge;
}
async function signChallenge(auth, mode, token, challenge) {
  const messageToSign = `${SIGN_PREFIX[mode]}|${token}|${auth.address}|${challenge}`;
  const signature = await auth.signMessage(messageToSign);
  if (!signature) {
    throw new Error("Signature function returned empty result");
  }
  return signature;
}
async function buildAuthenticatedParams(context, method, params) {
  const auth = context.authOptions;
  if (method === "depinsendmsg") {
    const sendParams = [...params];
    if (sendParams.length === 3) {
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
    const token2 = String(sendParams[0]);
    const challenge2 = await freshChallenge(context, "SEND", token2);
    const signature2 = await signChallenge(auth, "SEND", token2, challenge2);
    return {
      params: [...sendParams, challenge2, signature2],
      mode: "SEND",
      token: token2
    };
  }
  if (params.length > 2) {
    throw new Error(
      'depinclearmsg accepts at most [mode, scope], e.g. ["all", "&TOKEN/GENERAL"]'
    );
  }
  const mode = params.length >= 1 ? params[0] : null;
  const scope = params.length === 2 ? params[1] : void 0;
  if (scope !== void 0 && typeof scope !== "string") {
    throw new Error("depinclearmsg scope must be a string");
  }
  const token = scope || auth.token;
  const challenge = await freshChallenge(context, "ADMIN", token);
  const signature = await signChallenge(auth, "ADMIN", token, challenge);
  return {
    params: scope === void 0 ? [mode, auth.address, challenge, signature] : [mode, scope, auth.address, challenge, signature],
    mode: "ADMIN",
    token
  };
}
function getDePinRPC(target, authOptions) {
  validateTarget(target);
  if (authOptions !== void 0) {
    validateAuthOptions(authOptions);
  }
  const context = {
    target,
    authOptions
  };
  async function depinRpc(method, params, isRetry = false) {
    try {
      const authKind = METHOD_AUTH[method];
      if (authKind === "BLOCKED") {
        throw new Error(
          "depingetmsg over the DePIN gateway is blocked by a node-side bug (the gateway reads fromaddress from params[3], but depingetmsg carries it at index 1 or 2 and accepts at most 3 arguments). Use depinreceivemsg over the gateway, or call depingetmsg through the node RPC port instead."
        );
      }
      let mode;
      let token;
      let requestParams = params;
      if (authKind !== void 0) {
        if (!context.authOptions) {
          throw new Error(
            `${method} requires authentication: create the client with getDePinRPC(target, { token, address, signMessage })`
          );
        }
        const derived = authKind === "SEND" ? "SEND" : "ADMIN";
        if (context.authOptions.mode && context.authOptions.mode !== derived) {
          throw new Error(
            `${method} needs a ${derived} challenge, which conflicts with mode "${context.authOptions.mode}" in the auth options. The mode option is only honored by requestDePinChallenge(); omit it here \u2014 getDePinRPC derives it per method.`
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
        params: requestParams
      };
      const responseText = await sendLine(
        context.target,
        JSON.stringify(requestData)
      );
      if (responseText.startsWith("ERROR|")) {
        throw new Error(responseText.slice("ERROR|".length));
      }
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        throw new Error(
          `Invalid JSON-RPC response from DePIN gateway: ${responseText.slice(0, 200)}`
        );
      }
      if (responseData.error) {
        if (!isRetry && mode !== void 0 && token !== void 0 && responseData.error.message && responseData.error.message.includes("expired")) {
          return depinRpc(method, params, true);
        }
        throw {
          error: responseData.error,
          description: responseData.error.message || "Unknown error"
        };
      }
      return responseData.result;
    } catch (error) {
      if (error && (error.error || error.description)) {
        throw error;
      }
      throw {
        originalError: error,
        type: "DePinRequestError",
        error: error && error.message || "Failed to communicate with DePIN gateway",
        description: "Check that the DePIN gateway host/port are correct and that the node is running with the gateway enabled"
      };
    }
  }
  return (method, params) => depinRpc(method, params);
}
async function requestDePinChallenge(target, authOptions) {
  validateTarget(target);
  validateAuthOptions(authOptions);
  const mode = authOptions.mode || "RECEIVE";
  return requestChallenge(target, authOptions.token, authOptions.address, mode);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDePinRPC,
  requestDePinChallenge
});
