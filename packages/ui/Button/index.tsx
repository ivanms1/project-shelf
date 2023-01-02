import * as React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

import { button } from './Button.css';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  url?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, Button>(
  ({ children, variant = 'primary', isLoading, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          button({
            variant,
          }),
          className
        )}
        {...props}
      >
        {isLoading ? <Loader /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
