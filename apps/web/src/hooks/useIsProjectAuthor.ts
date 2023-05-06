import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const useIsProjectAuthor = (projectAuthorId: string | undefined) => {
  const { currentUser } = useIsLoggedIn();
  return currentUser?.id === projectAuthorId;
};

export default useIsProjectAuthor;
