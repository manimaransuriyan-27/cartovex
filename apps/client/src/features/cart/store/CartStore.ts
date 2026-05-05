import type { RootStore } from '@/app/stores/RootStore';
import type { CartItem, Coupon } from '@/shared/types';
import { makeAutoObservable } from 'mobx';
import { loadGuestCart } from './cart.persistence';

export class CartStore {
  root: RootStore;
  items: CartItem[] = [];
  coupon: Coupon | null = null;

  constructor(_root: RootStore) {
    this.root = _root;
    makeAutoObservable(this);
    loadGuestCart();
  }

  get count(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get discount(): number {
    if (!this.coupon) return 0;
    return this.coupon.type === 'flat'
      ? this.coupon.discount
      : Math.round((this.subtotal * this.coupon.discount) / 100);
  }

  get total(): number {
    return Math.max(0, this.subtotal - this.discount);
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  addItem(item: CartItem) {
    const existing = this.items.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + item.quantity, item.stock);
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter((i) => i.productId !== productId);
  }

  updateQuantity(productId: string, qty: number) {
    const item = this.items.find((i) => i.productId === productId);
    if (item) item.quantity = Math.max(1, Math.min(qty, item.stock));
  }

  applyCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  removeCoupon() {
    this.coupon = null;
  }

  mergeGuestCart() {}

  clear() {
    this.items = [];
    this.coupon = null;
    sessionStorage.removeItem('guest_cart');
  }
}
