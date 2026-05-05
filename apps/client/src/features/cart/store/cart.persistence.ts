import { autorun } from 'mobx';
import { rootStore } from '@/app/stores/RootStore';
import type { CartItem } from '@/shared/types';

autorun(() => {
  sessionStorage.setItem('guest_cart', JSON.stringify(rootStore.cart.items));
});

export function loadGuestCart() {
  const saved = sessionStorage.getItem('guest_cart');
  if (saved) {
    JSON.parse(saved).forEach((item: CartItem) => rootStore.cart.addItem(item));
  }
}
