import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const useIsProjectAuthor = (projectAuthorId: string) => {
  const { currentUser } = useIsLoggedIn();
  return currentUser?.id === projectAuthorId;
};

export default useIsProjectAuthor;
