import { createContext } from 'react';

import type { GoldPriceStoreType } from '@/stores/gold-price/store';

const GoldPriceContext = createContext<GoldPriceStoreType | null>(null);

export default GoldPriceContext;
