import React, { InputHTMLAttributes } from 'react';

import { Label, Container } from '../Input/styles';
import { StyledTextArea } from './style';

interface FormTextarea extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  label?: string;
  id?: string;
}

export const FormTextArea = ({
  label,
  id,
  name,
  register,
  ...props
}: FormTextarea) => {
  return (
    <Container>
      {!!label && <Label htmlFor={id || name}>{label}</Label>}
      <StyledTextArea
        id={id}
        name={name}
        {...register}
        {...props}
      ></StyledTextArea>
    </Container>
  );
};
