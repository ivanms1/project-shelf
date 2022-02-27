import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { default as RSelect } from 'react-select';
import { FieldError } from 'react-hook-form';

import { Container, customStyles, Label } from './styles';
import 'react-toastify/dist/ReactToastify.css';

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
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <RSelect styles={customStyles} {...register} {...props} />
      <ToastContainer />
    </Container>
  );
};

export default Select;
