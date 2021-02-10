import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import ReactPaginate from 'react-paginate';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

import Loader from '../../components/Loader/Loader';
import WindowSize from '../../Utils/useWindowSize/useWindowSize';

import ProfilePic from '../../assets/rick.png';
import EditPic from '../../assets/edit.png';
import TrashPic from '../../assets/trash.png';

import { Container, Styles } from './style';

const UPDATE_USER_ROLE = loader('./mutationUpdateUser.graphql');

function UserTable({
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  getPages,
}) {
  const [s, setS] = useState(getPages);

  const { width } = WindowSize();

  const columns = useMemo(
    () => [
      {
        Header: <input type='checkbox'></input>,
        // Footer: (info) => `Count: ${Number(getPages)}`,
        accessor: 'check',
      },
      {
        Header: 'Id',
        id: 'row',
        Cell: ({ row }) => {
          return <div className='id'>{row.index + 1}</div>;
        },
      },
      {
        Header: 'Profile',
        accessor: (d) => (
          <div className='profile'>
            <div className='imgContainer'>
              <img src={ProfilePic}></img>
            </div>
            <div>
              <div className='name'>
                {d.name} {d.lastName}
              </div>
              <div className='email'>{d.email}</div>
            </div>
          </div>
        ),
      },
      {
        Header: 'Projects',
        accessor: (d) => {
          if (d.projects.length == 0) {
            return <span>0</span>;
          } else {
            return <span>{d.projects.length}</span>;
          }
        },
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: (props, { cell }) =>
          props.value === 'USER' ? (
            <button
              className='user'
              onClick={() => deleteuser(props.row.original.id, props.value)}
            >
              {props.value}
            </button>
          ) : (
            <button
              className='admin'
              onClick={() => deleteuser(props.row.original.id, props.value)}
            >
              ADMIN
            </button>
          ),
      },
      {
        Header: 'User ID',
        accessor: (d) => <div className='userId'>{d.id}</div>,
      },
      {
        Header: 'Actions',
        Cell: ({ cell }) => (
          <div className='buttonHolder'>
            <button>
              <img className='edit' src={EditPic}></img>
            </button>

            <button>
              <img className='trash' src={TrashPic}></img>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //pagination
    footerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const [updateRole, { loading: loadingR, error }] = useMutation(
    UPDATE_USER_ROLE
  );

  if (loadingR) {
    return <Loader />;
  }

  if (error || !data) {
    return <Loader />;
  }

  async function deleteuser(userId, ROLE) {
    try {
      await updateRole({
        variables: {
          userId: userId,
          input: {
            role: ROLE === 'ADMIN' ? 'USER' : 'ADMIN',
          },
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  return (
    <Container>
      <p className='title'>Users</p>
      {width > 1000 ? (
        <Styles>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
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
            <tfoot>
              {footerGroups.map((group) => (
                <tr {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <td {...column.getFooterProps()}>
                      {column.Footer && column.render('Footer')}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </Styles>
      ) : (
        <span>Please visit from Desktop</span>
      )}
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          previousLabel='<'
          nextLabel='>'
          breakClassName={'page'}
          containerClassName={'container'}
          pageClassName={'page'}
          pageLinkClassName={'pageLink'}
          previousLinkClassName={('pageLink', 'arrow')}
          nextLinkClassName={('pageLink', 'arrow')}
          activeClassName={'activePage'}
        />
      </div>
    </Container>
  );
}

export default UserTable;
