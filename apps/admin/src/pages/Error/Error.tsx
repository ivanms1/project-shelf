import React from 'react';

import { useRouter } from 'next/router';

const Error = () => {
  const { query } = useRouter();
  return <div>This is error page {query.error}</div>;
};

export default Error;
