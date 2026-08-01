# DePIN Implementation Technical Guide for Neurai RPC

## Change Summary

This guide covers the RPC commands of Neurai's DePIN (Decentralized Physical
Infrastructure Networks) system — asset management, encrypted messaging and
AI/MCP monitoring — and the library's DePIN client. As of 0.5.0 the client
speaks the gateway's real raw-TCP line protocol from the Node.js-only entry
`@neuraiproject/neurai-rpc/depin` (see §3.2 and the changelog in §10).

**Version:** 0.5.0  
**Date:** August 2026  
**Branch:** master

---

## 1. DePIN Architecture

### 1.1 Dual-Port Architecture

The DePIN system uses two distinct ports for different operations:

- **Ports 19001 (mainnet) / 19101 (testnet)** (standard RPC, HTTP): Asset management commands and queries
- **Port 19002** (DePIN gateway, raw TCP): Encrypted messaging and P2P operations (default of `-depinmsgport`, same on every network)

### 1.2 DePIN Asset Types

There are two related but different concepts in the current DePIN stack:

- **DePIN messaging token:** the DEPIN asset configured in `depinmsgtoken` for gateway messaging. It must start with `&` (e.g. `&FRANCE`); sections like `&FRANCE/GENERAL` scope hierarchical pools.
- **Dedicated DePIN asset type:** a newer asset class used by the asset-management RPCs (`checkdepinvalidity`, `listdepinholders`, `freezedepin`, `unfreezedepin`, `selfrevokedepin`). These assets use the `&` prefix, are soulbound, are currently enabled on **testnet and regtest only** in the node, require the owner token `&ASSET!`, and must be issued and reissued with `units=0`.

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
const rpc = getRPC('username', 'password', 'http://127.0.0.1:19001');
const result = await rpc('checkdepinvalidity', ['&FRANCE', 'NXabcd...']);
// Returns: { has_asset: true, amount: 1, valid: 1, blocked: false }
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
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
const holders = await rpc('listdepinholders', ['&FRANCE']);
// Returns: [
//   { address: 'NXabc...', amount: 1, valid: 1 },
//   { address: 'NXdef...', amount: 1, valid: 0 }
// ]
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
**Requires:** `-assetindex` enabled on the node

---

#### **listdepinaddresses**
Lists addresses that own an asset and have already revealed a public key on-chain.
This is useful when discovering recipients for DePIN messaging.

**Signature:**
```typescript
listdepinaddresses(asset_name: string, count?: number, start?: number): Promise<Array<{
  address: string;
  pubkey: string;
}>>
```

**Example:**
```javascript
const recipients = await rpc('listdepinaddresses', ['&FRANCE']);
// Returns: [
//   { address: 'NXabc...', pubkey: '02ab...' },
//   { address: 'NXdef...', pubkey: '03cd...' }
// ]
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
**Requires:** `-assetindex` and `-pubkeyindex` enabled on the node

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
const txid = await rpc('freezedepin', ['&FRANCE', 'NXmalicious...']);
// Returns: "a1b2c3d4e5f6..." (transaction ID)
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
**Requires:** Owner token `&FRANCE!` in the wallet

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

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
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
const txid = await rpc('selfrevokedepin', ['&FRANCE']);
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
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
//   token: "&FRANCE",
//   port: 19002,
//   maxmessagesize: 1024,
//   messages: 42,
//   ...
// }
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)

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
4. Client signs `DEPIN-SEND|token|address|challenge` with its private key
5. Client sends the JSON-RPC request with challenge and signature appended
   to the params — the gateway validates and trims them (see §3.2)
6. Gateway validates and distributes the message

**Example:**
```javascript
const result = await rpc('depinsendmsg', [
  '&FRANCE',
  '192.168.1.100:19002',
  'Hello team!',
  'NXsender...'
]);
// Returns: { result: "success", hash: "abc123...", recipients: 5, timestamp: 1702123456 }
```

**Port:** standard RPC (19001/19101); the node connects out to the remote gateway on TCP 19002  
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
const messages = await rpc('depingetmsg', ['&FRANCE']);
```

