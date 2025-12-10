/**
 * DePIN RPC Test Example
 * 
 * This is an example test file showing how to use getDePinRPC.
 * To run actual tests, you need:
 * 1. A running Neurai node with DePIN enabled
 * 2. A valid DePIN token
 * 3. A way to sign messages (wallet with private key)
 */

import { getDePinRPC, requestDePinChallenge } from "./index";

// Mock signing function for testing
async function mockSignMessage(message: string): Promise<string> {
  // In production, this would call your actual signing function
  // For example: neurai-cli signmessage "address" "message"
  console.log("Mock signing message:", message);
  return "H1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234==";
}

async function testRequestChallenge() {
  console.log("\n=== Test 1: Request Challenge ===");
  
  try {
    const challenge = await requestDePinChallenge("http://localhost:19002", {
      token: "TESTTOKEN",
      address: "NXtestAddress123",
      signMessage: mockSignMessage,
      mode: "SEND"
    });
    
    console.log("✓ Challenge received:");
    console.log("  Challenge:", challenge.challenge);
    console.log("  Timeout:", challenge.timeout, "seconds");
    console.log("  Message to sign:", challenge.messageToSign);
  } catch (error: any) {
    console.error("✗ Failed to request challenge:", error.message);
  }
}

async function testSendMessage() {
  console.log("\n=== Test 2: Send DePIN Message ===");
  
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "TESTTOKEN",
    address: "NXsenderAddress123",
    signMessage: mockSignMessage,
    mode: "SEND"
  });
  
  try {
    const result = await depinRpc("depinsendmsg", [
      "TESTTOKEN",
      "localhost",
      "Hello from test!",
      "NXsenderAddress123"
    ]);
    
    console.log("✓ Message sent successfully:");
    console.log("  Result:", result);
  } catch (error: any) {
    console.error("✗ Failed to send message:");
    console.error("  Error:", error.error);
    console.error("  Description:", error.description);
  }
}

async function testGetMessages() {
  console.log("\n=== Test 3: Get DePIN Messages ===");
  
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "TESTTOKEN",
    address: "NXreceiverAddress123",
    signMessage: mockSignMessage,
    mode: "RECEIVE"
  });
  
  try {
    const messages = await depinRpc("depingetmsg", [
      "TESTTOKEN",
      "localhost",
      "NXreceiverAddress123"
    ]);
    
    console.log("✓ Messages retrieved:");
    console.log("  Count:", messages.length);
    if (messages.length > 0) {
      console.log("  First message:", messages[0]);
    }
  } catch (error: any) {
    console.error("✗ Failed to get messages:");
    console.error("  Error:", error.error);
    console.error("  Description:", error.description);
  }
}

async function testErrorHandling() {
  console.log("\n=== Test 4: Error Handling ===");
  
  // Test with invalid URL
  const depinRpc = getDePinRPC("http://invalid-server:19002", {
    token: "TESTTOKEN",
    address: "NXtestAddress123",
    signMessage: mockSignMessage,
    mode: "SEND"
  });
  
  try {
    await depinRpc("depinsendmsg", [
      "TESTTOKEN",
      "localhost",
      "This should fail",
      "NXtestAddress123"
    ]);
    
    console.error("✗ Should have thrown an error");
  } catch (error: any) {
    console.log("✓ Error caught as expected:");
    console.log("  Type:", error.type);
    console.log("  Error:", error.error);
  }
}

async function testChallengeReuse() {
  console.log("\n=== Test 5: Challenge Reuse ===");
  
  const depinRpc = getDePinRPC("http://localhost:19002", {
    token: "TESTTOKEN",
    address: "NXtestAddress123",
    signMessage: mockSignMessage,
    mode: "SEND"
  });
  
  try {
    console.log("Making first call...");
    await depinRpc("depinsendmsg", [
      "TESTTOKEN",
      "localhost",
      "First message",
      "NXtestAddress123"
    ]);
    
    console.log("Making second call (should reuse challenge)...");
    await depinRpc("depinsendmsg", [
      "TESTTOKEN",
      "localhost",
      "Second message",
      "NXtestAddress123"
    ]);
    
    console.log("✓ Challenge reused successfully");
  } catch (error: any) {
    console.error("✗ Failed:", error.error);
  }
}

// Main test runner
async function runTests() {
  console.log("==============================================");
  console.log("DePIN RPC Client Test Suite");
  console.log("==============================================");
  console.log("\nNote: These tests require a running Neurai node");
  console.log("with DePIN enabled on port 19002");
  console.log("==============================================");
  
  await testRequestChallenge();
  await testSendMessage();
  await testGetMessages();
  await testErrorHandling();
  await testChallengeReuse();
  
  console.log("\n==============================================");
  console.log("Tests completed");
  console.log("==============================================\n");
}

// Uncomment to run tests
// runTests().catch(console.error);

export {
  testRequestChallenge,
  testSendMessage,
  testGetMessages,
  testErrorHandling,
  testChallengeReuse,
  runTests
};
