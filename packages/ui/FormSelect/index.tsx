import React from 'react';
import { RegisterOptions, useController } from 'react-hook-form';
import Select, { SelectProps } from '../Select';

interface FormSelectProps extends Omit<SelectProps, 'onChange' | 'value'> {
  control: any;
  name: string;
  defaultValue?: { value: string | number; label: string } | null;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const FormSelect = ({
  control,
  name,
  defaultValue = null,
  rules,
  ...props
}: FormSelectProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
    rules,
  });

  return (
    <Select
      value={field.value}
      onChange={(value) => {
        field.onChange(value);
      }}
      {...props}
    />
  );
};

export default FormSelect;
