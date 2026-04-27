import type { IProduct } from './product.types';

export interface ICartItem {
  _id: string;
  product: IProduct['_id'];
  name: string;
  image: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalQty: number;
  totalPrice: number;
  finalPrice: number;
}
