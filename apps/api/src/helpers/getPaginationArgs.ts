import type { Prisma } from '@prisma/client';

export type SearchArgs = {
  input: {
    cursor: string;
    order: 'asc' | 'desc';
    orderBy: string;
  };
};

const getPaginationArgs = (
  args: SearchArgs,
  filter: Prisma.ProjectScalarWhereInput | undefined,
  isFirst: boolean
) => {
  return {
    take: 10,
    skip: isFirst ? 0 : 1,
    cursor: isFirst ? undefined : { id: args?.input?.cursor },
    where: filter,
    include: {
      author: true,
    },
    orderBy: {
      [args?.input?.orderBy || 'createdAt']: args?.input?.order,
    },
  };
};

export default getPaginationArgs;