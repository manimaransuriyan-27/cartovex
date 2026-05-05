import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Shared field rules
// ─────────────────────────────────────────────────────────────────────────────
const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .pipe(z.email({ error: 'Invalid email address' }));

const passwordField = z
  .string()
  .trim()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number');

// ─────────────────────────────────────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: emailField,
  password: z.string().trim().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Register
// ─────────────────────────────────────────────────────────────────────────────
export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Full name is required'),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().trim().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Forgot Password
// ─────────────────────────────────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
