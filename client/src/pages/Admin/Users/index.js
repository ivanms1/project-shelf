import React from 'react';
import { useTable } from 'react-table';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import TrashPic from '../../../assets/trash.png';

import { Container, Table } from './style';

const QUERY_GET_ALL_USERS = loader('./queryGetAllUsers.graphql');

function Users() {
  const { data } = useQuery(QUERY_GET_ALL_USERS);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Projects',
        accessor: 'projects',
        Cell: ({ cell: { value } }) => <>{value?.length ?? 0}</>,
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: ({ cell: { value } }) => (
          <button className='user'>{value}</button>
        ),
      },
      {
        Header: 'Action',
        Cell: () => (
          <div className='buttonHolder'>
            <button>
              <img className='trash' src={TrashPic} alt='delete-button' />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: data?.users?.results ?? [] });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Container>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;
