import * as React from 'react';

import { containerStyle, inputStyle, labelStyle } from './Input.css';

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ name, id, type = 'text', label, ...props }: Input) {
  return (
    <div className={containerStyle}>
      {!!label && (
        <label className={labelStyle} htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        className={inputStyle}
        id={id}
        name={name}
        type={type}
        {...props}
      />
    </div>
  );
}

export default Input;
