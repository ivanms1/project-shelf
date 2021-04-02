import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
  background-color: #f7f8fc;
  max-width: 1380px;
  margin: auto;

  > p {
    color: #152c5b;
    width: 100%;
    padding: 50px 20px;
    font-weight: 600;
    font-size: clamp(1.2rem, 2.5vw, 26px);
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  > p {
    color: #152c5b;
    font-weight: 600;
    font-size: 25px;
  }

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    > p {
      text-align: center;
      font-size: 25px;
      margin-bottom: 20px;
    }
  }
`;

export const InitialSearchContainer = styled.button`
  border: none;
  outline: none;
  width: 42px;
  height: 42px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    transform: scale(0.95);
    transition: 0.2s ease-in;
  }
  /* display: ${({ showSearch }) => (showSearch ? 'none' : 'block')}; */
`;

export const CardContainer = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 15px;

  .noproject {
    margin: 20vh auto;
    font-size: 20px;
    text-align: center;
  }
`;