2. **Local - specific address:**
```javascript
const messages = await rpc('depingetmsg', ['&FRANCE', 'NXyouraddr...']);
```

3. **Remote - IP without port:**
```javascript
const messages = await rpc('depingetmsg', ['&FRANCE', '192.168.1.78']);
```

4. **Remote - IP with port:**
```javascript
const messages = await rpc('depingetmsg', ['&FRANCE', '192.168.1.78:19002']);
```

5. **Remote - with specific address:**
```javascript
const messages = await rpc('depingetmsg', [
  '&FRANCE', 
  '192.168.1.78:19002', 
  'NXyouraddr...'
]);
```

**Port:** standard RPC (19001/19101) for local queries; remote queries reach the remote gateway on TCP 19002  
**Decryption:** Automatic using the wallet's private keys

> **Gateway note:** calling `depingetmsg` directly against the TCP gateway
> (port 19002) is currently blocked by a node-side parameter bug — see §3.2.
> Through the standard RPC port (shown above) it works normally.

---

#### **depinclearmsg**
Removes messages from the DePIN messaging pool.

**Signature:**
```typescript
depinclearmsg(
  mode?: 'all' | number,
  scope?: string            // section token, e.g. "&TOKEN/GENERAL"
): Promise<{
  removed: number;
  remaining: number;
}>
```

**Modes:**
- No parameters: Remove only expired messages (default)
- `"all"`: Remove ALL messages from the pool
- `<hours>`: Remove messages older than the specified hours
- With `scope`: restrict the purge to one section's subtree (owner of the
  section or of an ancestor required over the gateway; purging a subtree
  never touches parents or siblings)

**Examples:**
```javascript
// Remove only expired
const result = await rpc('depinclearmsg', []);

// Remove all
const result = await rpc('depinclearmsg', ['all']);

// Remove older than 7 days
const result = await rpc('depinclearmsg', [168]);

// Remove everything in one section only
const result = await rpc('depinclearmsg', ['all', '&FRANCE/GENERAL']);
```

**Port:** standard RPC (19001/19101); over the gateway (19002) it requires an ADMIN challenge — see §3.2

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

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
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

**Port:** standard RPC (19001 mainnet / 19101 testnet)

---

#### **depinreceivemsg**
Retrieves DePIN messages from the pool with optional pagination. If the
server has a DePIN pool key and the requester's address has a revealed
public key, the response is fully encrypted using the privacy layer.

**Signature:**
```typescript
depinreceivemsg(
  token: string,
  address: string,
  timestamp?: number,   // only messages with timestamp >= (timestamp-1)
  after_hash?: string,  // hash of last received message, "" = from beginning
  limit?: number        // max messages, 0/omitted = all
): Promise<Array<object> | object>
```

**Examples:**
```javascript
// Everything for one address
const msgs = await rpc('depinreceivemsg', ['&FRANCE', 'NXyouraddr...']);

// Paginated: 50 messages after a known hash
const page = await rpc('depinreceivemsg', [
  '&FRANCE', 'NXyouraddr...', 0, 'abcdef123...', 50,
]);
```

**Port:** standard RPC (19001/19101) and 19002 (served without auth by the gateway)  
**Node:** requires July 2026+ for `after_hash`/`limit` pagination

---

#### **depingetancestorrecipients**
Lists the active holders of a DEPIN branch: the deduplicated union of the
holders of the given token and of every one of its `/`-separated ancestors,
each with the public key revealed on chain. Active means: positive balance,
public key revealed, and not blocked by an owner freeze or self-revocation.

**Signature:**
```typescript
depingetancestorrecipients(
  token: string,
  max_results?: number,
  stop_at?: string      // ancestor at which to stop climbing
): Promise<object>
```

**Example:**
```javascript
const holders = await rpc('depingetancestorrecipients', ['&FRANCE/PARIS']);
```

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
**Node:** requires July 2026+

---

