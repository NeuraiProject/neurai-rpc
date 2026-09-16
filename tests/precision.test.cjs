const { getRPC } = require('../dist/index.cjs');
afterEach(() => { delete global.fetch; });
test('preserves unsafe integer and decimal tokens while keeping safe fields numeric', async () => {
 global.fetch=jest.fn(async()=>({ok:true,text:async()=>' {"result":{"satoshis":9007199254740993,"amount":100000000.00000001,"height":100,"fee":0.01},"error":null} ',json:async()=>({result:{satoshis:9007199254740993,amount:100000000.00000001,height:100,fee:0.01}})}));
 const result=await getRPC('u','p','http://localhost')('getaddressutxos',[]);
 expect(result).toEqual({satoshis:'9007199254740993',amount:'100000000.00000001',height:100,fee:0.01});
});
const { rpcNumber, parseRpcJson, stringifyRpcJson } = require('../dist/index.cjs');
test('serializes exact decimal parameters and bigint without changing strings', async () => {
 global.fetch=jest.fn(async()=>({ok:true,text:async()=>' {"result":true,"error":null} '}));
 await getRPC('u','p','http://localhost')('example',[rpcNumber('100000000.00000001'),9007199254740993n,'9007199254740993']);
 const body=global.fetch.mock.calls[0][1].body;
 expect(body).toContain('[100000000.00000001,9007199254740993,"9007199254740993"]');
});
test.each([NaN,Infinity,9007199254740992])('rejects already unsafe numeric parameter %s', n => {
 expect(()=>stringifyRpcJson({params:[n]})).toThrow(/Unsafe/);
});
test('preserves escaped strings, signed deltas, nested decimals and exponent tokens', () => {
 const x=parseRpcJson('{"s":"123\\\"456","delta":-9007199254740993,"nested":[1e30,1.0000000000000000001],"id":1}');
 expect(x).toEqual({s:'123"456',delta:'-9007199254740993',nested:['1e30','1.0000000000000000001'],id:1});
 expect(()=>parseRpcJson('{"a":1,"a":2}')).toThrow();
 expect(()=>rpcNumber('1],"bad":true')).toThrow();
});
test('malformed response rejects instead of hanging', async () => {
 global.fetch=jest.fn(async()=>({ok:true,text:async()=>'{'}));
 await expect(getRPC('u','p','http://localhost')('example',[])).rejects.toBeDefined();
});
