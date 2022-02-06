import React from "react";
import { default as RSelect } from "react-select";

import { Container, customStyles, Label } from "./styles";

type Value = { value: string | number; label: string };

export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any) => void;
  isMulti?: boolean;
}

export const Select = ({ label, ...props }: SelectProps) => (
  <Container>
    {label && <Label>{label}</Label>}
    <RSelect styles={customStyles} {...props} />
  </Container>
);

export default Select;
