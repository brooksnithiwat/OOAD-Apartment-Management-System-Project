import { ChangeEvent } from 'react';

interface AuthInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  placeholder: string;
  error?: string;
  autoComplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({
  id,
  name,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
}: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border border-blue-200 rounded-lg px-3 py-2 text-sm text-dark-blue focus:outline-2 focus:outline-blue-400 focus:border-blue-600 focus:outline-offset-0"
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {error ? <p className="m-0 text-xs text-dark-blue">{error}</p> : null}
    </div>
  );
};
