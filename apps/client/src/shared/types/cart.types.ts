export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}
export interface Coupon {
  code: string;
  discount: number;
  type: 'flat' | 'percent';
}
