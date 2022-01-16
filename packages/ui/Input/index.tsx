import * as React from 'react';

import { InputHTMLAttributes } from 'react';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ name, id, type = 'text', label, ...props }: Input) {
  return (
    <div>
      {!!label && <label htmlFor={id || name}>{label}</label>}
      <input id={id} name={name} type={type} {...props} />
    </div>
  );
}

export default Input;
