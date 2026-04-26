import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  name = 'ApiError';

  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
  ) {
    super(message);
  }
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function post<T>(url: string, data?: unknown): Promise<T> {
  try {
    const response = await client.post<T>(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as any)?.message || error.message;
      throw new ApiError(message, error.response?.status, error.response?.data);
    }
    throw error;
  }
}

export async function get<T>(url: string): Promise<T> {
  try {
    const response = await client.get<T>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as any)?.message || error.message;
      throw new ApiError(message, error.response?.status, error.response?.data);
    }
    throw error;
  }
}
