import '@babel/polyfill';
import {WsProvider, ApiPromise} from '@polkadot/api';
import {subscribeMessage, getNetworkConst, getNetworkProperties} from './service/setting';
import keyring from './service/keyring';
import account from './service/account';
import staking from './service/staking';
// import wc from "./service/walletconnect";
import {options} from '@reef-defi/api';
import gov from "./service/gov";
import parachain from './service/parachain';
import {genLinks} from './utils/config/config';
import {TypeRegistry} from '@polkadot/types';

// console.log will send message to MsgChannel to App
function send(path: string, data: any) {
    console.log(JSON.stringify({path, data}));
}

send('log', 'main js loaded (reef types)');
(<any>window).send = send;

/**
 * connect to a specific node.
 *
 * @param {string} nodeEndpoint
 */

/* original/default without reef types
async function connect(nodes: string[]) {
  return new Promise(async (resolve, reject) => {
    const wsProvider = new WsProvider(nodes);
    try {
      const res = await ApiPromise.create({
        provider: wsProvider,
      });
      (<any>window).api = res;
      const url = nodes[(<any>res)._options.provider.__private_9_endpointIndex];
      send("log", `${url} wss connected success`);
      resolve(url);
    } catch (err) {
      send("log", `connect failed`);
      wsProvider.disconnect();
      resolve(null);
    }
  });
}*/
async function connect(nodes: string[]) {
    return new Promise(async (resolve, reject) => {
        const provider = new WsProvider(nodes);
        try {
            const registry = new TypeRegistry();
            const apiOptions = options({
                provider,
                // registry
            });

            const res = await ApiPromise.create(apiOptions);
            send('log', '111 connecting...');
            (<any>window).api = res;
            const ePtIdx = (<any>res)._options.provider.__private_9_endpointIndex
            const url = (<any>res)._options.provider.__private_2_endpoints[ePtIdx];
            send('log', `${url} wss connected success`);
            resolve(url);
        } catch (err) {
            send('log', `connect failed err=${err.message}`);
            provider.disconnect();
            resolve(null);
        }
    });
}

const test = async () => {
    // const props = await api.rpc.system.properties();
    // send("log", props);
};

const settings = {
    test,
    connect,
    subscribeMessage,
    getNetworkConst,
    getNetworkProperties,
    // generate external links to polkascan/subscan/polkassembly...
    genLinks,
};

(<any>window).settings = settings;
(<any>window).keyring = keyring;
(<any>window).account = account;
(<any>window).staking = staking;
(<any>window).gov = gov;
(<any>window).parachain = parachain;

// walletConnect supporting is not ready.
// (<any>window).walletConnect = wc;

export default settings;
