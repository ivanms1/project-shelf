import { useState, useRef, useCallback } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

const GET_ALL_USER_QUERY = loader('./queryGetAllUsers.graphql');

function Pagination() {
  // We'll start our table without any data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(null);
  const fetchIdRef = useRef(0);

  const { data: dataR = {} } = useQuery(GET_ALL_USER_QUERY);

  const { user } = dataR;

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.
      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);

      // We'll even set a delay to simulate a server here

      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(user.slice(startRow, endRow));

        setCount(Number(pageSize * pageIndex));
        setPageCount(Math.ceil(user.length / pageSize));
        setLoading(false);
      }
    },
    [user]
  );

  return {
    data,
    setData,
    loading,
    setLoading,
    pageCount,
    setPageCount,
    fetchIdRef,
    fetchData,
    count,
  };
}

export default Pagination;
