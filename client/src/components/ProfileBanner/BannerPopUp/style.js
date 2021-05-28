import styled, { css } from 'styled-components';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  top: 50%;
  left: 50%;
  margin-right: -50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 40px 4px rgba(45, 78, 255, 0.2) !important;
  border-radius: 12px;
  background-color: white;
  padding: 25px 30px 25px 30px;
  width: 100%;
  max-width: 80vw;
  height: 100%;
  max-height: 90vh;
  font-family: 'Poppins';
  z-index: 999 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 450px) {
    max-width: 330px;
    max-height: 440px;
  }
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 10px 0;
  border: 2px solid green;

  img {
    display: block;
    max-width: 100%;
    max-height: 100vh;
    backface-visibility: hidden;
    object-fit: cover;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const CustomDONE = css`
  letter-spacing: 1.5%;
  min-width: 60px;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 0;
  border-radius: 7px;
  background-color: #1b74e4;
  box-shadow: none !important;
`;
