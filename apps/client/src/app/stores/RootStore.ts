import { AuthStore } from '@/features/auth';
import { CartStore } from '@/features/cart';
import { makeAutoObservable } from 'mobx';

export class RootStore {
  auth: AuthStore;
  cart: CartStore;

  constructor() {
    this.auth = new AuthStore(this);
    this.cart = new CartStore(this);
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
export type TRootStore = typeof rootStore;

// export class RootStore {
//   theme: Theme = 'light';
//   auth: AuthStore;
//   cart: CartStore;
//   //   catalog: CatalogStore;
//   //   checkout: CheckoutStore;
//   constructor() {
//     this.auth = new AuthStore(this);
//     this.cart = new CartStore(this);
//     // this.catalog = new CatalogStore(this)
//     // this.checkout = new CheckoutStore(this)
//     // pass this for cross-store refs
//   }
// }
