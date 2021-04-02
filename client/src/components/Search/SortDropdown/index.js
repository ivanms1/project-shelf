import React, { useState } from 'react';
import Select from 'react-select';

import SortCheckBox from '../CheckBox/SortCheckBox';

import { Container, HeaderContainer } from './style';

const colourStyles = {
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  menuList: (base) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '5px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
    cursor: 'pointer',
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '170px',
    cursor: 'pointer',
  }),
  menu: ({ width, ...css }) => ({
    ...css,
    width: '160px',
    cursor: 'pointer',
  }),
  option: (css, state) => ({
    ...css,
    margin: '5px',
    padding: '4px 12px',
    cursor: 'pointer',
    maxWidth: '150px',
    borderRadius: '5px',
    fontSize: '15px',
    color: state.isSelected ? 'white' : '#7d889f',
    fontWeight: '400',

    ':hover': {
      backgroundColor: '#edf1f5',
      color: '#54b6f2',
      transition: '0.2s linear',
    },
  }),
};

const titleStyle = {
  color: '#516170',
  fontWeight: 400,
  fontSize: '14px',
};

function SortDropdown({
  checked,
  options,
  onChange,
  title = 'Sort',
  ...props
}) {
  const [dropDownValue, setDropDownValue] = useState({
    value: 'title',
    label: 'Title',
  });

  const handleChange = (newValue) => {
    setDropDownValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Container>
      <HeaderContainer>
        <span style={titleStyle}>{title}</span>
        <SortCheckBox checked={checked} />
      </HeaderContainer>
      <Select
        styles={colourStyles}
        placeholder='Any'
        options={options}
        onChange={handleChange}
        defaultValue={options[0]}
      />
    </Container>
  );
}

export default SortDropdown;
