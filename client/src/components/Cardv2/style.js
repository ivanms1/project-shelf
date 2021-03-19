import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  green: 'rgba(0, 203, 91, 0.7)',
  red: ' rgba(237, 44, 73, 0.7)',
};

export const Main = styled.div`
  border-radius: 5px;
  margin-bottom: 25px;
  margin: 12px;
  background-color: transparent !important;
  position: relative;

  & .starContainer {
    border: none;
    outline: none;
    background-color: transparent;
    position: absolute;
    right: -20px;
    top: -15px;
    z-index: 200;
 

  }

  button {
    background-color: transparent;
    border: none;
    
  } 
`;

export const CardContainerInner = styled.div`
  width: 330px;
  height: 200px;
  box-shadow: 10px 10px 40px 4px rgba(45, 78, 255, 0.15);
  border: 7px solid
    ${({ isApproved }) => (isApproved ? colors.green : colors.red)};
    
 
  border-radius: 7px;

  & .imgContainer {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  :hover .overlay {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: block;
    object-fit: cover;
    
  }

  & .overlay {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.55);
    
  }

  & .overlayContent {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    align-items: center;

    & button {
      /* transform: translateY(25px) */
    }
  }

  
`;

export const ProjectDetails = styled.div`
  padding: 10px 0px 0px 20px;

  & .userName {
    display: block;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }

  & .submissionDate {
    display: block;
    font-size: 13px;
    font-weight: 400;
  }
`;

export const ViewDetails = styled(Link)`
  padding: 10px 17px;
  font-size: 12px;
  color: black;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  background-color: white;
  letter-spacing: 1px;
  font-weight: 600;
  border: none;
  border-radius: 5px;

  &:active {
    transform: scale(0.97);
    transition: 0.3s linear ease-in;
  }

  &:hover {
    transform: scale(1.04);
    transition: 0.3s ease-in;
  }
`;
