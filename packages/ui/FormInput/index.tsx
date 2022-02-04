import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { Container, Label, StyledInput } from '../Input/styles';

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
    <Container>
      {!!label && <Label htmlFor={id || name}>{label}</Label>}
      <StyledInput id={id} name={name} type={type} {...register} {...props} />
    </Container>
  );
}

export default FormInput;
