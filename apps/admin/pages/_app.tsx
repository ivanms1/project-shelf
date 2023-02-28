import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import AuthProvider from 'src/components/AuthProvider';

import useApollo from '@/hooks/useApollo';

import type { Session } from 'next-auth';

import './styles.css';

import Layout from '../src/components/Layout';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  const client = useApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default CustomApp;
