import { useGetCurrentUserQuery } from "apollo-hooks";

const useIsLoggedIn = () => {
  const { data, loading } = useGetCurrentUserQuery();

  return {
    isLoggedIn: !!data?.getCurrentUser?.id,
    loading,
  };
};

export default useIsLoggedIn;
