# DePIN RPC 5 examples

The messaging SDK implements the binary signing contract. A generic transport call alone does not authenticate a pool reply.

```js
import {getRPC} from '@neuraiproject/neurai-rpc';
import {getDepinPoolInfo, createSoftwareIdentity, buildDepinMessageForPool,
  submitDepinMessage, requestDepinChallenge, receiveDepinMessages, callDepinRpc}
  from '@neuraiproject/neurai-depin-msg';

const rpc = {call: getRPC(user, password, endpoint)};
const pool = await getDepinPoolInfo({rpc, serviceId: endpoint, network: 'test',
  trust: storedPin ? {mode: 'pinned', pin: storedPin} : {mode: 'tofu'}});
const identity = await createSoftwareIdentity({privateKey: wif, network: 'test', address});
let context = pool.context;
const built = await buildDepinMessageForPool({rpc, context, identity, network: 'test',
  token: '&GROUP/CHAT', poolRoot: pool.info.token, maxRecipients: pool.info.maxrecipients,
  maxMessageBytes: pool.info.maxmessagesize, messageType: 'group', message: 'Hello',
  timestamp: Math.floor(Date.now()/1000)});
context = built.context;
await submitDepinMessage({rpc, context, identity, messageHex: built.hex});
const issued = await requestDepinChallenge({rpc, context, identity, token: '&GROUP/CHAT'});
const page = await receiveDepinMessages({rpc, context: issued.context, identity,
  token: '&GROUP/CHAT', challenge: issued.challenge, network: 'test', cursor: null, limit: 100});
context = page.context;
// Display only entries with ok === true and a non-null plaintext.
// Continue serially with page.cursor and page.nextChallenge.
const stats = await callDepinRpc({rpc, context, method: 'depinpoolstats'});
```

Common request fields are `protocol`, `network`, `pool_pubkey`, `pool_root`, `instance_id`, `membership_revision`, `request_id`, `timestamp_ms`, `token`, `address`, `challenge`, `args`, `signature`. Bootstrap uses only `protocol:5`, `request_id` and `timestamp_ms`.

| Method | `args` | Authentication |
| --- | --- | --- |
| `depingetmsginfo` | Bootstrap has no `args` | Public, locally bound bootstrap request |
| `depinpoolstats`, `depinmcpstatus` | `{}` | Public, root token and blank auth fields |
| `depingetancestorrecipients` | `{max_results?, stop_at?}` | Public, queried token |
| `depinchallenge` | `{type:'receive'}` or `{type:'admin'}` | Timestamped signature, empty challenge |
| `depinreceiveseq` | `{cursor:null, limit:100, from_timestamp:0}` | Receive challenge and full signature |
| `depinreceivemsg` | `{timestamp?, after_hash?, limit?}` | Receive challenge and full signature |
| `depinlistsections` | `{}` | Public/root or addressed receive challenge |
| `depinsubmitmsg` | `{encrypted:outerEciesHex}` | Timestamped signature; token stays empty outside ECIES |
| `depinclearmsg` | `{mode:'expired'}`, `{mode:'all'}` or `{mode:'hours',hours:n}` | Admin challenge and full signature |

There is no positional messaging fallback. Clock correction comes only from a verified bootstrap. A changed membership revision invalidates cached nonces; refresh recipients and renew before continuing. Keep cursors exact (`number` or `bigint`, never rounded) and preserve them across membership changes while the stream is unchanged.
