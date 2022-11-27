import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import AuthProvider from 'src/components/AuthProvider';

import useApollo from '@/hooks/useApollo';

import type { Session } from 'next-auth';

import './styles.css';

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
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default CustomApp;
