import * as React from 'react';

import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
  wrapperStyles?: string;
}

export function FormInput({
  name,
  id,
  type = 'text',
  label,
  register,
  ...props
}: FormInput) {
  return (
    <div>
      {!!label && <label htmlFor={id || name}>{label}</label>}
      <input id={id} name={name} type={type} {...register} {...props} />
    </div>
  );
}

export default FormInput;
