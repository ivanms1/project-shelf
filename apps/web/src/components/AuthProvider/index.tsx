import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login'];

interface AuthProvider {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProvider) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && PUBLIC_ROUTES.includes(router.pathname)) {
      router.replace('/');
    }
  }, [status]);

  return <>{children}</>;
}

export default AuthProvider;
