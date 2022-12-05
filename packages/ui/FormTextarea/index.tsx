import * as React from 'react';
import classNames from 'classnames';

import { containerStyle, labelStyle } from '../Input/Input.css';

import { formTextArea } from './FormTextarea.css';

interface FormTextarea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  label?: string;
  id?: string;
}

export const FormTextArea = ({
  label,
  id,
  name,
  register,
  className,
  ...props
}: FormTextarea) => {
  return (
    <div className={containerStyle}>
      {!!label && (
        <label className={labelStyle} htmlFor={id || name}>
          {label}
        </label>
      )}
      <textarea
        className={classNames(formTextArea, className)}
        id={id}
        name={name}
        {...register}
        {...props}
      ></textarea>
    </div>
  );
};
