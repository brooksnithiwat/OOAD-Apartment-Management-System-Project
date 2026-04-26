import { AuthInput } from '../components/ui/AuthInput';
import { useAuthForm } from '../hooks/useAuthForm';
import { validateRegister } from '../lib/authValidation';
import { register } from '../services/authService';
import type { RegisterFormValues } from '../types/auth';

const initialValues: RegisterFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterPage = () => {
  const { values, errors, serverMessage, isSubmitting, handleInputChange, handleSubmit } =
    useAuthForm<RegisterFormValues>({
      initialValues,
      validate: validateRegister,
      onSubmit: async (formValues) => {
        const result = await register(formValues);
        return result.message;
      },
    });

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <AuthInput
        id="register-full-name"
        name="fullName"
        label="Full name"
        value={values.fullName}
        placeholder="John Carter"
        autoComplete="name"
        error={errors.fullName}
        onChange={handleInputChange}
      />

      <AuthInput
        id="register-email"
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
        id="register-password"
        name="password"
        label="Password"
        type="password"
        value={values.password}
        placeholder="Create a strong password"
        autoComplete="new-password"
        error={errors.password}
        onChange={handleInputChange}
      />

      <AuthInput
        id="register-confirm-password"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={values.confirmPassword}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="mt-1 border-0 rounded-lg py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-dark-blue cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </button>

      {serverMessage ? <p className="mt-1 text-sm text-blue-600">{serverMessage}</p> : null}
    </form>
  );
};
