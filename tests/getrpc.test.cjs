/**
 * Unit tests for the standard HTTP RPC client. fetch is mocked — the default
 * test suite never touches the network. The remote smoke test lives in
 * integration.test.cjs, gated by NEURAI_RPC_URL.
 */
const { getRPC, methods, assertRpcGenesis, TESTNET_GENESIS_HASH } = require('../dist/index.cjs');

afterEach(() => {
  delete global.fetch;
});

function mockFetchOnce(response) {
  global.fetch = jest.fn(async () => ({ ...response, text: async () => JSON.stringify(await response.json()) }));
}

describe('getRPC', () => {
  test('resolves with the RPC result and sends Basic auth', async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({ result: 123456, error: null, id: 1 }),
    });

    const rpc = getRPC('user', 'pass', 'http://127.0.0.1:19001');
    const result = await rpc(methods.getblockcount, []);
    expect(result).toBe(123456);

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('http://127.0.0.1:19001');
    expect(options.headers.Authorization).toBe('Basic ' + Buffer.from('user:pass').toString('base64'));
    const body = JSON.parse(options.body);
    expect(body.method).toBe('getblockcount');
    expect(body.params).toEqual([]);
  });

  test('rejects a JSON-RPC error even when HTTP status is 200', async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({
        result: null,
        error: { code: -8, message: 'Invalid parameter' },
        id: 1,
      }),
    });

    const rpc = getRPC('user', 'pass', 'http://127.0.0.1:19001');
    await expect(rpc(methods.getblockcount, ['bad'])).rejects.toMatchObject({
      error: { code: -8, message: 'Invalid parameter' },
      description: 'Invalid parameter',
    });
  });

  test('rejects with status details on an HTTP error response', async () => {
    mockFetchOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ error: 'unauthorized', description: 'bad creds' }),
    });

    const rpc = getRPC('user', 'wrong', 'http://127.0.0.1:19001');
    await expect(rpc(methods.getblockcount, [])).rejects.toMatchObject({
      status: 401,
      statusText: 'Unauthorized',
    });
  });

  test('rejects as ServerUnreachable when the server cannot be contacted', async () => {
    global.fetch = jest.fn(async () => {
      throw new Error('ECONNREFUSED');
    });

    const rpc = getRPC('user', 'pass', 'http://256.256.256.256:1');
    await expect(rpc(methods.getblockcount, [])).rejects.toMatchObject({
      type: 'ServerUnreachable',
    });
  });

  test('requires username, password and URL', () => {
    expect(() => getRPC('', 'pass', 'http://x')).toThrow(/Syntax error/);
    expect(() => getRPC('user', '', 'http://x')).toThrow(/Syntax error/);
    expect(() => getRPC('user', 'pass', '')).toThrow(/Syntax error/);
  });

  test('methods catalog matches the DePIN protocol 5 additions and removals', () => {
    for (const m of [
      'depinchallenge',
      'depindecrypt',
      'depinreceivemsg',
      'depingetancestorrecipients',
      'depinlistsections',
      'depinpoolpkey',
      'depinsignrpc',
      'depinreceiveseq',
      'dumpextkeypq',
      'exportxpqpub',
      'getibdstatus',
    ]) {
      expect(methods[m]).toBe(m);
    }
    expect(methods.depingetpoolcontent).toBeUndefined();
    expect(methods.depinsignrequest).toBeUndefined();
    expect(methods.depinsignchallenge).toBeUndefined();
  });
});

describe('assertRpcGenesis', () => {
  test('accepts the reset testnet genesis and rejects a previous chain', async () => {
    const rpc = jest.fn(async () => TESTNET_GENESIS_HASH);
    await expect(assertRpcGenesis(rpc, TESTNET_GENESIS_HASH)).resolves.toBeUndefined();
    expect(rpc).toHaveBeenCalledWith('getblockhash', [0]);

    rpc.mockResolvedValue('0000009697907b2aa409d4b1f10da0fa14f5a52a2e31faf3886c0444b3c85e84');
    await expect(assertRpcGenesis(rpc, TESTNET_GENESIS_HASH)).rejects.toThrow(/Unexpected genesis block/);
  });
});

test('named RPC 5 parameters and exact integers pass through unchanged', async () => {
  mockFetchOnce({ok:true,json:async()=>({result:{ok:true},error:null})});
  const rpc=getRPC('user','pass','http://127.0.0.1:19001');
  await rpc('depingetmsginfo',{request:{protocol:5,request_id:'11'.repeat(32),timestamp_ms:9007199254740993n}});
  expect(global.fetch.mock.calls[0][1].body).toContain('"timestamp_ms":9007199254740993');
  expect(global.fetch.mock.calls[0][1].body).toContain('"params":{"request":');
});

test('HTTP error data retains the node recovery reason',async()=>{
  mockFetchOnce({ok:false,status:400,statusText:'Bad Request',json:async()=>({error:{code:-32600,message:'Wrong service',data:{depin_error:'service_mismatch'}}})});
  await expect(getRPC('user','pass','http://127.0.0.1:19001')('depinchallenge',[{protocol:5}])).rejects.toMatchObject({error:{code:-32600,data:{depin_error:'service_mismatch'}}});
});

test('equal duplicate JSON fields in a DePIN response never reach the caller as a result',async()=>{
  global.fetch=jest.fn(async()=>({ok:true,text:async()=>'{"result":{"protocol":5,"protocol":5}}'}));
  await expect(getRPC('user','pass','http://127.0.0.1:19001')('depingetmsginfo',[{protocol:5}])).rejects.toMatchObject({type:'ServerUnreachable'});
});
