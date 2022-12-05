import * as React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

import { button } from './styles.css';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof button;
  isLoading?: boolean;
  url?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className,
  ...props
}: Button) => {
  return (
    <button className={classNames(button[variant], className)} {...props}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
