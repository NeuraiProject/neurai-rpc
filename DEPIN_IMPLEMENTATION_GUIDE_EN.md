# DePIN Implementation Technical Guide for Neurai RPC

## Change Summary

Thirteen new RPC commands have been added for Neurai's DePIN (Decentralized Physical Infrastructure Networks) system, grouped into three categories: DePIN asset management, encrypted messaging, and AI/MCP monitoring.

**Version:** 0.4.5  
**Date:** December 2025  
**Branch:** master

---

## 1. DePIN Architecture

### 1.1 Dual-Port Architecture

The DePIN system uses two distinct ports for different operations:

- **Port 8766** (standard RPC): Asset management commands and queries
- **Port 19002** (DePIN Server): Encrypted messaging and P2P operations

### 1.2 DePIN Asset Types

DePIN assets are special tokens that:
- **Can be any asset on the Neurai blockchain** (no specific prefix required)
- Are **soulbound** (non-transferable except by the owner)
- Can be frozen/revoked by the owner or self-revoked by the holder
- Require the owner token `ASSET!` for administration operations

---

## 2. Newly Added RPC Commands

### 2.1 DePIN Asset Management Commands

#### **checkdepinvalidity**
Checks whether a DePIN asset is valid for a specific address.

**Signature:**
```typescript
checkdepinvalidity(asset_name: string, address: string): Promise<{
  has_asset: boolean;
  amount?: number;
  valid?: 0 | 1;
  blocked?: boolean;
}>
```

**Example:**
```javascript
const rpc = getRPC('http://127.0.0.1:8766', 'username', 'password');
const result = await rpc('checkdepinvalidity', ['FRANCE', 'NXabcd...']);
// Returns: { has_asset: true, amount: 1, valid: 1, blocked: false }
```

**Port:** 8766  
**Requires Wallet:** No

---

#### **listdepinholders**
Lists all holders of a DePIN asset along with their validity status.

**Signature:**
```typescript
listdepinholders(asset_name: string): Promise<Array<{
  address: string;
  amount: number;
  valid: 0 | 1;
}>>
```

**Example:**
```javascript
const holders = await rpc('listdepinholders', ['FRANCE']);
// Returns: [
//   { address: 'NXabc...', amount: 1, valid: 1 },
//   { address: 'NXdef...', amount: 1, valid: 0 }
// ]
```

**Port:** 8766  
**Requires:** `-assetindex` enabled on the node

---

#### **freezedepin**
Freezes a DePIN asset for a specific address (owner only).

**Signature:**
```typescript
freezedepin(
  asset_name: string, 
  address: string, 
  change_address?: string
): Promise<string> // txid
```

**Example:**
```javascript
const txid = await rpc('freezedepin', ['FRANCE', 'NXmalicious...']);
// Returns: "a1b2c3d4e5f6..." (transaction ID)
```

**Port:** 8766  
**Requires:** Owner token `FRANCE!` in the wallet

---

#### **unfreezedepin**
Unfreezes a previously frozen DePIN asset (owner only).

**Signature:**
```typescript
unfreezedepin(
  asset_name: string, 
  address: string, 
  change_address?: string
): Promise<string> // txid
```

**Port:** 8766  
**Requires:** Owner token `ASSET!` in the wallet

---

#### **selfrevokedepin**
Allows a holder to self-revoke their DePIN asset (this action can only be undone by the asset owner).

**Signature:**
```typescript
selfrevokedepin(asset_name: string): Promise<string> // txid
```

**Example:**
```javascript
const txid = await rpc('selfrevokedepin', ['FRANCE']);
```

**Port:** 8766  
**Requires Wallet:** Yes (the wallet must hold the asset)

---

### 2.2 DePIN Messaging Commands

#### **depingetmsginfo**
Returns information about the DePIN messaging system.

**Signature:**
```typescript
depingetmsginfo(): Promise<{
  enabled: boolean;
  token: string;
  port: number;
  maxrecipients: number;
  maxmessagesize: number;
  messageexpiryhours: number;
  maxpoolsizemb: number;
  messages: number;
  memoryusage: number;
  memoryusagemb: number;
  oldestmessage?: string;
  newestmessage?: string;
}>
```

**Example:**
```javascript
const info = await rpc('depingetmsginfo', []);
// Returns: {
//   enabled: true,
//   token: "FRANCE",
//   port: 19002,
//   maxmessagesize: 1024,
//   messages: 42,
//   ...
// }
```

