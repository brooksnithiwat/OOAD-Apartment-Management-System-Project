import * as api from './api';
import type { ApiError } from './api';

export type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
};

export type CreateUserPayload = {
  email: string;
  name?: string;
};

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as ApiError).name === 'ApiError'
  );
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>('/api/v1/users');
    return response;
  } catch (error) {
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch users.');
  }
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  try {
    const response = await api.post<User>('/api/v1/users', payload);
    return response;
  } catch (error) {
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create user.');
  }
}
