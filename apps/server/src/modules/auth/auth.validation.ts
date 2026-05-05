import { z } from 'zod';

const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .pipe(z.email({ error: 'Invalid email address' }));

const passwordField = z
  .string()
  .trim()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().trim().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof loginSchema>;