**Port:** 8766

---

#### **depinsendmsg**
Sends an encrypted message through a remote DePIN gateway using challenge/response.

**Signature:**
```typescript
depinsendmsg(
  token: string,
  ip_port: string,      // "192.168.1.100" or "192.168.1.100:19002"
  message: string,       // Max 1KB
  fromaddress: string,
  port?: number          // Override port (default: 19002)
): Promise<{
  result: string;
  hash: string;
  recipients: number;
  timestamp: number;
}>
```

**Operation flow:**
1. Client connects to remote gateway on port 19002
2. Requests challenge: `AUTH|TOKEN|ADDRESS|SEND`
3. Gateway responds: `CHALLENGE|<challenge>|<timeout>`
4. Client signs the challenge with its private key
5. Client sends: `SUBMIT|<signature>|<encrypted_message>`
6. Gateway validates and distributes the message

**Example:**
```javascript
const result = await rpc('depinsendmsg', [
  'FRANCE',
  '192.168.1.100:19002',
  'Hello team!',
  'NXsender...'
]);
// Returns: { result: "success", hash: "abc123...", recipients: 5, timestamp: 1702123456 }
```

**Port:** 8766 (RPC), connects to remote node port 19002  
**Encryption:** ECIES (ECDH + AES-256-CBC + HMAC-SHA256)

---

#### **depinsubmitmsg**
Submits a pre-encrypted and signed DePIN message to the local pool (secure protocol).

**Signature:**
```typescript
depinsubmitmsg(hexmessage: string): Promise<{
  result: string;
  hash: string;
  timestamp: number;
}>
```

**Message structure (CDepinMessage):**
```cpp
class CDepinMessage {
  string token;                          // DePIN token
  string senderAddress;                  // Sender address
  int64_t timestamp;                     // Unix timestamp
  vector<unsigned char> encryptedPayload; // ECIES-encrypted message
  vector<unsigned char> signature;        // secp256k1 signature
}
```

**Example:**
```javascript
// The message must be serialized and encrypted by the client
const hexMsg = "0a3f2e1b4c..."; // Serialized message in hex
const result = await rpc('depinsubmitmsg', [hexMsg]);
```

**Port:** 19002  
**Note:** This endpoint is typically used by remote nodes after authentication

---

#### **depingetmsg**
Retrieves and decrypts DePIN messages for the wallet's addresses.

**Signature:**
```typescript
depingetmsg(
  token: string,
  ip_or_address?: string,  // remote IP or local address
  fromaddress?: string      // only if arg2 is IP
): Promise<Array<{
  recipient: string;
  sender: string;
  message: string;
  timestamp: number;
  date: string;
  expires: string;
}>>
```

**Operation modes:**

1. **Local - all addresses:**
```javascript
const messages = await rpc('depingetmsg', ['FRANCE']);
```

2. **Local - specific address:**
```javascript
const messages = await rpc('depingetmsg', ['FRANCE', 'NXyouraddr...']);
```

3. **Remote - IP without port:**
```javascript
const messages = await rpc('depingetmsg', ['FRANCE', '192.168.1.78']);
```

4. **Remote - IP with port:**
```javascript
const messages = await rpc('depingetmsg', ['FRANCE', '192.168.1.78:19002']);
```

5. **Remote - with specific address:**
```javascript
const messages = await rpc('depingetmsg', [
  'FRANCE', 
  '192.168.1.78:19002', 
  'NXyouraddr...'
]);
```

**Port:** 8766 (for local queries), 19002 (for remote queries)  
**Decryption:** Automatic using the wallet's private keys

---

#### **depinclearmsg**
Removes messages from the DePIN messaging pool.

**Signature:**
```typescript
depinclearmsg(mode?: 'all' | number): Promise<{
  removed: number;
  remaining: number;
}>
```

**Modes:**
- No parameters: Remove only expired messages (default)
- `"all"`: Remove ALL messages from the pool
- `<hours>`: Remove messages older than the specified hours

**Examples:**
```javascript
// Remove only expired
const result = await rpc('depinclearmsg', []);

// Remove all
const result = await rpc('depinclearmsg', ['all']);

// Remove older than 7 days
const result = await rpc('depinclearmsg', [168]);
```

**Port:** 8766

---

#### **depingetpoolcontent**
Inspects the contents of the DePIN message pool.

