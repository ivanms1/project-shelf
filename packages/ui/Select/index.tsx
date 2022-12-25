import * as React from 'react';
import { default as RSelect } from 'react-select';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import { containerStyles, errorMessageStyle, labelStyles } from './Select.css';

type Value = { value: string | number; label: string };

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
    <div className={containerStyles}>
      {label && <label className={labelStyles}>{label}</label>}

      <RSelect styles={customStyles} {...props} />
      {error?.message && (
        <div className={errorMessageStyle}>{error.message}</div>
      )}
    </div>
  );
};

export default Select;

export const customStyles: any = {
  multiValue: (provided: React.CSSProperties) => ({
    ...provided,
    backgroundColor: '#dbdbde',
    borderRadius: 4,
    color: '#0d0c22',
    fontSize: 14,
    height: 24,
  }),
  multiValueLabel: (provided: React.CSSProperties) => ({
    ...provided,
    fontWeight: 500,
    color: '#0d0c22',
    paddingLeft: 10,
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  control: (provided: React.CSSProperties, state: any) => {
    const backgroundColor = state.isFocused ? '#fff' : '#f3f3f4';
    const boxShadow = state.isFocused
      ? '0 0 0 4px rgb(234 76 137 / 10%)'
      : 'none';
    const border = state.isFocused
      ? '1px solid rgba(234,76,137,0.4)'
      : '1px solid transparent';
    return {
      ...provided,
      backgroundColor,
      border,
      borderRadius: 8,
      height: 40,

      boxShadow,
      '&:hover': {
        border: '1px solid transparent',
      },
      transition:
        'background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease',
    };
  },
};
