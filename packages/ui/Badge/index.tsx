import classNames from 'classnames';
import * as React from 'react';

import { badgeStyle } from './Bagde.css';

interface Badge {
  variant?: keyof typeof badgeStyle;
  className?: string;
  children: React.ReactNode;
}

export const Badge = ({
  children,
  variant = 'solid',
  className,
  ...props
}: Badge) => {
  return (
    <button className={classNames(badgeStyle[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Badge;
