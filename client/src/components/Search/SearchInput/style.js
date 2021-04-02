import styled from 'styled-components';

export const Container = styled.div`
  /* border: 2px solid red; */
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 2px solid green; */
  width: 100%;
  margin: 0 auto;
  max-width: 850px;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  /* border: 2px solid green; */
  max-width: 500px;
  max-height: 60px;
  flex: 1;
  /* margin: auto auto; */
  box-shadow: 0 14px 30px rgba(103, 132, 187, 0.1),
    0 4px 4px rgba(103, 132, 187, 0.04);
  display: grid;
  grid-template-columns: 30px auto 170px;
  padding: 11px 16px;
  background: rgb(251, 251, 251);
  border-radius: 4px;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: rgb(251, 251, 251);
  padding-left: 13px;
  color: rgb(92, 114, 138);
  font-size: 15px;
  font-family: 'Poppins';
  /* border: 2px solid green;  */
`;

export const SortWrapper = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  max-width: 300px;

  @media screen and (max-width: 900px) {
    margin-top: 10px;
  }
`;
