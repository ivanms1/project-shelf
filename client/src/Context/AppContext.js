import { useApolloClient } from '@apollo/client';
import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { useHistory } from 'react-router';

import useCurrentUser from '../components/useCurrentUser';

import { TOKEN_NAME } from '../const';

const Context = createContext();

const setToken = (token) => localStorage.setItem(TOKEN_NAME, token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME) || null;
};

export function AppProvider({ children }) {
  const [authToken, setAuthToken] = useState(getToken());

  const { currentUser, refetch } = useCurrentUser();

  const client = useApolloClient();

  const history = useHistory();

  const handleLogin = useCallback(
    (token) => {
      setAuthToken(token);
      setToken(token);
      refetch();
      history.replace('/');
    },
    [history, refetch]
  );

  const handleLogout = useCallback(async () => {
    setAuthToken(null);
    setToken(null);
    await client.resetStore();
    history.replace('/login');
  }, [client, history]);

  const value = useMemo(
    () => ({
      authToken,
      isAuthenticated: !!currentUser,
      handleLogin,
      handleLogout,
    }),
    [authToken, currentUser, handleLogin, handleLogout]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useAppContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAppContext must be used within AppContext');
  }

  return context;
};
