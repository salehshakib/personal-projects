import { types } from 'mobx-state-tree';

import { wsAPIKey, wsServer } from '@/api';

import type { Data } from '@/stores/gold-price/types';
import type { Instance } from 'mobx-state-tree';

const GoldPriceStore = types
  .model('GoldPriceStore', {
    k22Price: 0,
    k23Price: 0,
    k24Price: 0,
    askPrice: 0,
    bidPrice: 0,
    max: 0,
    min: 0,
    key: '',
    status: types.optional(
      types.union(
        types.literal('connecting'),
        types.literal('connected'),
        types.literal('error'),
        types.literal('closed'),
        types.literal('suspended'),
        types.literal('maxRetriesReached')
      ),
      'connecting'
    ),
  })
  .actions((self) => ({
    handleWsOpen() {
      self.status = 'connecting';
    },
    handleWsMessage(e: MessageEvent) {
      self.status = 'connected';
      try {
        const data: Data = JSON.parse(e.data);
        self.k22Price = data.priceGram22k;
        self.k23Price = data.priceGram23k;
        self.k24Price = data.priceGram24k;
        self.askPrice = Number(data.askPrice.toFixed(2));
        self.bidPrice = Number(data.bidPrice.toFixed(2));
        self.min = data.lowPrice;
        self.max = data.highPrice;
        self.key = data.key;
      } catch (err) {
        console.error(err);
      }
    },
    handleWsError(e: Event) {
      self.status = 'error';
      console.error('WebSocket error', e);
    },
    handleWsClose(e: CloseEvent) {
      console.log('WebSocket closed', e);
    },
    handleMaxRetriesReached() {
      self.status = 'maxRetriesReached';
    },
  }))
  .actions((self) => {
    let ws: WebSocket | null = null;

    const maxRetry = 5000;

    let retry = 0;
    const delay = 2000;

    const resetRetries = () => {
      retry = 0;
    };

    return {
      connect(freshStart: boolean = false) {
        if (freshStart) {
          resetRetries();
        }

        ws = new WebSocket(`${wsServer}/${wsAPIKey}`);

        ws.onopen = () => {
          self.handleWsOpen();
          resetRetries();
        };

        ws.onmessage = self.handleWsMessage;
        ws.onclose = self.handleWsClose;

        ws.onerror = (e) => {
          self.handleWsError(e);

          if (retry < maxRetry) {
            retry++;
            setTimeout(() => {
              console.log(`Retrying connection attempt ${retry} at ${delay}ms`);
              this.connect();
            }, delay);
          } else {
            self.handleMaxRetriesReached();
            console.error('Max retries reached');
          }
        };
      },
      suspend() {
        if (ws) {
          ws.close();
          self.status = 'suspended';
        }
      },
      close() {
        if (ws) {
          ws.close();
          self.status = 'closed';
          resetRetries();
        }
      },
    };
  })
  .actions((self) => ({
    afterCreate() {
      self.connect();
      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            self.connect(true);
          } else {
            self.suspend();
          }
        });
      }
    },
  }))
  .views((self) => ({
    get isConnected() {
      return self.status === 'connected';
    },
    get isNotConnected() {
      return self.status !== 'connected';
    },
    get isSuspensed() {
      return self.status === 'suspended';
    },
    get isMaxRetriesReached() {
      return self.status === 'maxRetriesReached';
    },
  }));

export default GoldPriceStore;

export type GoldPriceStoreType = Instance<typeof GoldPriceStore>;
