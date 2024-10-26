import { useContext } from 'react';

import GoldPriceContext from '@/stores/gold-price/context';

const useGoldPrice = () => {
  const store = useContext(GoldPriceContext);

  if (!store) {
    throw new Error('useGoldPrice must be used within a GoldPriceProvider');
  }

  return store;
};

export default useGoldPrice;
