import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { Container, Label, StyledInput } from '../Input/styles';
import { ErrorMessage } from '../Select/styles';

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
  error,
  ...props
}: FormInput) {
  return (
    <Container>
      {!!label && <Label htmlFor={id || name}>{label}</Label>}
      <StyledInput
        error={error}
        id={id}
        name={name}
        type={type}
        {...register}
        {...props}
      />
      {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
    </Container>
  );
}

export default FormInput;
