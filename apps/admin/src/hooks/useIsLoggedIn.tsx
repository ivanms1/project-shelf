import { signOut, useSession } from 'next-auth/react';
import { useGetCurrentUserAdminQuery } from 'apollo-hooks';

const useIsLoggedIn = () => {
  const session = useSession();

  const { data, loading, client } = useGetCurrentUserAdminQuery({
    skip: session.status === 'unauthenticated' || session.status === 'loading',
  });

  const logout = async () => {
    await client.resetStore();
    await signOut();
  };

  return {
    isLoggedIn: !!data?.getCurrentUserAdmin?.id,
    loading,
    logout,
    currentUser: data?.getCurrentUserAdmin,
  };
};

export default useIsLoggedIn;
