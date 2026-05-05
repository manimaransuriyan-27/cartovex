import { RootStore } from '@/app/stores';
import { User } from '@/shared/types';
import { makeAutoObservable } from 'mobx';

export class AuthStore {
  user: User | null = null;
  isInitializing = true; // Blocks renders until boot session check completes

  root: RootStore;
  constructor(_root: RootStore) {
    makeAutoObservable(this);
    this.root = _root;
  }

  // ── Computed ─────────────────────────────────────────────────────────────
  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Called after successful login or on boot if session is valid */
  setSession(user: User) {
    this.user = user;
    this.isInitializing = false;
  }

  /** Called on logout or when refresh token expires */
  clearSession() {
    this.user = null;
    this.isInitializing = false;
    // Clear guest cart from session storage on logout
    // this.root.cart.clearCart()
    // this.root.wishlist.clear()
  }

  /** Called once on app boot — resolves isInitializing */
  finishInitializing() {
    this.isInitializing = false;
  }
}
