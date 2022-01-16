import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import useApollo from '../hooks/useApollo';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloCache);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
