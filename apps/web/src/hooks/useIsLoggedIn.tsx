import { signOut } from 'next-auth/react';
import { useGetCurrentUserQuery } from 'apollo-hooks';

const useIsLoggedIn = () => {
  const { data, loading, client } = useGetCurrentUserQuery();

  const logout = async () => {
    await client.resetStore();
    await signOut();
  };

  return {
    isLoggedIn: !!data?.getCurrentUser?.id,
    loading,
    logout,
  };
};

export default useIsLoggedIn;
