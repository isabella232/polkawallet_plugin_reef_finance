import "@babel/polyfill";
import { WsProvider, ApiPromise } from "@polkadot/api";
import { subscribeMessage, getNetworkConst, getNetworkProperties } from "./service/setting";
import keyring from "./service/keyring";
import account from "./service/account";
import staking from "./service/staking";
import reef from "./service/reef";
import gov from "./service/gov";
import { genLinks } from "./utils/config/config";
import { TypeRegistry } from '@polkadot/types';
import { options } from '@reef-defi/api';

// send message to JSChannel: PolkaWallet
/* function send(path: string, data: any) {
  if (window.location.href === "about:blank") {
    PolkaWallet.postMessage(JSON.stringify({ path, data }));
  } else {
    console.log(path, data);
  }
} */

function send(path: string, data: any) {
  console.log(JSON.stringify({ path, data }));
}
send("log", "js_api main js loaded");
(<any>window).send = send;

/**
 * connect to a specific node.
 *
 * @param {string} nodeEndpoint
 */
async function connect(nodes: string[]) {
  return new Promise(async (resolve, reject) => {
    const provider = new WsProvider(nodes);
    try {
      const registry = new TypeRegistry();
      const apiOptions = options({
            provider,
            registry
          });

      const res = await ApiPromise.create(apiOptions);
      send('log', 'connecting...');
      (<any>window).api = res;
      const ePtIdx=(<any>res)._options.provider.__private_9_endpointIndex
      const url = (<any>res)._options.provider.__private_2_endpoints[ePtIdx];
      send("log", `${url} wss connected success`);
      resolve(url);
    } catch (err) {
      send("log", `connect failed err=${err.message}`);
      provider.disconnect();
      resolve(null);
    }
  });
}

const test = async () => {
  const props = await (<any>window).api.rpc.system.properties();
  send("log", props);
  return null;
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

// send("REMOVE DEBUG auto connect()")
// connect(['wss://rpc-testnet.reefscan.com/ws'])
(<any>window).settings = settings;
(<any>window).keyring = keyring;
(<any>window).account = account;
(<any>window).staking = staking;
(<any>window).reef = reef;
(<any>window).gov = gov;
export default settings;
