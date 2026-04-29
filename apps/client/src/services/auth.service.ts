import apiClient from '../api/api-client';
import type {
  AuthResponse,
  LoginRequest,
  RegisterAdminRequest,
  RegisterRequest,
} from '../types';

export const authKeys = {
  user: ['auth', 'user'] as const,
};

export const loginService = async (payload: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const registerService = async (
  payload: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const registerAdminService = async (
  payload: RegisterAdminRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register-admin', payload);
  return response.data;
};
