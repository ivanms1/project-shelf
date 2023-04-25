import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';

import AuthProvider from 'src/components/AuthProvider';
import Layout from 'src/components/Layout/Layout';

import useApollo from '@/hooks/useApollo';

import type { Session } from 'next-auth';

import './styles.css';
import './cropper.css';

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
          {/* @ts-expect-error TODO: fix types here */}
          {Component.auth ? (
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(CustomApp);