#### **depinlistsections**
Lists the hierarchical DePIN sections known to the wallet. With an address it
also reports access and per-section message counters — that mode requires the
standard RPC port (over the gateway only section names are served).

**Signature:**
```typescript
depinlistsections(address?: string): Promise<object>
```

**Example:**
```javascript
const sections = await rpc('depinlistsections', []);
const mine = await rpc('depinlistsections', ['NXyouraddr...']);
```

**Port:** standard RPC (19001/19101) (names also on 19002)  
**Node:** requires July 2026+

---

#### **depinpoolpkey**
Returns the public key of the DePIN pool address from the internal wallet
(wallet must be loaded and unlocked at node startup). Derivation paths:
mainnet `m/44'/0'/200'/0/0`, testnet `m/44'/0'/200'/1/0`.

**Signature:**
```typescript
depinpoolpkey(): Promise<{
  pubkey: string;
  address: string;
  path: string;
}>
```

**Example:**
```javascript
const poolKey = await rpc('depinpoolpkey', []);
```

**Port:** standard RPC (19001/19101) and 19002 (served without auth by the gateway)

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

**Port:** standard RPC (19001 mainnet / 19101 testnet)  
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

### 3.2 Gateway Transport and Challenge/Response Authentication

The gateway (default port 19002) speaks a **raw TCP line protocol, not HTTP**:
each connection carries exactly one request line terminated by `\n` and
receives one response line back. A request line is either a protocol command
(`PING`, `INFO`, `AUTH|...`) or a serialized JSON-RPC object.

**Protocol:**
```
Client → Server: AUTH|<token>|<address>|<mode>\n
  mode = SEND | RECEIVE | ADMIN

Server → Client: CHALLENGE|<random_challenge>|<timeout_seconds>\n

Client signs the mode-specific message with the address key:
  SEND    → "DEPIN-SEND|<token>|<address>|<challenge>"   (depinsendmsg)
  RECEIVE → "DEPIN-GET|<token>|<address>|<challenge>"
  ADMIN   → "DEPIN-CLEAR|<token>|<address>|<challenge>"  (depinclearmsg, owner only)

Client → Server (new connection): {"jsonrpc":"2.0","id":...,"method":...,"params":[...]}\n
  Challenge and signature placement depends on the method:
  - depinsendmsg:  [token, ip, message, fromaddress, (port), challenge, signature]
                   (the gateway validates and trims the last two)
  - depinclearmsg: [mode, address, challenge, signature] or
                   [mode, scope, address, challenge, signature]
  - depinreceivemsg, depinsubmitmsg, depingetmsginfo, depingetpoolcontent,
    depinpoolstats, depinmcpstatus, depinlistsections, depinpoolpkey:
                   params untouched — the gateway serves them without auth

Server → Client: JSON-RPC response line
```

Note: `depingetmsg` over the gateway is currently blocked by a node-side bug
(the gateway reads `fromaddress` from `params[3]`, where this method carries
it at index 1 or 2 and accepts at most 3 arguments). Use `depinreceivemsg`
over the gateway, or `depingetmsg` through the standard RPC port.

---

## 4. Wallet Web Implementation

> **Transport note:** the class below talks to the node's **standard HTTP RPC
> port** with Basic auth, which works from a browser and is the right choice
> for wallet web apps (for `depinsendmsg` the local node opens the TCP
> connection to the remote gateway itself). Direct access to the DePIN
> gateway (TCP 19002) is only possible from Node.js — use
> `import { getDePinRPC } from "@neuraiproject/neurai-rpc/depin"` for that.

### 4.1 Recommended DePINClient Class

