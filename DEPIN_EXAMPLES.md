# DePIN RPC Examples

This file demonstrates how to use the DePIN messaging functionality in neurai-rpc.

## Basic Setup

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

// You need a function that can sign messages with your Neurai address
// This example uses neurai-cli via the standard RPC
import { getRPC, methods } from "@neuraiproject/neurai-rpc";

const standardRpc = getRPC("user", "password", "http://localhost:19001");

async function signMessage(message) {
  // Sign using neurai-cli via RPC
  return await standardRpc(methods.signmessage, ["NXyouraddress...", message]);
}

// Create DePIN RPC client
const depinRpc = getDePinRPC("http://localhost:19002", {
  token: "MYTOKEN",
  address: "NXyouraddress...",
  signMessage: signMessage,
  mode: "SEND"
});
```

## Example 1: Send a DePIN Message

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

async function sendDePinMessage() {
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "MYTOKEN",
    address: "NXsenderAddress...",
    signMessage: async (msg) => {
      // Use your signing method
      return await yourWallet.signMessage(msg);
    },
    mode: "SEND"
  });

  try {
    const result = await depinRpc("depinsendmsg", [
      "MYTOKEN",              // token
      "localhost",            // server (use "localhost" for local pool)
      "Hello DePIN!",         // message
      "NXsenderAddress..."    // from address
    ]);
    
    console.log("Message sent successfully:", result);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
```

## Example 2: Retrieve DePIN Messages

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

async function getDePinMessages() {
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "MYTOKEN",
    address: "NXreceiverAddress...",
    signMessage: async (msg) => {
      return await yourWallet.signMessage(msg);
    },
    mode: "RECEIVE"
  });

  try {
    const messages = await depinRpc("depingetmsg", [
      "MYTOKEN",              // token
      "localhost",            // server or address
      "NXreceiverAddress..."  // your address
    ]);
    
    console.log("Received messages:", messages);
    
    messages.forEach(msg => {
      console.log(`From: ${msg.sender}`);
      console.log(`Message: ${msg.message}`);
      console.log(`Time: ${new Date(msg.timestamp * 1000).toLocaleString()}`);
    });
  } catch (error) {
    console.error("Failed to get messages:", error);
  }
}
```

## Example 3: Submit Pre-encrypted Message

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

async function submitPreEncryptedMessage() {
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "MYTOKEN",
    address: "NXsenderAddress...",
    signMessage: async (msg) => {
      return await yourWallet.signMessage(msg);
    },
    mode: "SEND"
  });

  try {
    // Assume you have a pre-encrypted and signed message in hex format
    const hexMessage = "0a1b2c3d..."; // Your encrypted message hex
    
    const result = await depinRpc("depinsubmitmsg", [hexMessage]);
    
    console.log("Pre-encrypted message submitted:", result);
  } catch (error) {
    console.error("Failed to submit message:", error);
  }
}
```

## Example 4: Using with Browser Wallet

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

// Example with a hypothetical browser wallet extension
async function useBrowserWallet() {
  // Check if wallet is available
  if (!window.neuraiWallet) {
    throw new Error("Neurai wallet extension not found");
  }

  // Request wallet connection
  const accounts = await window.neuraiWallet.connect();
  const address = accounts[0];

  // Create DePIN RPC client with wallet signing
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "MYTOKEN",
    address: address,
    signMessage: async (msg) => {
      // Use wallet extension to sign
      return await window.neuraiWallet.signMessage(address, msg);
    },
    mode: "SEND"
  });

  // Send message
  const result = await depinRpc("depinsendmsg", [
    "MYTOKEN",
    "localhost",
    "Hello from browser!",
    address
  ]);

  console.log("Message sent:", result);
}
```

## Example 5: Manual Challenge Handling

```javascript
import { requestDePinChallenge } from "@neuraiproject/neurai-rpc";

async function manualChallengeFlow() {
  // Request a challenge manually
  const challengeData = await requestDePinChallenge("http://localhost:19002", {
    token: "MYTOKEN",
    address: "NXyourAddress...",
    signMessage: async () => "", // Not used in requestChallenge
    mode: "SEND"
  });

  console.log("Challenge:", challengeData.challenge);
  console.log("Expires in:", challengeData.timeout, "seconds");
  console.log("Message to sign:", challengeData.messageToSign);

  // Now you can sign this message manually
  const signature = await yourSigningFunction(challengeData.messageToSign);
  
  console.log("Signature:", signature);
}
```

## Example 6: Error Handling

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

async function robustDePinCall() {
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "MYTOKEN",
    address: "NXyourAddress...",
    signMessage: async (msg) => {
      try {
        return await yourWallet.signMessage(msg);
      } catch (error) {
        throw new Error(`Signing failed: ${error.message}`);
      }
    },
    mode: "SEND"
  });

  try {
    const result = await depinRpc("depinsendmsg", [
      "MYTOKEN",
      "localhost",
      "Test message",
      "NXyourAddress..."
    ]);
    
    return { success: true, result };
  } catch (error) {
    // Handle different error types
    if (error.type === 'DePinRequestError') {
      console.error("DePIN request failed:", error.error);
      console.error("Description:", error.description);
    } else if (error.error?.message?.includes('challenge')) {
      console.error("Challenge error:", error.error.message);
    } else if (error.error?.message?.includes('signature')) {
      console.error("Signature verification failed");
    } else {
      console.error("Unknown error:", error);
    }
    
    return { success: false, error: error.error };
  }
}
```

## Example 7: Connecting to Remote DePIN Node

```javascript
import { getDePinRPC } from "@neuraiproject/neurai-rpc";

async function connectToRemoteNode() {
  const depinRpc = getDePinRPC("http://remote-node.example.com:19002", {
    token: "MYTOKEN",
    address: "NXyourAddress...",
    signMessage: async (msg) => {
      return await yourWallet.signMessage(msg);
    },
    mode: "SEND"
  });

  // The library handles challenge/response automatically
  const result = await depinRpc("depinsendmsg", [
    "MYTOKEN",
    "remote-node.example.com:19002",
    "Hello remote node!",
    "NXyourAddress..."
  ]);

  console.log("Sent to remote node:", result);
}
```

## Notes

1. **Challenge Expiry**: Challenges expire after 60 seconds. The library automatically handles expiry and retries with a new challenge.

2. **Signature Format**: The signature must be in base64 format as returned by Neurai's `signmessage` RPC command.

3. **Mode Selection**: Use `mode: "SEND"` for `depinsendmsg` and `depinsubmitmsg`, and `mode: "RECEIVE"` for `depingetmsg`.

4. **Port**: DePIN messaging uses port 19002 by default (configurable via `-depinmsgport`).

5. **Token Requirement**: You must hold the specified DePIN token to send or receive messages.
