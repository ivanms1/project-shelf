import React from 'react';

import Pagination from './Pagination';
import UserTable from './UserTable';

function JsonData() {
  const { data, loading, pageCount, fetchData, count } = Pagination();

  return (
    <UserTable
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      getPages={count}
    />
  );
}

export default JsonData;
