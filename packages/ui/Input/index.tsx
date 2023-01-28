import classNames from 'classnames';
import * as React from 'react';

export const INPUT_CONTAINER_CLASS = 'flex flex-col relative';

export const INPUT_CLASS =
  'bg-white py-2.5 px-5 text-base rounded-[20px] border border-1 border-grey-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 placeholder-gray-400';

export const INPUT_LABEL_CLASS = 'font-semibold mb-1 text-white';

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function Input({
  name,
  id,
  type = 'text',
  label,
  containerClassName,
  ...props
}: Input) {
  return (
    <div className={classNames(INPUT_CONTAINER_CLASS, containerClassName)}>
      {!!label && (
        <label className={INPUT_LABEL_CLASS} htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        className={INPUT_CLASS}
        id={id}
        name={name}
        type={type}
        {...props}
      />
    </div>
  );
}

export default Input;
