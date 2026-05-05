import { StoreContext } from '@/app/context/StoreContext';
import { rootStore } from '@/app/stores/RootStore';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};
