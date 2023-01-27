import * as React from 'react';
import { default as RSelect, GroupBase, StylesConfig } from 'react-select';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

type Value = { value: string | number; label?: string };

export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any) => void;
  isMulti?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const Select = ({ label, error, ...props }: SelectProps) => {
  return (
    <div className='flex flex-col relative'>
      {label && (
        <label className='font-semibold mb-1 text-white'>{label}</label>
      )}

      <RSelect styles={customStyles} {...props} />
      {error?.message && (
        <div className='absolute bottom-[-23px] text-sm r-0 text-red-600'>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Select;

export const customStyles: StylesConfig<Value, boolean, GroupBase<Value>> = {
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: 4,
    color: '#0d0c22',
    fontSize: 16,
    height: 60,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontWeight: 500,
    color: '#0d0c22',
    paddingLeft: 10,
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  control: (provided) => {
    return {
      ...provided,
      backgroundColor: '#FFF',
      border: '1px solid rgb(133 133 132)',
      borderRadius: 20,
      height: 60,
      cursor: 'pointer',

      transition:
        'background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease',
    };
  },
};
