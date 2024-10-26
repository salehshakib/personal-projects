'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { GoldPriceProvider } from '@/stores/gold-price';
import { RootStoreProvider } from '@/stores/store-setup';

import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootStoreProvider>
      <GoldPriceProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </GoldPriceProvider>
    </RootStoreProvider>
  );
}
