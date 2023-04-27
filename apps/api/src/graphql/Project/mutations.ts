import { GraphQLError } from 'graphql';

import decodeAccessToken from '../../helpers/decodeAccessToken';
import builder from '../../builder';
import db from '../../db';
import { ERROR_CODES } from '../../const';

const ProjectInput = builder.inputType('CreateProjectInput', {
  description: 'Fields necessary to create a new project',
  fields: (t) => ({
    title: t.string({ required: true }),
    preview: t.string({ required: true }),
    repoLink: t.string({ required: true }),
    siteLink: t.string({ required: true }),
    description: t.string({ required: true }),
    tags: t.stringList({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createProject: t.prismaField({
    type: 'Project',
    description: 'Create a new project',
    args: {
      input: t.arg({ type: ProjectInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);
      const { input } = args;

      if (!authorId || !input) {
        throw Error('Args missing');
      }

      const { tags, ...rest } = input;

      return db.project.create({
        ...query,
        data: {
          ...rest,
          tags: {
            set: tags,
          },
          isApproved: true,
          author: {
            connect: {
              id: String(authorId),
            },
          },
        },
        include: {
          author: true,
        },
      });
    },
  }),
  updateProject: t.prismaField({
    type: 'Project',
    description: 'Update a project',
    args: {
      projectId: t.arg.string({ required: true }),
      input: t.arg({ type: ProjectInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);
      const { projectId, input } = args;

      if (!authorId || !input) {
        throw Error('Args missing');
      }

      const { tags, ...rest } = input;

      const projectToUpdate = await db.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (projectToUpdate?.authorId !== authorId) {
        throw Error('Not authorized');
      }

      return db.project.update({
        ...query,
        where: {
          id: projectId,
        },
        data: {
          ...rest,
          tags: {
            set: tags,
          },
        },
      });
    },
  }),
  deleteProjects: t.field({
    type: ['String'],
    description: 'Delete projects',
    args: {
      projectIds: t.arg.stringList({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);
      const { projectIds } = args;

      if (!authorId || !projectIds) {
        throw Error('Args missing');
      }

      const projectsToDelete = await db.project.findMany({
        where: {
          id: {
            in: projectIds,
          },
        },
      });

      const userDeleting = await db.user.findUnique({
        where: {
          id: String(authorId),
        },
      });

      if (
        !projectsToDelete.every((project) => project.authorId === authorId) &&
        userDeleting?.role !== 'ADMIN'
      ) {
        throw Error('Not authorized');
      }

      await db.project.deleteMany({
        where: {
          id: {
            in: projectIds,
          },
        },
      });

      return args.projectIds;
    },
  }),
  updateProjectStatus: t.prismaField({
    type: 'Project',
    description: 'Update project status',
    args: {
      projectId: t.arg.string({ required: true }),
      isApproved: t.arg.boolean({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      if (!ctx.accessToken) {
        throw Error('Not Authorized');
      }

      const currentUserId = decodeAccessToken(ctx.accessToken);
      const user = await db.user.findUnique({
        where: {
          id: String(currentUserId),
        },
      });

      if (user?.role !== 'ADMIN') {
        throw Error('Not Authorized');
      }

      return db.project.update({
        ...query,
        where: { id: args.projectId },
        data: { isApproved: args.isApproved },
      });
    },
  }),
  reportProject: t.prismaField({
    type: 'Project',
    description: 'Report a project',
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      if (!ctx.accessToken) {
        throw new GraphQLError('Not Authorized', {
          extensions: {
            code: ERROR_CODES.UNAUTHENTICATED,
          },
        });
      }

      const currentUserId = decodeAccessToken(ctx.accessToken);
      const user = await db.user.findUnique({
        where: {
          id: String(currentUserId),
        },
      });

      if (!user) {
        throw new GraphQLError('Not Authorized', {
          extensions: {
            code: ERROR_CODES.UNAUTHENTICATED,
          },
        });
      }

      const projectToReport = await db.project.findUnique({
        where: {
          id: args.projectId,
        },
      });

      if (!projectToReport) {
        throw new GraphQLError('Project not found', {
          extensions: {
            code: ERROR_CODES.NOT_FOUND,
          },
        });
      }

      if (projectToReport.authorId === user.id) {
        throw new GraphQLError('You cannot report your own project', {
          extensions: {
            code: ERROR_CODES.BAD_USER_INPUT,
          },
        });
      }

      if (projectToReport.reportedBy.includes(user.id)) {
        throw new GraphQLError('Already reported', {
          extensions: {
            code: ERROR_CODES.BAD_USER_INPUT,
          },
        });
      }

      if (projectToReport.reportedBy.length >= 4) {
        return db.project.update({
          ...query,
          where: { id: args.projectId },
          data: {
            isApproved: false,
            reportedBy: {
              push: user.id,
            },
          },
        });
      }

      return db.project.update({
        ...query,
        where: { id: args.projectId },
        data: {
          reportedBy: {
            push: user.id,
          },
        },
      });
    },
  }),
}));
