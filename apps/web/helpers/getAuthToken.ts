import { getSession } from 'next-auth/react';

async function getAuthToken() {
  const session = await getSession();
  // @ts-expect-error TODO: find a way to add serverToken to the session type
  return session?.token;
}

export default getAuthToken;
