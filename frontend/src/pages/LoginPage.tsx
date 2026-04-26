import { AuthInput } from '../components/ui/AuthInput';
import { useAuthForm } from '../hooks/useAuthForm';
import { validateLogin } from '../lib/authValidation';
import { login } from '../services/authService';
import type { LoginFormValues } from '../types/auth';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { values, errors, serverMessage, isSubmitting, handleInputChange, handleSubmit } =
    useAuthForm<LoginFormValues>({
      initialValues,
      validate: validateLogin,
      onSubmit: async (formValues) => {
        const result = await login(formValues);
        return result.message;
      },
    });

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <AuthInput
        id="login-email"
        name="email"
        label="Email"
        type="email"
        value={values.email}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
        onChange={handleInputChange}
      />

      <AuthInput
        id="login-password"
        name="password"
        label="Password"
        type="password"
        value={values.password}
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="mt-1 border-0 rounded-lg py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-dark-blue cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      {serverMessage ? <p className="mt-1 text-sm text-blue-600">{serverMessage}</p> : null}
    </form>
  );
};
