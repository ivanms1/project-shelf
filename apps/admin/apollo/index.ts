import {
  ApolloClient,
  createHttpLink,
  FieldPolicy,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import getAuthToken from '@/helpers/getAuthToken';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const URI = 'http://localhost:3333/graphql';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const projectsMergeConfig: FieldPolicy<any, any, any> = {
  keyArgs: false,
  merge(existing = null, incoming) {
    if (!existing || !existing?.results?.length) {
      return incoming;
    }

    if (!incoming.prevCursor) {
      return existing;
    }

    if (existing.nextCursor === incoming.nextCursor) {
      return existing;
    }

    const existingResults = existing?.results ?? [];
    return {
      ...incoming,
      results: [...existingResults, ...incoming.results],
    };
  },
};

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    connectToDevTools: true,
    link: authLink.concat(
      createHttpLink({
        uri: URI,
      })
    ),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getApprovedProjects: projectsMergeConfig,
            getMyProjects: projectsMergeConfig,
            adminGetNotApprovedProjects: projectsMergeConfig,
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}
