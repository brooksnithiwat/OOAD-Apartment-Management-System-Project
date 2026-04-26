export type AuthMode = 'login' | 'register';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fullName: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface LoginFormValues extends LoginCredentials {}

export interface RegisterFormValues extends RegisterData {
  confirmPassword: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
