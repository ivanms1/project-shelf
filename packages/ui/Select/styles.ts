import type { CSSProperties } from 'react';

import { styled } from '../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const Label = styled('label', {
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 5,
});

export const customStyles: any = {
  multiValue: (provided: CSSProperties) => ({
    ...provided,
    backgroundColor: '#dbdbde',
    borderRadius: 4,
    color: '#0d0c22',
    fontSize: 14,
    height: 24,
  }),
  multiValueLabel: (provided: CSSProperties) => ({
    ...provided,
    fontWeight: 500,
    color: '#0d0c22',
    paddingLeft: 10,
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  control: (provided: CSSProperties, state: any) => {
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

export const ErrorMessage = styled('div', {
  color: '$errorRed',
  position: 'absolute',
  bottom: '-23px',
  fontSize: 14,
  right: '0',
});
