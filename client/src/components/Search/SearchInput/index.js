import React from 'react';

import SortDropdown from '../SortDropdown';
import CategoryDropdown from '../CategoryDropdown';

import { ReactComponent as SearchIcon } from '../../../assets/search.svg';

import {
  Container,
  InnerContainer,
  SearchIconWrapper,
  InputWrapper,
  StyledInput,
  SortWrapper,
} from './style';

function index({
  SortOptions,
  options,
  inputValue,
  inputOnChange,
  dropDownValue,
  dropDownOnChange,
  sortDropDownOnChange,
  checked,
  type,
}) {
  return (
    <Container>
      <InnerContainer>
        <InputWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInput
            value={inputValue}
            onChange={inputOnChange}
            type={type}
            placeholder='Search'
            maxLength='20'
          />
          <CategoryDropdown
            value={dropDownValue}
            onChange={dropDownOnChange}
            isSearchable={false}
            options={options}
            defaultValue={options[0]}
          />
        </InputWrapper>

        <SortWrapper>
          <SortDropdown
            checked={checked}
            onChange={sortDropDownOnChange}
            options={SortOptions}
            title='Sort'
          />
        </SortWrapper>
      </InnerContainer>
    </Container>
  );
}

export default index;
