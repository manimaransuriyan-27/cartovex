import mongoose, { Schema, Document } from 'mongoose';
import { ProductStatus } from '@/types';

// The interface for a product document from the DB
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.DRAFT,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
