import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/react';

import AuthProvider from 'src/components/AuthProvider';
import Layout from 'src/components/Layout/Layout';


import useApollo from '@/hooks/useApollo';

import type { Session } from 'next-auth';

import './styles.css';
import useZustandStore from 'src/zustand/useZustandStore';


function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  const client = useApollo(pageProps);
  const isAuthLoading = useZustandStore(state => state.isAuthLoading)

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          {isAuthLoading && 'loading...'}
          {/* @ts-expect-error TODO: fix types here */}
          {Component.auth ? (
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster />
          <Analytics />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(CustomApp);
