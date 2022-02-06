import * as React from "react";

import { InputHTMLAttributes } from "react";
import { Container, Label, StyledInput } from "./styles";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ name, id, type = "text", label, ...props }: Input) {
  return (
    <Container>
      {!!label && <Label htmlFor={id || name}>{label}</Label>}
      <StyledInput id={id} name={name} type={type} {...props} />
    </Container>
  );
}

export default Input;
