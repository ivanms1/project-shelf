import type { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';

import Signin from '@/pages/Signin';

export default Signin;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
