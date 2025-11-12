// Test real connection to local Neurai node and getpubkey RPC method

import { methods, getRPC } from './dist/index.mjs';

console.log('=== Testing getpubkey RPC Method ===\n');

// Configuration for local node
const username = '123';
const password = '123';
const url = 'http://127.0.0.1:19001';

// Get address from command line argument
const testAddress = process.argv[2];

console.log('Connecting to:', url);
console.log('Username:', username);
console.log('');

// Initialize RPC connection
const rpc = getRPC(username, password, url);

// First, test basic connection with getblockcount
console.log('1. Testing basic connection with getblockcount...');
try {
    const blockCount = await rpc('getblockcount', []);
    console.log('✓ Connection successful!');
    console.log('  Current block count:', blockCount);
    console.log('');
} catch (error) {
    console.log('✗ Connection failed!');
    console.log('  Error:', error.error ? error.error.message : error.message);
    console.log('');
    console.log('Please verify:');
    console.log('  1. Neurai node is running');
    console.log('  2. RPC server is enabled');
    console.log('  3. Username and password are correct in neurai.conf');
    console.log('  4. rpcallowip is configured (e.g., rpcallowip=127.0.0.1)');
    process.exit(1);
}

// Test getpubkey method
console.log('2. Testing getpubkey method...');
console.log('');

if (testAddress) {
    // Test with provided address
    console.log(`  Testing address: ${testAddress}`);
    
    try {
        const result = await rpc('getpubkey', [testAddress]);
        
        console.log('  ✓ Success!');
        console.log('  - Address:', result.address);
        console.log('  - Revealed:', result.revealed);
        
        if (result.revealed) {
            console.log('  - Public Key:', result.pubkey);
            console.log('  - Height:', result.height);
            console.log('  - TxID:', result.txid);
        } else {
            console.log('  - Note: This address has not spent funds yet');
            console.log('         Public key will be revealed after first spend');
        }
        console.log('');
        
    } catch (error) {
        if (error.error && error.error.message) {
            if (error.error.message.includes('Pubkey index not enabled')) {
                console.log('  ✗ Error: Pubkey index not enabled');
                console.log('    Add "pubkeyindex=1" to your neurai.conf and restart the node');
                console.log('    Then reindex with: neurai-cli -reindex');
            } else if (error.error.message.includes('Invalid address')) {
                console.log('  ✗ Error: Invalid address');
                console.log('    Please provide a valid Neurai address');
            } else {
                console.log('  ✗ Error:', error.error.message);
            }
        } else {
            console.log('  ✗ Error:', error.message || error);
        }
        console.log('');
    }
} else {
    // Test with addresses from wallet
    console.log('  No address provided, checking wallet addresses...');
    console.log('');
    
    try {
        const addresses = await rpc('listreceivedbyaddress', [0, true]);
        
        if (addresses.length === 0) {
            console.log('  No addresses found in wallet.');
            console.log('  Generate a new address with: neurai-cli getnewaddress');
            console.log('  Or provide an address: node test-getpubkey.js <address>');
            console.log('');
        } else {
            console.log(`  Found ${addresses.length} addresses in wallet`);
            console.log('  Testing first 3 addresses...');
            console.log('');
            
            const testAddresses = addresses.slice(0, 3);
            
            for (const addrInfo of testAddresses) {
                const address = addrInfo.address;
                console.log(`  Testing address: ${address}`);
                
                try {
                    const result = await rpc('getpubkey', [address]);
                    
                    console.log('    ✓ Success!');
                    console.log('    - Revealed:', result.revealed);
                    
                    if (result.revealed) {
                        console.log('    - Public Key:', result.pubkey);
                        console.log('    - Height:', result.height);
                        console.log('    - TxID:', result.txid);
                    } else {
                        console.log('    - Note: This address has not spent funds yet');
                        console.log('           Public key will be revealed after first spend');
                    }
                    console.log('');
                    
                } catch (error) {
                    if (error.error && error.error.message) {
                        if (error.error.message.includes('Pubkey index not enabled')) {
                            console.log('    ✗ Error: Pubkey index not enabled');
                            console.log('      Add "pubkeyindex=1" to your neurai.conf and restart the node');
                            console.log('      Then reindex with: neurai-cli -reindex');
                            break;
                        } else {
                            console.log('    ✗ Error:', error.error.message);
                        }
                    } else {
                        console.log('    ✗ Error:', error.message || error);
                    }
                    console.log('');
                }
            }
        }
    } catch (error) {
        console.log('  Error getting addresses:', error.error ? error.error.message : error.message);
        console.log('');
    }
}

console.log('=== Test Complete ===');
console.log('');
console.log('Usage: node test-getpubkey.js [address]');
console.log('Example: node test-getpubkey.js NTVDv81nvwEKpCqhrNwjypTEKMYdpiDKKV');
