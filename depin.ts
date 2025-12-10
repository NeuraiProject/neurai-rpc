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

interface DePinRPCContext {
  url: string;
  authOptions: DePinAuthOptions;
  currentChallenge?: {
    challenge: string;
    expiresAt: number;
    mode: 'SEND' | 'RECEIVE';
  };
}

/**
 * Request a challenge from DePIN server
 * Uses the simple protocol: AUTH|token|address|mode
 */
async function requestChallenge(
  url: string,
  authOptions: DePinAuthOptions
): Promise<DePinChallenge> {
  const mode = authOptions.mode || 'RECEIVE';
  const authCommand = `AUTH|${authOptions.token}|${authOptions.address}|${mode}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: authCommand,
    });

    if (!response.ok) {
      throw new Error(`Failed to request challenge: ${response.statusText}`);
    }

    const responseText = await response.text();
    
    // Parse response: CHALLENGE|<challenge>|<timeout>
    if (!responseText.startsWith('CHALLENGE|')) {
      throw new Error(`Invalid challenge response: ${responseText}`);
    }

    const parts = responseText.split('|');
    if (parts.length < 3) {
      throw new Error(`Malformed challenge response: ${responseText}`);
    }

    const challenge = parts[1];
    const timeout = parseInt(parts[2], 10);

    if (!challenge || isNaN(timeout)) {
      throw new Error(`Invalid challenge data: ${responseText}`);
    }

    // Construct the message that needs to be signed
    const messageToSign = `DEPIN-${mode}|${authOptions.token}|${authOptions.address}|${challenge}`;

    return {
      challenge,
      timeout,
      messageToSign,
    };
  } catch (error: any) {
    throw new Error(`Failed to request DePIN challenge: ${error.message}`);
  }
}

/**
 * Make authenticated JSON-RPC request to DePIN server
 */
async function postDePinData(
  url: string,
  data: any,
  challenge: string,
  signature: string
): Promise<Response> {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response;
}

/**
 * Get or refresh challenge if needed
 */
async function ensureValidChallenge(
  context: DePinRPCContext,
  requiredMode: 'SEND' | 'RECEIVE'
): Promise<string> {
  const now = Date.now();
  
  // Check if we have a valid cached challenge
  if (
    context.currentChallenge &&
    context.currentChallenge.mode === requiredMode &&
    context.currentChallenge.expiresAt > now
  ) {
    return context.currentChallenge.challenge;
  }

  // Request new challenge
  const authOptions = { ...context.authOptions, mode: requiredMode };
  const challengeData = await requestChallenge(context.url, authOptions);

  // Cache challenge (expires 5 seconds before actual timeout for safety)
  context.currentChallenge = {
    challenge: challengeData.challenge,
    expiresAt: now + (challengeData.timeout - 5) * 1000,
    mode: requiredMode,
  };

  return challengeData.challenge;
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
export function getDePinRPC(url: string, authOptions: DePinAuthOptions) {
  if (!url) {
    throw new Error('URL is required for DePIN RPC');
  }
  if (!authOptions.token) {
    throw new Error('Token is required for DePIN authentication');
  }
  if (!authOptions.address) {
    throw new Error('Address is required for DePIN authentication');
  }
  if (!authOptions.signMessage || typeof authOptions.signMessage !== 'function') {
    throw new Error('signMessage function is required for DePIN authentication');
  }

  const context: DePinRPCContext = {
    url,
    authOptions,
  };

  return async function depinRpc(method: string, params: any[]) {
    return new Promise(async (resolve, reject) => {
      try {
        // Determine operation mode from method
        const requiredMode = method === 'depinsendmsg' || method === 'depinsubmitmsg' 
          ? 'SEND' 
          : 'RECEIVE';

        // Get valid challenge
        const challenge = await ensureValidChallenge(context, requiredMode);

        // Build message to sign
        const messageToSign = `DEPIN-${requiredMode}|${authOptions.token}|${authOptions.address}|${challenge}`;

        // Sign the message
        const signature = await authOptions.signMessage(messageToSign);

        if (!signature) {
          throw new Error('Signature function returned empty result');
        }

        // Add challenge and signature to params
        const enhancedParams = [...params, challenge, signature];

        // Build JSON-RPC request
        const requestData = {
          jsonrpc: '2.0',
          id: Math.random(),
          method,
          params: enhancedParams,
        };

        // Make request
        const response = await postDePinData(
          url,
          requestData,
          challenge,
          signature
        );

        if (response.ok) {
          const responseData = await response.json();
          
          if (responseData.error) {
            // Check if it's an expired challenge error
            if (
              responseData.error.message &&
              responseData.error.message.includes('expired')
            ) {
              // Clear cached challenge and retry once
              context.currentChallenge = undefined;
              
              // Retry the request with a new challenge
              return depinRpc(method, params).then(resolve).catch(reject);
            }
            
            reject({
              error: responseData.error,
              description: responseData.error.message || 'Unknown error',
            });
          } else {
            resolve(responseData.result);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          reject({
            statusText: response.statusText,
            status: response.status,
            error: errorData.error,
            description: errorData.error?.message || 'Request failed',
          });
        }
      } catch (error: any) {
        reject({
          originalError: error,
          type: 'DePinRequestError',
          error: error.message || 'Failed to communicate with DePIN server',
          description: 'Check that the DePIN server URL is correct and that the server is running',
        });
      }
    });
  };
}

/**
 * Helper function to request a challenge without making an RPC call
 * Useful for testing or manual challenge handling
 */
export async function requestDePinChallenge(
  url: string,
  authOptions: DePinAuthOptions
): Promise<DePinChallenge> {
  return requestChallenge(url, authOptions);
}
