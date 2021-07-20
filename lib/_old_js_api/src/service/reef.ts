import {timer, fromPromise} from "rxjs"
import {switchMap} from "rxjs/operators"
import axios from "axios"

async function subscribePrice( msgChannel: string) {
(<any>window).send('log', {msg:'js get price'});
  const s = timer(0, 5000).pipe(
  switchMap(()=>axios.get('https://api.coingecko.com/api/v3/simple/price?ids=reef-finance&vs_currencies=USD'))
  ).subscribe((data: any) => {
    /*(<any>window).send('log', {msg:'response from price fetch', data:{tokenId: 'REEF',
        value: data.data['reef-finance'].usd,
        timestamp: (new Date()).getTime()
      }})*/
    (<any>window).send('log', {msg:'got price'});
    (<any>window).send(msgChannel, [{tokenId: 'REEF',
                                    value: data.data['reef-finance'].usd.toString(),
                                    timestamp: (new Date()).getTime()
                                    }]);
  });
  const unsubFuncName = `unsub${msgChannel}`;
  window[unsubFuncName] = s.unsubscribe;
  return {};
}

export default {
    subscribePrice
}