**Signature:**
```typescript
depingetpoolcontent(
  verbose?: boolean | 'all' | 'raw',
  sender_address?: string,
  recipient_address?: string,
  start_time?: number,
  end_time?: number,
  limit?: number,        // Default: 100, Max: 1000
  offset?: number
): Promise<Array<{
  hash: string;
  sender: string;
  timestamp: number;
  date: string;
  expires: string;
  encryption_type: string;
  size: number;
  encrypted_payload_hex?: string;  // Only if verbose='raw'
  signature_hex?: string;          // Only if verbose='raw'
}>>
```

**Examples:**
```javascript
// Simple view
const pool = await rpc('depingetpoolcontent', []);

// Detailed view
const pool = await rpc('depingetpoolcontent', [true]);

// All messages
const pool = await rpc('depingetpoolcontent', ['all']);

// With payload hex
const pool = await rpc('depingetpoolcontent', ['raw']);

// Filter by sender
const pool = await rpc('depingetpoolcontent', [false, 'NXsender...']);
```

**Port:** 8766  
**Note:** Recipient filtering does not work with ECIES shared encryption

---

#### **depinpoolstats**
Returns statistical information about the DePIN message pool.

**Signature:**
```typescript
depinpoolstats(): Promise<{
  enabled: boolean;
  token: string;
  total_messages: number;
  total_size_bytes: number;
  memory_usage_bytes: number;
  oldest_message: string;
  newest_message: string;
  messages_by_age: {
    last_hour: number;
    last_day: number;
    last_week: number;
  };
  unique_senders: number;
  unique_recipients: string;  // "N/A (ECIES shared encryption)"
  avg_message_size: number;
  expiring_in_24h: number;
}>
```

**Example:**
```javascript
const stats = await rpc('depinpoolstats', []);
```

**Port:** 8766

---

### 2.3 AI/MCP Command

#### **depinmcpstatus**
Gets the status of the MCP (Model Context Protocol) worker for AI.

**Signature:**
```typescript
depinmcpstatus(): Promise<{
  enabled: boolean;
  running: boolean;
  mcp_url: string;
  model_name: string;
  command_key: string;      // e.g., "/ai"
  depin_token: string;
  node_address: string;
  poll_interval: number;
  pool_host: string;
  pool_port: number;
  using_remote_pool: boolean;
  commands_processed: number;
  total_errors: number;
  last_poll_time: number;
  last_poll_time_str?: string;
}>
```

**Example:**
```javascript
const status = await rpc('depinmcpstatus', []);
// Returns: {
//   enabled: true,
//   running: true,
//   model_name: "claude-3-sonnet",
//   command_key: "/ai",
//   commands_processed: 127,
//   ...
// }
```

**Port:** 8766  
**Note:** The MCP worker processes AI commands sent through the DePIN messaging system

---

## 3. DePIN Messaging Protocol

### 3.1 Shared ECIES Encryption

The system uses ECIES (Elliptic Curve Integrated Encryption Scheme) with the following components:

**Components:**
- **ECDH** (secp256k1): To generate shared secret
- **KDF-SHA256**: Derives encryption and HMAC keys
- **AES-256-CBC**: Encrypts the message payload
- **HMAC-SHA256**: Message authentication

**Encryption flow:**
```
1. Sender generates ephemeral key pair (ephemeral_privkey, ephemeral_pubkey)
2. For each recipient holding the DePIN token:
   - Obtain recipient public key via getpubkey RPC
   - Compute shared_secret = ECDH(ephemeral_privkey, recipient_pubkey)
   - Derive keys: encryption_key || hmac_key = KDF-SHA256(shared_secret, 64)
3. Encrypt message: ciphertext = AES-256-CBC(plaintext, encryption_key, iv)
4. Compute MAC: mac = HMAC-SHA256(hmac_key, ciphertext)
5. Build payload: ephemeral_pubkey || iv || ciphertext || mac
```

**Decryption flow:**
```
1. Recipient extracts ephemeral_pubkey from the message
2. Compute shared_secret = ECDH(recipient_privkey, ephemeral_pubkey)
3. Derive keys: encryption_key || hmac_key = KDF-SHA256(shared_secret, 64)
4. Verify MAC
5. Decrypt: plaintext = AES-256-CBC-decrypt(ciphertext, encryption_key, iv)
```

### 3.2 Challenge/Response Authentication

For remote operations (depinsendmsg):

