import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { RegisterOptions, useController, FieldError } from 'react-hook-form';
import Select, { SelectProps } from '../Select';

import 'react-toastify/dist/ReactToastify.css';

interface FormSelectProps
  extends Omit<SelectProps, 'onChange' | 'value' | 'error'> {
  control: any;
  name: string;
  defaultValue?: { value: string | number; label: string } | null;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  error?: FieldError | undefined;
  register: Omit<Partial<RegisterOptions>, 'pattern'>;
}

export const FormSelect = ({
  control,
  name,
  defaultValue = null,
  rules,
  error,
  register,
  ...props
}: FormSelectProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
    rules,
  });

  useEffect(() => {
    if (error) {
      toast(error?.message);
    }
  }, [error]);

  return (
    <div>
      <Select
        value={field.value}
        onChange={(value) => {
          return field.onChange(value);
        }}
        {...props}
      />
      {error && <ToastContainer />}
    </div>
  );
};

export default FormSelect;
