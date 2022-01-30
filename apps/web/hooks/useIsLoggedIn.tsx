import { useSession } from 'next-auth/react';

const useIsLoggedIn = () => {
  const session = useSession();
  return session.status === 'authenticated';
};

export default useIsLoggedIn;
