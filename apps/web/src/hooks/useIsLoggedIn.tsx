import { signOut, useSession } from 'next-auth/react';
import { useGetCurrentUserQuery } from 'apollo-hooks';

const useIsLoggedIn = () => {
  const session = useSession();
  const { data, loading, client } = useGetCurrentUserQuery({
    skip: session.status === 'unauthenticated' || session.status === 'loading',
  });

  const logout = async () => {
    await client.resetStore();
    await signOut();
  };

  return {
    isLoggedIn:
      !!data?.getCurrentUser?.id || session.status === 'authenticated',
    loading: loading || session.status === 'loading',
    logout,
    currentUser: data?.getCurrentUser,
    session,
  };
};

export default useIsLoggedIn;
