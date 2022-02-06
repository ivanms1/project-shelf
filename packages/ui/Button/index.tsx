import * as React from "react";
import { Loader } from "../Loader";

import { StyledButton } from "./styles";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  isLoading,
  ...props
}: Button) => {
  return (
    <StyledButton variant={variant} {...props}>
      {isLoading ? <Loader /> : children}
    </StyledButton>
  );
};

export default Button;
