import * as React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  url?: string;
  noAnimation?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, Button>(
  (
    {
      children,
      variant = 'primary',
      isLoading,
      size = 'medium',
      className,
      onClick,
      noAnimation,
      ...props
    },
    ref
  ) => {
    if (variant === 'ghost') {
      return (
        <button ref={ref} className={className} onClick={onClick} {...props}>
          {isLoading ? <Loader className='m-auto' /> : children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={classNames(
          'rounded-[20px] px-12 font-semibold disabled:cursor-not-allowed disabled:opacity-50',
          BUTTON_SIZES[size],
          BUTON_VARIANTS[variant],
          { 'active:translate-y-0.5': !noAnimation },
          className
        )}
        {...props}
        onClick={isLoading ? undefined : onClick}
      >
        {isLoading ? <Loader className='m-auto' /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

const BUTON_VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  outlined: 'text-white border border-primary border-2 bg-transparent ',
};

const BUTTON_SIZES = {
  small: 'text-base py-3',
  medium: 'text-base py-[18px]',
  large: 'text-[22px] py-[22px]',
};

export default Button;
