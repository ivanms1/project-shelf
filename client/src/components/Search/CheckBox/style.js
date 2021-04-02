import styled from 'styled-components';

export const StyledCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* border: 2px solid green; */

  input {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #00000044;
    box-shadow: 0 14px 30px rgba(103, 132, 187, 0.1),
      0 4px 4px rgba(103, 132, 187, 0.04);
    cursor: pointer;
    margin-top: 4px;
  }

  > input:not(:checked) {
    transform: scale(1); /* mise à l'échelle à 0 */
  }

  > input:checked {
    transition: 0.2s ease-in;
    transform: scale(1.05);
  }

  label {
    font-size: 14px;
    margin-left: 10px;
    color: #516170;
  }
`;

//  display: inline-block;
//   border: 2px solid yellow;
//   > input {
//     display: none;
//   }
//   > input + label {
//     position: relative;
//     padding-left: 25px;
//     cursor: pointer;
//     &:before {
//       content: '';
//       position: absolute;
//       left: 0;
//       top: 1px;
//       width: 17px;
//       height: 17px;
//       background-color: white;
//       border-radius: 4px;
//       border: 1px solid #00000044;
//       box-shadow: 0 14px 30px rgba(103, 132, 187, 0.1),
//         0 4px 4px rgba(103, 132, 187, 0.04);
//     }
//     &:after {
//       content: '✔';
//       position: absolute;
//       top: -1px;
//       left: 2px;
//       font-size: 16px;
//       color: #03a9f4;
//       transition: all 0.2s; /* on prévoit une animation */
//     }
//   }
//   > input:not(:checked) + label {
//     &:after {
//       opacity: 0; /* coche invisible */
//       transform: scale(0); /* mise à l'échelle à 0 */
//     }
//   }
//   > input:disabled:not(:checked) + label {
//     &:before {
//       box-shadow: none;
//       border-color: #bbb;
//       background-color: #ddd;
//     }
//   }
//   > input:checked + label {
//     &:after {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }
//   > input:disabled:checked + label {
//     &:after {
//       color: #999;
//     }
//   }
//   > input:disabled + label {
//     color: #aaa;
//   }
//   > input:checked:focus + label,
//   input:not(:checked):focus + label {
//     &:before {
//       border: 1px dotted blue;
//     }
//   }
