import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 75px 1fr 150px;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: 10px 30px;
  overflow: hidden;
  padding: 20px 20px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 10px 10px 40px 4px rgb(45 78 255 / 15%);
  margin: 0 0 20px 0;
`;

export const Profile_Pic = styled.div`
  /* border: 2px solid green; */
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: top;
    user-select: none;
  }
`;

export const User_Details = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  font-size: 16px;
  color: #24292e;
  line-height: 26px;

  .userTag {
    padding-left: 10px;
    color: #586069;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: normal;
  }
`;

export const UserDescription = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  line-height: 18px;
  font-size: 12px;
  font-family: 'Poppins';
  color: #586069;
  margin: 5px 0;
`;

export const UserLocation = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const FlexRow = styled.div`
  /* border: 2px solid green; */
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    line-height: 18px;
    font-size: 12px;
    color: #586069;
    margin-left: 7px;
  }
`;

export const FOLLOW_ICON = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
`;

export const Button = styled.button`
  background-color: #fafbfc;
  border: 1px solid #1b1f2326;
  padding: 6px 12px;
  font-family: 'Poppins';
  width: 100%;
  color: black;
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
