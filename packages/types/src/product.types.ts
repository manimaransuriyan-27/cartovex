export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  category: string;
  stock: number;
  rating: number;
  images: { url: string; altText: string }[];
}
