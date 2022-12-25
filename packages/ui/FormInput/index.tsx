import * as React from 'react';
import { InputHTMLAttributes } from 'react';

import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { containerStyle, inputStyle, labelStyle } from '../Input/Input.css';
import { errorMessageStyle } from '../Select/Select.css';

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
    <div className={containerStyle}>
      {!!label && (
        <label className={labelStyle} htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        className={inputStyle}
        error={error}
        id={id}
        name={name}
        type={type}
        {...register}
        {...props}
      />
      {error?.message && (
        <div className={errorMessageStyle}>{error?.message}</div>
      )}
    </div>
  );
}

export default FormInput;
