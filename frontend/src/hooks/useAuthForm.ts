import { ChangeEvent, FormEvent, useState } from 'react';

import { FormErrors } from '../types/auth';

interface UseAuthFormOptions<T extends object> {
  initialValues: T;
  validate: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => Promise<string>;
}

interface UseAuthFormResult<T extends object> {
  values: T;
  errors: FormErrors<T>;
  serverMessage: string;
  isSubmitting: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useAuthForm = <T extends object>(
  options: UseAuthFormOptions<T>,
): UseAuthFormResult<T> => {
  const { initialValues, validate, onSubmit } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [serverMessage, setServerMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const fieldName = name as keyof T;

    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    } as T));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerMessage('');
    setIsSubmitting(true);

    try {
      const message = await onSubmit(values);
      setServerMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    serverMessage,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};
