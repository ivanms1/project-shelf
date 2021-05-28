import styled from 'styled-components';

export const PROFILE_BANNER_WRAPPER = styled.div`
  flex: 1;
  background-color: #f7f8fc;
  position: relative;
`;

export const PROFILE_BANNER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  /* border: 2px solid green; */
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-position: top;
    object-fit: cover;
    user-select: none;
  }
`;

export const EDIT_WRAPPER = styled.button`
  position: absolute;
  background-color: white;
  /* border: 2px solid green; */
  outline: 0;
  border: 0;
  top: 5px;
  right: 5px;
  padding: 7px;
  border-radius: 50%;
  display: none;

  :active {
    transform: scale(0.9);
    transition: 0.1s linear;
  }

  ${PROFILE_BANNER_WRAPPER}:hover & {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
