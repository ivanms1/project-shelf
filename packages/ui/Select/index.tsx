import React from 'react';
import { default as RSelect } from 'react-select';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import { Container, customStyles, Label, ErrorMessage } from './styles';

type Value = { value: string | number; label: string };

export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any) => void;
  isMulti?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const Select = ({ label, error, ...props }: SelectProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      <RSelect styles={customStyles} {...props} />
      {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

export default Select;
