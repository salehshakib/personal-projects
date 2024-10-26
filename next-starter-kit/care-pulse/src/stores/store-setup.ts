import createPersistentStore from 'mst-persistent-store';
import defaultStorage from 'mst-persistent-store/dist/storage';

import RootStore from '@/stores/root-store';

export const [RootStoreProvider, useRootStore] = createPersistentStore(
  RootStore,
  defaultStorage,
  {},
  {
    hydrated: false,
  }
);
