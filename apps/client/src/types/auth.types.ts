import type { IUser } from '@cartovex/types';

export interface AuthResponse extends IUser<string> {
  token: string;
  success: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterAdminRequest extends RegisterRequest {
  secretKey: string;
}
