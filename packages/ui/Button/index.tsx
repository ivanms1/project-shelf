import * as React from 'react';

interface Button
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'secondary' | 'ghost' | 'grey';
}

export function Button({ children, variant, ...props }: Button) {
  return <button {...props}>{children}</button>;
}

export default Button;
