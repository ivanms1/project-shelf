import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px 0;
  background-color: white;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Tab = styled.div``;

export const Button = styled.button`
  background-color: #fafbfc;
  border: 1px solid #1b1f2326;
  padding: 6px 30px;
  font-family: 'Poppins';
  width: 100%;
  color: ${({ selected }) => (selected == 1 ? '#33b8fd' : 'black')};
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.2em rgba(3, 102, 214, 0.3);
  }

  :active {
    transform: scale(0.96);
    transition: all 0.2s linear;
  }
`;
