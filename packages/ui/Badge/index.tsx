import * as React from 'react';

import { StyledBadge } from './styles';

interface Badge {
  variant?: 'outline' | 'solid';
  children: React.ReactNode;
}

export const Badge = ({ children, variant = 'solid', ...props }: Badge) => {
  return <StyledBadge {...props}>{children}</StyledBadge>;
};

export default Badge;
