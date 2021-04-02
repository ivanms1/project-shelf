import styled from 'styled-components';

export const Styles = styled.div`
  padding: 1rem;
  background-color: white;
  margin: 10px 0 40px 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;

  table {
    border-spacing: 0;
    border-radius: 7px;

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

      :last-child {
        border-right: 0;
      }
    }

    th {
      font-weight: 600;
      padding: 10px 0;
    }
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .imgContainer {
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin-right: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .name {
    font-size: 16px;
    color: #420303;
    text-transform: capitalize;
  }

  .email {
    font-size: 12px;
    color: #656060;
  }

  .user {
    background-color: #ebf9eb;
    color: #8ad989;
    padding: 12px 20px;
    font-size: 12px;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .admin {
    font-size: 12px;
    background-color: #fdebeb;
    color: #f58b8c;
    padding: 12px 10px;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .buttonHolder {
    width: 100%;
    height: 100%;
    min-width: 70px;
    display: flex;
    justify-content: space-between;

    .edit:hover {
      border-radius: 7px;
      background-color: #ebf9eb;
    }

    .trash:hover {
      border-radius: 7px;
      background-color: #fdebeb;
    }
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
`;