```typescript
class DePINClient {
  private rpcUrl: string;
  private rpcPort: number = 19001;
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
    this.rpcPort = config.rpcPort || 19001;
    this.depinPort = config.depinPort || 19002;
    this.username = config.username;
    this.password = config.password;
  }

  // Standard RPC operations (standard RPC port)
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

  // Messaging operations (the local node opens the TCP gateway connection)
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

**Note:** Both DePIN messaging and the asset-management RPCs use the dedicated `&ASSET` DEPIN asset type — `-depinmsgtoken` must start with `&`, and DEPIN assets are currently testnet/regtest only.

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
rpcport=19001            # 19101 on testnet
rpcallowip=127.0.0.1
rpcallowip=192.168.1.0/24

# DePIN Messaging
depinmsg=1
depinmsgtoken=&FRANCE   # must start with '&' (DEPIN assets: testnet/regtest only)
depinmsgport=19002
depinmsgbind=0.0.0.0    # use 127.0.0.1 for local-only
depinmsgsize=1024       # max message size in bytes (default 1024)
depinmsgexpire=168      # message expiry in hours (default 168 = 7 days)
depinpoolsize=100       # max pool size in MB (default 100)
depinpoolpersist=0      # save/load the pool across restarts

# Asset indexes (required for DePIN holder and pubkey discovery)
assetindex=1
pubkeyindex=1

# Dedicated DePIN assets are issued separately via the standard asset RPCs
# Example on testnet: issue "&FRANCE" 1 "to_address" "change_address" 0 true

# MCP/AI Worker (optional)
depinmcp=1
depinmcpurl=http://localhost:1234        # MCP server (default http://localhost:1234)
depinmcpendpoint=/v1/chat/completions
depinmcpaddress=NXbotaddress             # required: address that signs bot responses
depinmcpkey=/ai                          # command prefix that triggers the AI
```

### 6.2 Ports to Open

In your firewall/router:
- **19001** (mainnet) / **19101** (testnet): standard RPC (only localhost or trusted IPs)
- **19002**: DePIN Messaging gateway, raw TCP (public if you want to receive messages; configurable with `-depinmsgport`)

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
  const validity = await client.checkValidity('&FRANCE', 'NXyouraddr...');
  console.log('Token validity:', validity);

  // Send message
  const result = await client.sendMessage(
    '&FRANCE',
    '192.168.1.100:19002',
    'Test message',
    'NXyouraddr...'
  );
  console.log('Message sent:', result);

  // Retrieve messages
  const messages = await client.getMessages('&FRANCE', 'NXyouraddr...');
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
debug=net      # the DePIN gateway logs under the net category
debug=mempool  # the DePIN message pool logs under mempool
debug=rpc
```

---

## 9. References

- **Repository:** https://github.com/NeuraiProject/neurai-rpc
- **Version:** 0.5.0
- **RPC Documentation:** See `neurai_methods.md`
- **DePIN source code:** `Neurai/src/rpc/messages.cpp`, `Neurai/src/rpc/assets.cpp`
- **ECIES specification:** `Neurai/src/depinecies.cpp`

---

## 10. Changelog

### v0.5.0 (August 2026)

**Library breaking change:**
- The DePIN client now speaks the gateway's real raw-TCP line protocol
  (it previously used HTTP, which the gateway never supported) and moved to
  the Node.js-only entry `@neuraiproject/neurai-rpc/depin` with a
  `{ host, port }` constructor.
- Per-method authentication: `DEPIN-SEND|`/`DEPIN-GET|`/`DEPIN-CLEAR|` sign
  formats, ADMIN challenges for `depinclearmsg`, and no auth appended to the
  gateway's unauthenticated methods.

**Documentation corrections:**
- Real Neurai ports throughout (standard RPC 19001/19101 — 8766 was
  Ravencoin's), real `-depinmsg*`/`-depinmcp*` option names in §6, `debug=net`
  instead of the nonexistent `depin` category, the obsolete `SUBMIT|` step
  replaced by the real JSON-RPC flow, and the `&` messaging-token requirement
  (DEPIN assets are testnet/regtest only in the current node).

**New commands documented:**
- `depinreceivemsg` - Pool retrieval with pagination
- `depingetancestorrecipients` - Active holders of a DEPIN branch
- `depinlistsections` - Hierarchical sections
- `depinpoolpkey` - Pool public key
- `depinclearmsg` scope parameter
- `dumpextkeypq` / `exportxpqpub` - Post-quantum wallet (see neurai_methods.md)

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
