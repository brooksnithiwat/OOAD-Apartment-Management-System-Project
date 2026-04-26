import { authConfig } from '../config/authConfig';
import { FormErrors, LoginFormValues, RegisterFormValues } from '../types/auth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (values: LoginFormValues): FormErrors<LoginFormValues> => {
  const errors: FormErrors<LoginFormValues> = {};

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < authConfig.minimumPasswordLength) {
    errors.password = `Password must be at least ${authConfig.minimumPasswordLength} characters.`;
  }

  return errors;
};

export const validateRegister = (
  values: RegisterFormValues,
): FormErrors<RegisterFormValues> => {
  const errors: FormErrors<RegisterFormValues> = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  const loginErrors = validateLogin(values);

  if (loginErrors.email) {
    errors.email = loginErrors.email;
  }

  if (loginErrors.password) {
    errors.password = loginErrors.password;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};
