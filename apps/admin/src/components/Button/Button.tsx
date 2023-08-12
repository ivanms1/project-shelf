import React from 'react';
import classNames from 'classnames';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Button>(
  ({ children, icon, onClick, selected, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={classNames(
          'flex cursor-pointer flex-row  items-center gap-5 rounded-sm px-2 py-2 hover:bg-gray-200 hover:ease-in',
          {
            'bg-gray-200': selected,
          }
        )}
        {...props}
      >
        {icon && <span>{icon ?? 'icon'}</span>}
        <span className='text-sm font-medium text-gray-700'>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
