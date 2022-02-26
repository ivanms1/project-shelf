import React from 'react';
import { default as RSelect } from 'react-select';

import { Container, customStyles, Label } from './styles';

type Value = { value: string | number; label: string };
type OptionType = { string: any };
type OptionsType = Array<OptionType>;

type ValueType = OptionType | OptionsType | null | void;
export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any) => void;
  isMulti?: boolean;
  isLimited: boolean;
}

export const Select = ({ label, isLimited, ...props }: SelectProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <RSelect styles={customStyles} isDisabled={isLimited} {...props} />
    </Container>
  );
};

export default Select;
