import * as React from 'react';
import { default as RSelect, GroupBase, StylesConfig } from 'react-select';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

type Value = { value: string | number; label?: string };

export interface SelectProps {
  label?: string;
  options: Value[];
  value: Value | [] | null;
  onChange: (value: any) => void;
  placeholder?: string;
  isMulti?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  customStyles?: StylesConfig<Value, boolean, GroupBase<Value>>;
}

export const Select = ({
  label,
  error,
  customStyles,
  ...props
}: SelectProps) => {
  return (
    <div className='relative flex flex-col'>
      {label && (
        <label className='mb-1 font-semibold text-white'>{label}</label>
      )}

      <RSelect styles={{ ...styles, ...customStyles }} {...props} />
      {error?.message && (
        <div className='r-0 absolute bottom-[-20px] text-sm text-red-400'>
          {error.message.toString()}
        </div>
      )}
    </div>
  );
};

export default Select;

export const styles: StylesConfig<Value, boolean, GroupBase<Value>> = {
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3B3B3B',
    borderRadius: 20,
    fontSize: 16,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontWeight: 500,
    color: 'white',
    paddingLeft: 10,
    textTransform: 'uppercase',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: '#FFF',
    color: '#2B2B2B',
    cursor: 'pointer',
    transition:
      'background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease',
    ':hover': {
      backgroundColor: '#F2F2F2',
    },
  }),
  control: (provided) => {
    return {
      ...provided,
      backgroundColor: '#FFF',
      border: '1px solid rgb(133 133 132)',
      borderRadius: 20,
      height: 46,

      cursor: 'pointer',
      transition:
        'background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease',
    };
  },
};
