import { IReview } from '@cartovex/types';
import mongoose, { Document } from 'mongoose';

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  images: { url: string; altText: string }[];
  category: string;
  brand: string;
  tags: string[];
  stock: number;
  sold: number;
  rating: number;
  numReviews: number;
  reviews: IReview[];
  isActive: boolean;
}

export interface IProductCreate extends Omit<
  IProduct,
  'slug' | 'rating' | 'numReviews' | 'reviews'
> {}

export interface IProductUpdate extends Partial<IProductCreate> {}

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  images: { url: string; altText: string }[];
  category: string;
  brand: string;
  tags: string[];
  stock: number;
  sold: number;
  rating: number;
  numReviews: number;
  reviews: IReview[];
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  updateRating(): void;
}