**Protocol:**
```
Client → Server: AUTH|<token>|<address>|<mode>
  mode = SEND | RECEIVE

Server → Client: CHALLENGE|<random_challenge>|<timeout_seconds>

Client:
  1. Sign challenge: signature = sign(sha256(challenge), privkey)
  2. Prepare encrypted message

Client → Server: SUBMIT|<signature>|<hex_encrypted_message>

Server:
  1. Verify signature with address pubkey
  2. Verify token ownership
  3. Validate and store message
  4. Return confirmation
```

---

## 4. Wallet Web Implementation

### 4.1 Recommended DePINClient Class

```typescript
class DePINClient {
  private rpcUrl: string;
  private rpcPort: number = 8766;
  private depinPort: number = 19002;
  private username: string;
  private password: string;

  constructor(config: {
    host: string;
    rpcPort?: number;
    depinPort?: number;
    username: string;
    password: string;
  }) {
    this.rpcUrl = `http://${config.host}`;
    this.rpcPort = config.rpcPort || 8766;
    this.depinPort = config.depinPort || 19002;
    this.username = config.username;
    this.password = config.password;
  }

  // Standard RPC operations (port 8766)
  async checkValidity(asset: string, address: string) {
    return this.callRPC('checkdepinvalidity', [asset, address]);
  }

  async listHolders(asset: string) {
    return this.callRPC('listdepinholders', [asset]);
  }

  async getMessages(token: string, address?: string) {
    const params = address ? [token, address] : [token];
    return this.callRPC('depingetmsg', params);
  }

  async getPoolStats() {
    return this.callRPC('depinpoolstats', []);
  }

  // Messaging operations (port 19002 for sending)
  async sendMessage(
    token: string, 
    remoteHost: string, 
    message: string, 
    fromAddress: string
  ) {
    return this.callRPC('depinsendmsg', [
      token,
      remoteHost,
      message,
      fromAddress
    ]);
  }

  private async callRPC(method: string, params: any[]) {
    const url = `${this.rpcUrl}:${this.rpcPort}`;
    const auth = btoa(`${this.username}:${this.password}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  }
}
```

### 4.2 Example Chat Component

```typescript
interface ChatMessage {
  sender: string;
  recipient: string;
  message: string;
  timestamp: number;
  date: string;
}

class DePINChat {
  private client: DePINClient;
  private token: string;
  private myAddress: string;
  private pollInterval: number = 5000; // 5 seconds

  constructor(client: DePINClient, token: string, myAddress: string) {
    this.client = client;
    this.token = token;
    this.myAddress = myAddress;
  }

  // Polling for new messages
  async startPolling(callback: (messages: ChatMessage[]) => void) {
    setInterval(async () => {
      try {
        const messages = await this.client.getMessages(
          this.token, 
          this.myAddress
        );
        callback(messages);
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, this.pollInterval);
  }

  // Send message to a remote node
  async sendMessage(remoteHost: string, message: string) {
    return await this.client.sendMessage(
      this.token,
      remoteHost,
      message,
      this.myAddress
    );
  }

  // Get pool statistics
  async getStats() {
    return await this.client.getPoolStats();
  }

  // Clear old messages
  async clearOldMessages(hoursOld: number) {
    return await this.client.callRPC('depinclearmsg', [hoursOld]);
  }
}
```

### 4.3 Usage in React/Vue

```typescript
// Example React hook
function useDePINChat(token: string, myAddress: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const client = useMemo(() => new DePINClient({
    host: '127.0.0.1',
    username: 'rpcuser',
    password: 'rpcpass'
  }), []);

  useEffect(() => {
    const chat = new DePINChat(client, token, myAddress);
    
    // Polling messages
    chat.startPolling((newMessages) => {
      setMessages(newMessages);
    });

    // Get initial stats
    chat.getStats().then(setStats);
  }, [token, myAddress]);

  const sendMessage = async (host: string, message: string) => {
    const chat = new DePINChat(client, token, myAddress);
    return await chat.sendMessage(host, message);
  };

  return { messages, stats, sendMessage };
}
```

---

## 5. Security Considerations

### 5.1 Token Validation

Always verify token ownership before sending/receiving messages:

```typescript
async function verifyTokenOwnership(address: string, token: string) {
  const validity = await client.checkValidity(token, address);
  if (!validity.has_asset || validity.valid === 0) {
    throw new Error('Address does not own valid DePIN token');
  }
  return true;
}
```

**Note:** The token can be any asset on the Neurai blockchain; no special prefix is required.

### 5.2 Key Management

- **NEVER** send private keys to the backend
- Encryption should be performed in the client (browser)
- Use the Web Crypto API for cryptographic operations
- Signatures must be generated locally

### 5.3 Rate Limiting

Implement rate limiting on the frontend:

```typescript
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number = 10;
  private windowMs: number = 60000; // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}
```

---

## 6. Node Configuration

### 6.1 neurai.conf

To enable DePIN on the node:

```ini
# RPC Configuration
rpcuser=yourusername
rpcpassword=yourpassword
rpcport=8766
rpcallowip=127.0.0.1
rpcallowip=192.168.1.0/24

# DePIN Messaging
depinmsg=1
depintoken=FRANCE
depinport=19002
depinmaxmessagesize=1024
depinmessageexpiry=168  # 7 days in hours
depinmaxpoolsize=100    # MB

# Asset Index (required for listdepinholders)
assetindex=1

# MCP/AI Worker (optional)
depinmcp=1
depinmcpurl=http://localhost:8080
depinmcpmodel=claude-3-sonnet
depinmcpkey=/ai
```

### 6.2 Ports to Open

In your firewall/router:
- **8766**: RPC (only localhost or trusted IPs)
- **19002**: DePIN Messaging (public if you want to receive messages)

---

## 7. Testing

### 7.1 Basic Connectivity Test

```typescript
async function testConnection() {
  const client = new DePINClient({
    host: '127.0.0.1',
    username: 'test',
    password: 'test'
  });

  try {
    const info = await client.callRPC('depingetmsginfo', []);
    console.log('✓ Connected:', info);
    return true;
  } catch (error) {
    console.error('✗ Connection failed:', error);
    return false;
  }
}
```

### 7.2 Messaging Test

```typescript
async function testMessaging() {
  const client = new DePINClient({
    host: '127.0.0.1',
    username: 'test',
    password: 'test'
  });

  // Verify token
  const validity = await client.checkValidity('FRANCE', 'NXyouraddr...');
  console.log('Token validity:', validity);

  // Send message
  const result = await client.sendMessage(
    'FRANCE',
    '192.168.1.100:19002',
    'Test message',
    'NXyouraddr...'
  );
  console.log('Message sent:', result);

  // Retrieve messages
  const messages = await client.getMessages('FRANCE', 'NXyouraddr...');
  console.log('Messages:', messages);
}
```

---

## 8. Troubleshooting

### 8.1 Common Errors

**Error: "DePIN messaging pool is not enabled"**
- Fix: Add `depinmsg=1` in `neurai.conf` and restart the node

**Error: "Sender verification failed"**
- Fix: The address does not hold the required DePIN token

**Error: "Invalid message signature"**
- Fix: The message was not correctly signed with the private key

### 8.2 Debugging

Enable detailed logs in `neurai.conf`:

```ini
debug=depin
debug=rpc
```

---

## 9. References

- **Repository:** https://github.com/NeuraiProject/neurai-rpc
- **Version:** 0.4.5
- **RPC Documentation:** See `neurai_methods.md`
- **DePIN source code:** `Neurai/src/rpc/messages.cpp`, `Neurai/src/rpc/assets.cpp`
- **ECIES specification:** `Neurai/src/depinecies.cpp`

---

## 10. Changelog

### v0.4.5 (December 2025)

**New commands added:**
- `checkdepinvalidity` - DePIN asset validation
- `listdepinholders` - List holders with validity status
- `freezedepin` - Freeze assets
- `unfreezedepin` - Unfreeze assets
- `selfrevokedepin` - Self-revoke assets
- `depingetmsginfo` - Messaging system info
- `depinsendmsg` - Send encrypted messages
- `depinsubmitmsg` - Submit pre-encrypted messages
- `depingetmsg` - Retrieve messages
- `depinclearmsg` - Clear the pool
- `depingetpoolcontent` - Inspect the pool
- `depinpoolstats` - Pool statistics
- `depinmcpstatus` - MCP (AI) worker status

**Improvements:**
- TypeScript configured with ES2015+ support (Promise, startsWith, etc.)
- Removed TypeScript compilation warnings
- Complete JSDoc documentation
- TypeScript types generated automatically

---

## Contact and Support

For production implementations or specific questions, consult:
- GitHub issues: https://github.com/NeuraiProject/neurai-rpc/issues
- Neurai Discord: [link]
- Official documentation: https://neurai.org/docs
