import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().default(5005),
  CLIENT_URL: z.string().url(),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ADMIN_REGISTRATION_SECRET: z.string().min(10),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES: z.string().default('7d'),
  MAILTRAP_HOST: z.string().min(1),
  MAILTRAP_PORT: z.coerce.number(),
  MAILTRAP_USER: z.string().min(1),
  MAILTRAP_PASS: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  console.error(parsed.error);
  process.exit(1);
}

export const env = parsed.data;
