import React from 'react';
import { RegisterOptions, useController, useForm } from 'react-hook-form';
import Select, { SelectProps } from '../Select';

interface FormSelectProps
  extends Omit<SelectProps, 'onChange' | 'value' | 'error'> {
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

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  return (
    <Select
      error={errors?.valueLength?.message}
      value={field.value}
      onChange={(value, steps) => {
        if (field?.value?.length > 4) {
          if (steps.action === 'select-option') {
            setError('valueLength', {
              type: 'custom',
              message: 'Please select no more than 5 items',
            });
          } else {
            clearErrors('valueLength');
            return field.onChange(value);
          }
        } else {
          return field.onChange(value);
        }
      }}
      {...props}
    />
  );
};

export default FormSelect;
