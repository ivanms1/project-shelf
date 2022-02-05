import { useGetCurrentUserQuery } from 'apollo-hooks';
import { signOut } from 'next-auth/react';

const useIsLoggedIn = () => {
  const { data, loading } = useGetCurrentUserQuery({
    onError: () => signOut(),
  });

  return {
    isLoggedIn: !!data?.getCurrentUser?.id,
    loading,
  };
};

export default useIsLoggedIn;
