import { Prisma } from '@prisma/client';

import decodeAccessToken from '../../helpers/decodeAccessToken';
import builder from '../../builder';
import db from '../../db';

import getPaginationArgs, {
  type SearchArgs,
} from '../../helpers/getPaginationArgs';

export const Project = builder.prismaObject('Project', {
  name: 'Project',
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    preview: t.exposeString('preview'),
    repoLink: t.exposeString('repoLink'),
    siteLink: t.exposeString('siteLink'),
    description: t.exposeString('description'),
    isApproved: t.exposeBoolean('isApproved'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    tags: t.exposeStringList('tags'),
    author: t.relation('author'),
    likes: t.relation('Like'),
    likesCount: t.relationCount('Like'),
    isLiked: t.boolean({
      resolve: async (parent, _, ctx) => {
        try {
          const currentUserId = decodeAccessToken(ctx?.accessToken);
          if (!currentUserId) {
            return false;
          }

          const isUserLike = await db.like.findFirst({
            where: {
              projectId: parent.id,
              userId: String(currentUserId),
            },
          });

          return !!isUserLike;
        } catch (error) {
          return false;
        }
      },
    }),
  }),
});

const ProjectsResponse = builder.objectType('ProjectsResponse', {
  description: 'Projects response',
  fields: (t) => ({
    nextCursor: t.exposeString('nextCursor', { nullable: true }),
    prevCursor: t.exposeString('prevCursor', { nullable: true }),
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', { type: [Project] }),
  }),
});

const SearchOrder = builder.enumType('SearchOrder', {
  description: 'Search order',
  values: ['asc', 'desc'] as const,
});

const SearchProjectsInput = builder.inputType('SearchProjectsInput', {
  description: 'Search projects input',
  fields: (t) => ({
    cursor: t.string({ required: false }),
    search: t.string(),
    order: t.field({ type: SearchOrder }),
    orderBy: t.string(),
  }),
});

builder.queryFields((t) => ({
  getProject: t.prismaField({
    type: Project,
    description: 'Get a project by id',
    args: { id: t.arg.string({ required: true }) },
    resolve: async (query, _, args, ctx) => {
      const project = await db.project.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      if (project?.isApproved) {
        return project;
      }

      const currentUserId = decodeAccessToken(ctx.accessToken);

      if (project?.authorId === currentUserId) {
        return project;
      }

      throw Error('Not authorized');
    },
  }),
  getApprovedProjects: t.field({
    type: ProjectsResponse,
    description: 'Get approved projects',
    args: { input: t.arg({ type: SearchProjectsInput }) },
    resolve: async (_, args) => {
      const incomingCursor = args?.input?.cursor;
      let results;

      const filter: Prisma.ProjectScalarWhereInput | undefined = {
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

      const totalCount = await db.project.count({
        where: filter,
      });

      if (incomingCursor) {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, false)
        );
      } else {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, true)
        );
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
  getProjectsAdmin: t.field({
    description: 'Get projects for admin',
    type: ProjectsResponse,
    args: { input: t.arg({ type: SearchProjectsInput }) },
    resolve: async (_, args) => {
      const incomingCursor = args?.input?.cursor;
      let results;

      const totalCount = await db.project.count();

      if (incomingCursor) {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, undefined, false)
        );
      } else {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, undefined, true)
        );
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
  getMyProjects: t.field({
    description: 'Get my projects',
    type: ProjectsResponse,
    args: { input: t.arg({ type: SearchProjectsInput }) },
    resolve: async (_, args, ctx) => {
      const currentUserId = decodeAccessToken(ctx.accessToken);

      if (!currentUserId) {
        throw new Error('Not authorized');
      }

      const incomingCursor = args?.input?.cursor;
      let results;

      const filter: Prisma.ProjectWhereInput | undefined = {
        isApproved: true,
        authorId: String(currentUserId),
        OR: [
          {
            title: {
              contains: args?.input?.search || undefined,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: args?.input?.search || undefined,
              mode: 'insensitive',
            },
          },
        ],
      };

      const totalCount = await db.project.count({
        where: {
          authorId: String(currentUserId),
        },
      });

      if (incomingCursor) {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, false)
        );
      } else {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, true)
        );
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
  getUserProjects: t.field({
    description: 'Get user projects',
    type: ProjectsResponse,
    args: {
      input: t.arg({ type: SearchProjectsInput }),
      userId: t.arg.string({ required: true }),
    },

    resolve: async (_, args) => {
      const incomingCursor = args?.input?.cursor;
      let results;

      const filter: Prisma.ProjectWhereInput | undefined = {
        isApproved: true,
        authorId: args?.userId,
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

      const totalCount = await db.project.count({
        where: filter,
      });

      if (incomingCursor) {
        results = await db.project.findMany({
          ...getPaginationArgs(args as SearchArgs, filter, false),
          include: {
            _count: {
              select: {
                Like: true,
              },
            },
          },
        });
      } else {
        results = await db.project.findMany({
          ...getPaginationArgs(args as SearchArgs, filter, true),
          include: {
            _count: {
              select: {
                Like: true,
              },
            },
          },
        });
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
  getMostLikedProjects: t.field({
    description: 'Get most liked projects',
    type: ProjectsResponse,
    args: { input: t.arg({ type: SearchProjectsInput }) },
    resolve: async (_, args) => {
      const incomingCursor = args?.input?.cursor;
      let results;

      const filter: Prisma.ProjectWhereInput | undefined = {
        isApproved: true,
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

      const totalCount = await db.project.count({
        where: filter,
        orderBy: {
          Like: {
            _count: 'desc',
          },
        },
      });

      if (incomingCursor) {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, false)
        );
      } else {
        results = await db.project.findMany(
          getPaginationArgs(args as SearchArgs, filter, true)
        );
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
}));
