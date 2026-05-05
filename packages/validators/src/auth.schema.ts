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

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .trim(),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().trim().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerAdminSchema = registerSchema.extend({
  secretKey: z.string().trim().min(1, 'Secret key is required'),
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const refreshSchema = z.object({
  refreshToken: z.string().trim().min(1, 'Refresh token is required'),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type RegisterAdminDto = z.infer<typeof registerAdminSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type RefreshDto = z.infer<typeof refreshSchema>;
