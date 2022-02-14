import * as React from 'react';

import { Loader } from '../Loader';

import { StyledButton, StyledLinkButton } from './styles';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  url?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  url,

  ...props
}: Button) => {
  return (
    <StyledButton variant={variant} {...props}>
      {isLoading ? <Loader /> : children}
    </StyledButton>
  );
};

export default Button;
