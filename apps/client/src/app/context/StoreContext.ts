import { createContext, useContext } from 'react';
import type { RootStore } from '@/app/stores';

export const StoreContext = createContext<RootStore | null>(null);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be inside <StoreProvider>');
  return store;
};
