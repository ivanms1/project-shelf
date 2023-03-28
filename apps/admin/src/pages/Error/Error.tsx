import React from 'react';

import { useRouter } from 'next/router';

function Error(props) {
  const { query } = useRouter();
  return <div>this is error page {query.error}</div>;
}

export default Error;
