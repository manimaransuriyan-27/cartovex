import { z } from 'zod';
import { ProductStatus } from '@/types';

// --- Schemas ---
export const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  category: z.string(),
  images: z.array(z.string().url()).optional(),
  status: z.nativeEnum(ProductStatus).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  category: z.string().optional(),
  status: z.nativeEnum(ProductStatus).optional(),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// --- DTO types inferred from schemas ---
export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
