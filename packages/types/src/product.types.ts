// export interface IProduct {
//   _id: string;
//   name: string;
//   slug: string;
//   price: number;
//   discountPrice: number | null;
//   category: string;
//   stock: number;
//   rating: number;
//   images: { url: string; altText: string }[];
// }

type ID = string;
export interface IReview<TId = ID> {
  user: TId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}
