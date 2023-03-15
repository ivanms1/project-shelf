import builder from '../../builder';
import db from '../../db';
import { Project } from '../Project';
import { User } from '../User';

builder.prismaObject('Like', {
  name: 'Like',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    project: t.relation('project'),
    user: t.relation('user'),
    author: t.relation('author'),
  }),
});

const TopCreatorsResponse = builder.objectType('TopCreatorsResponse', {
  description: 'Top users response',
  fields: (t) => ({
    results: t.expose('results', { type: [User] }),
  }),
});

const TopProjectsResponse = builder.objectType('TopProjectsResponse', {
  description: 'Top projects response',
  fields: (t) => ({
    results: t.expose('results', { type: [Project] }),
  }),
});

builder.queryFields((t) => ({
  getTopUsers: t.field({
    type: TopCreatorsResponse,
    description: 'Get top users',
    args: {
      interval: t.arg.string(),
    },
    // @ts-expect-error TODO: fix type
    resolve: async (_, args) => {
      const aggregatedData = await db.like.groupBy({
        by: ['authorId'],
        where: args?.interval
          ? {
              createdAt: {
                gte: new Date(args?.interval),
              },
            }
          : undefined,
        _count: {
          _all: true,
        },

        orderBy: {
          _count: {
            createdAt: 'desc',
          },
        },

        take: 50,
      });

      const topCreatorsIds = aggregatedData.map((creator) => creator.authorId);

      const topCreators = await db.user.findMany({
        where: {
          id: {
            in: topCreatorsIds,
          },
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          _count: {
            select: {
              followers: true,
            },
          },
        },
      });

      const sortedTopCreators = topCreatorsIds.map((id) => {
        const creator = topCreators.find((creator) => creator.id === id);
        return creator;
      });

      return {
        results: sortedTopCreators,
      };
    },
  }),
  getTopCreatorsForHomePage: t.field({
    type: TopCreatorsResponse,
    description: 'Get top creators for home page',
    // @ts-expect-error TODO: fix type
    resolve: async () => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      const aggregatedData = await db.like.groupBy({
        by: ['authorId'],
        where: {
          createdAt: {
            gte: monthAgo.toISOString(),
          },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            createdAt: 'desc',
          },
        },

        take: 10,
      });

      const topCreatorsIds = aggregatedData.map((creator) => creator.authorId);

      const topCreators = await db.user.findMany({
        where: {
          id: {
            in: topCreatorsIds,
          },
        },
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      });

      const sortedTopCreators = topCreatorsIds.map((id) => {
        const creator = topCreators.find((creator) => creator.id === id);
        return creator;
      });

      return {
        results: sortedTopCreators,
      };
    },
  }),
  getTopProjectsForHomePage: t.field({
    type: TopProjectsResponse,
    description: 'Get top projects for home page',
    // @ts-expect-error TODO: fix type
    resolve: async () => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      const aggregatedData = await db.like.groupBy({
        by: ['projectId'],
        where: {
          createdAt: {
            gte: monthAgo.toISOString(),
          },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            createdAt: 'desc',
          },
        },

        take: 10,
      });

      const topProjectsIds = aggregatedData.map((project) => project.projectId);

      const topProjects = await db.project.findMany({
        where: {
          id: {
            in: topProjectsIds,
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      const sortedTopProjects = topProjectsIds.map((id) => {
        const project = topProjects.find((project) => project.id === id);
        return project;
      });

      return {
        results: sortedTopProjects,
      };
    },
  }),
  getTopProjects: t.field({
    type: TopProjectsResponse,
    description: 'Get top projects',
    args: {
      interval: t.arg.string(),
    },
    // @ts-expect-error TODO: fix type
    resolve: async (_, args) => {
      const aggregatedData = await db.like.groupBy({
        by: ['projectId'],
        where: args?.interval
          ? {
              createdAt: {
                gte: new Date(args?.interval),
              },
            }
          : undefined,
        _count: {
          _all: true,
        },

        orderBy: {
          _count: {
            createdAt: 'desc',
          },
        },

        take: 50,
      });

      const topProjectsIds = aggregatedData.map((project) => project.projectId);

      const topProjects = await db.project.findMany({
        where: {
          id: {
            in: topProjectsIds,
          },
        },
        select: {
          id: true,
          title: true,
          preview: true,
          tags: true,
        },
      });

      const sortedTopProjects = topProjectsIds.map((id) => {
        const project = topProjects.find((project) => project.id === id);
        return project;
      });

      return {
        results: sortedTopProjects,
      };
    },
  }),
}));
