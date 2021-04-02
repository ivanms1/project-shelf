import React, { useState } from 'react';
import Select from 'react-select';

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
    width: '160px',
    minWidth: '100px',
    cursor: 'pointer',
  }),
  menu: ({ width, ...css }) => ({
    ...css,
    width: '150px',
    minWidth: '100px',
    cursor: 'pointer',
  }),
  option: (css, state) => ({
    ...css,
    margin: '5px',
    padding: '4px 12px',
    cursor: 'pointer',
    maxWidth: '140px',
    minWidth: '100px',
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

function CategoryDropdown({ value, options, onChange, ...props }) {
  const [dropDownValue, setDropDownValue] = useState({
    value: 'title',
    label: 'Title',
  });

  const handleChange = (newValue) => {
    setDropDownValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Select
        styles={colourStyles}
        placeholder='Any'
        options={options}
        onChange={(e) => {
          handleChange(e);
        }}
        {...props}
      />
    </div>
  );
}

export default CategoryDropdown;
