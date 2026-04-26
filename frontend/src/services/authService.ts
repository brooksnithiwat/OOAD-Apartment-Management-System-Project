import * as api from './api';
import type { ApiError } from './api';
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  LoginFormValues,
  RegisterFormValues,
} from '@/types/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as ApiError).name === 'ApiError'
  );
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/register', data);
    return response;
  } catch (error) {
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Registration failed. Please try again.');
  }
}

/**
 * Login user with credentials
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', credentials);
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }
    if (response.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
    return response;
  } catch (error) {
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Login failed. Please try again.');
  }
}

/**
 * Get stored auth token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user data
 */
export function getUser(): User | null {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/**
 * Clear auth data from localStorage
 */
export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
