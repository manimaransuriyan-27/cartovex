import { useStore } from '@/app/context/StoreContext';

export const useAuthStore = () => useStore().auth;
