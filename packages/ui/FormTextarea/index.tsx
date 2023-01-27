import * as React from 'react';
import classNames from 'classnames';

import {
  INPUT_CLASS,
  INPUT_CONTAINER_CLASS,
  INPUT_LABEL_CLASS,
} from '../Input';

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
    <div className={INPUT_CONTAINER_CLASS}>
      {!!label && (
        <label className={INPUT_LABEL_CLASS} htmlFor={id || name}>
          {label}
        </label>
      )}
      <textarea
        className={classNames(INPUT_CLASS, 'h-36', className)}
        id={id}
        name={name}
        {...register}
        {...props}
      />
    </div>
  );
};
