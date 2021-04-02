import React from 'react';
import Select from 'react-select';

const colourStyles = {
  marginTop: '10px',
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
      background: '#aaa',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
    cursor: 'pointer',
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '380px',
    cursor: 'pointer',
  }),
  menu: ({ width, ...css }) => ({
    ...css,
    width: '270px',
    cursor: 'pointer',
    right: 0,
  }),
  option: (css) => ({
    ...css,
    margin: '5px',
    padding: '4px 12px',
    cursor: 'pointer',
    maxWidth: '230px',
    borderRadius: '5px',
    fontSize: '15px',
    color: '#7d889f',
    fontWeight: '400',

    ':hover': {
      color: '#54b6f2',
      transition: '0.2s linear',
    },

    ':checked': {
      color: 'white',
    },
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#3db4f2',
      color: 'white',
      borderRadius: '5px',
      paddingLeft: '5px',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
    fontWeight: 400,
  }),
};

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const titleStyle = {
  color: '#516170',
  fontWeight: 500,
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

function SearchWithTags({ options, onChange, title }) {
  return (
    <div style={{ margin: '0 auto', maxWidth: 400 }}>
      <span style={titleStyle}>{title}</span>
      <Select
        styles={colourStyles}
        placeholder='Any'
        options={options}
        onChange={onChange}
        isMulti={true}
        menuPosition='absolute'
        formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
}

export default SearchWithTags;
