import * as React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  url?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, Button>(
  (
    {
      children,
      variant = 'primary',
      isLoading,
      size = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    if (variant === 'ghost') {
      return (
        <button ref={ref} className={className} {...props}>
          {isLoading ? <Loader /> : children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={classNames(
          'px-12 font-semibold rounded-[20px] disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0.5',
          BUTTON_SIZES[size],
          BUTON_VARIANTS[variant],
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

const BUTON_VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
};

const BUTTON_SIZES = {
  small: 'text-base py-3',
  medium: 'text-base py-[18px]',
  large: 'text-[22px] py-[22px]',
};

export default Button;
