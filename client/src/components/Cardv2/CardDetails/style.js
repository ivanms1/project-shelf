import styled, { css } from 'styled-components';

const colors = {
  green: 'rgba(0, 203, 91, 0.7)',
  red: ' rgba(237, 44, 73, 0.7)',
};

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: #f7f8fc;

  & .wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  & .imgUserDetails {
    overflow: hidden;
    position: relative;
    display: inline-block;
  }
`;

export const ImgContainerOuter = styled.figure`
  border-radius: 5px;
  display: flex;
  max-width: 650px;
  max-height: 650px;
  min-width: 350px;
  min-height: 250px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 7px solid ${({ status }) => (status ? colors.green : colors.red)};

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const UserDetails = styled.div`
  margin-top: 20px;

  span {
    display: block;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  & .fullName {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 30px;
  }
`;

export const AllDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  span {
    display: block;
  }

  & .fullName {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 35px;
  }

  & .date {
    font-size: 20px;
  }

  & .tagsContainer {
    display: flex;
    margin-top: 7px;
    flex-direction: row;

    .tagsList {
      display: inline-block;
      width: 100%;
    }

    & .tag {
      display: inline-block;
      margin: 5px 5px;
      padding: 5px 15px;
      border-radius: 5px;
      font-size: 14px;
      letter-spacing: 1.1px;
      background-color: #5b7793;
      color: white;
      font-weight: 500;
    }
  }

  & .linksContainer {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    justify-content: space-between;

    span {
      display: flex;
      flex-direction: row;

      a {
        margin-left: 10px;
        text-decoration: none;
        color: #000;
      }
    }
  }

  & .description {
    margin-top: 15px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
`;

export const CustomDeleteButtonCSS = css`
  letter-spacing: 1px;
  font-weight: 500;
  max-width: 150px;
`;
