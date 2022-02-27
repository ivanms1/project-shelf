import React from 'react';
import { default as RSelect } from 'react-select';
import { FieldError } from 'react-hook-form';

import { Container, customStyles, Label } from './styles';

type Value = { value: string | number; label: string };
type Action = {
  action:
    | 'clear'
    | 'create-option'
    | 'deselect-option'
    | 'pop-value'
    | 'remove-value'
    | 'select-option'
    | 'set-value';
};

export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any, steps: Action) => void;
  isMulti?: boolean;
  error?: FieldError | undefined;
  register: any;
}

export const Select = ({ label, error, register, ...props }: SelectProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <RSelect styles={customStyles} {...register} {...props} />
      <p>{error}</p>
    </Container>
  );
};

export default Select;
