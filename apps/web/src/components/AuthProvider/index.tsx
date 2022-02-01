import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PRIVATE_ROUTES = ['/create-projects'];

interface AuthProvider {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProvider) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status !== 'authenticated' &&
      PRIVATE_ROUTES.includes(router.pathname)
    ) {
      router.replace('/');
    }
  }, [status]);

  return <>{children}</>;
}

export default AuthProvider;
