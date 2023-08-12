import { ReactElement, ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/react';
import NextNProgress from 'nextjs-progressbar';

import useApollo from '@/hooks/useApollo';

import type { Session } from 'next-auth';
import type { NextPage } from 'next';

import './styles.css';

const PROGRESS_COLOR = '#9240FD';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const client = useApollo(pageProps);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <NextNProgress
          color={PROGRESS_COLOR}
          options={{ showSpinner: false }}
        />
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
        <Analytics />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(CustomApp);
