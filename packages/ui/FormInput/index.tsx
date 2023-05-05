import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import {
  INPUT_CLASS,
  INPUT_CONTAINER_CLASS,
  INPUT_LABEL_CLASS,
} from '../Input';

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  round?: boolean;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  wrapperStyles?: string;
}

export function FormInput({
  name,
  id,
  type = 'text',
  label,
  register,
  error,
  ...props
}: FormInput) {
  return (
    <div className={INPUT_CONTAINER_CLASS}>
      {!!label && (
        <label className={INPUT_LABEL_CLASS} htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        className={INPUT_CLASS}
        error={error}
        id={id}
        name={name}
        type={type}
        {...register}
        {...props}
      />
      {error?.message && (
        <div className='r-0 absolute bottom-[-20px] text-sm text-red-400'>
          {error?.message.toString()}
        </div>
      )}
    </div>
  );
}

export default FormInput;
