const getProjectsFilter = (args: { input: { search: string } }) => {
  return {
    OR: [
      {
        title: {
          contains: args?.input?.search || '',
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: args?.input?.search || '',
          mode: 'insensitive',
        },
      },
    ],
  };
};

export default getProjectsFilter;
