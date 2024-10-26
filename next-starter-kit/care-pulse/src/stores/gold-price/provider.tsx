import GoldPriceContext from '@/stores/gold-price/context';
import GoldPriceStore from '@/stores/gold-price/store';

import type { PropsWithChildren } from 'react';

const goldPriceStore = GoldPriceStore.create();

const GoldPriceProvider = ({ children }: PropsWithChildren) => (
  <GoldPriceContext.Provider value={goldPriceStore}>{children}</GoldPriceContext.Provider>
);
export default GoldPriceProvider;
