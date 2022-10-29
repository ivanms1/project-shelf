import React from 'react';

import { StyledBadge } from './styles';

interface Badge {
  variant?: 'outline' | 'solid';
  children: React.ReactNode;
}

export const Badge = ({ children, variant = 'solid', ...props }: Badge) => {
  return (
    <StyledBadge variant={variant} {...props}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
