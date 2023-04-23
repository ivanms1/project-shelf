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
          'px-2 py-2 hover:bg-gray-200  hover:ease-in rounded-sm cursor-pointer flex flex-row gap-5 items-center',
          {
            'bg-gray-200': selected,
          }
        )}
        {...props}
      >
        {icon && <span>{icon ?? 'icon'}</span>}
        <span className='text-sm text-gray-700 font-medium'>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
