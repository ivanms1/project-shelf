import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

  p {
    width: 100%;
    padding: 0 0 0 40px;
    font-size: 27px;
    font-weight: 600;
    color: #152c5b;
    letter-spacing: 1px;
    margin-bottom: 20px;
    text-align: left !important;
  }

  /* Pagination */
  .container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    list-style: none;
  }

  .pageLink {
    width: 24px;
    height: 24px;
    font-size: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    border: none;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    color: inherit;
    user-select: none;
  }

  .pageLink:hover {
    text-decoration: none;
  }

  .arrow {
    color: #344963;
    font-weight: 600;
  }

  .page {
    padding: 2px 2px;
    border-radius: 50%;
    opacity: 0.5;
    margin: 0 5px;
    cursor: pointer;
    outline: none;
    color: #344963;
    user-select: none;
    background-color: white !important;
  }

  .page:hover {
    color: red;
    opacity: 1;
    background-color: white !important;
  }

  .activePage {
    opacity: 1;
    border-radius: 12;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    color: #344963 !important;
  }

  .activePage:hover {
    color: red;
  }
`;

export const Styles = styled.div`
  width: 100%;
  max-width: 850px;
  background-color: white;
  margin: 10px 0 40px 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s linear;

  table {
    border-spacing: 0;
    border-radius: 7px;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      font-size: 16px;
      padding: 0px 1rem;
      margin: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 10%);

      :first-child {
        font-size: 12px;
        padding: 0px 1rem;
      }

      :last-child {
        border-right: 0;
      }

      :nth-child(2) {
        padding: 0px 10px;
      }

      :nth-child(3) {
        padding: 5px 5px;
      }

      :nth-child(4) {
        text-align: center;
      }

      :nth-child(5) {
        padding: 0 20px;
      }

      :nth-child(6) {
      }

      :nth-child(7) {
        padding: 0 12px;
      }
    }

    tr:hover {
      background-color: #f7f7fc;
      transition: 0.3s linear;
    }

    th {
      color: #152c5b;
      letter-spacing: 1px;
      font-weight: 600;
      background-color: #f7f7fc;
      padding: 10px 0;
      user-select: none;
    }
  }

  .id {
    text-align: center;
  }

  .profile {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 220px;
  }

  .imgContainer {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    color: #420303;
    text-transform: capitalize;
  }

  .email {
    font-size: 12px;
    color: #656060;
  }

  .user {
    background-color: #e4e6eb;
    color: #5f6062;
    padding: 10px 25px;
    font-size: 12px;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    font-weight: 600;
  }

  .user:hover {
    transition: 0.2s linear;
    transform: scale(1.02);
  }

  .user:active {
    transition: 0.2s linear;
    transform: scale(1.02) translateY(2px);
  }

  .admin {
    font-size: 12px;
    background-color: #1877f2;
    color: #eff5fe;
    padding: 10px 25px;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    font-weight: 600;
  }

  .admin:hover {
    transition: 0.2s linear;
    transform: scale(1.02);
  }

  .admin:active {
    transition: 0.2s linear;
    transform: scale(1.1);
  }

  .buttonHolder {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .edit:hover {
      border-radius: 7px;
      background-color: #ebf9eb;
    }

    .trash:hover {
      border-radius: 7px;
      background-color: #fdebeb;
    }

    button {
      width: 20px;
      height: 20px;
    }
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
  }

  .userId {
    font-size: 12px;
    text-align: center;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }

  /* .userId:hover {
    animation-name: example;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
    width: 100%;
  } */

  /* @keyframes example {
    0% {
      width: 120px;
    }
    100% {
      overflow: visible;
      width: 100%;
    }
  } */
`;
