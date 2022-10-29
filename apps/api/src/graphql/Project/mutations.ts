import decodeAccessToken from '@/helpers/decodeAccessToken';
import builder from '@/src/builder';
import db from '@/src/db';

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

const ProjectActions = builder.enumType('ProjectActions', {
  description: 'Project actions',
  values: ['LIKE', 'DISLIKE'] as const,
});

const ReactToProjectInput = builder.inputType('ReactToProjectInput', {
  description: 'React to project input',
  fields: (t) => ({
    projectId: t.string({ required: true }),
    action: t.field({ type: ProjectActions, required: true }),
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
          likesCount: 0,
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
        include: {},
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
  reactToProject: t.prismaField({
    type: 'Project',
    description: 'Like or remove like from a project',
    args: {
      input: t.arg({ type: ReactToProjectInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);
      const { input } = args;
      if (!input) {
        throw new Error('Invalid action');
      }

      if (!input.projectId || !authorId) {
        throw new Error('Missing project id');
      }
      let action;
      if (input.action === 'LIKE') {
        action = 'connect';
      } else {
        action = 'disconnect';
      }

      return db.project.update({
        ...query,
        where: {
          id: input.projectId,
        },
        data: {
          likesCount: {
            [input?.action === 'LIKE' ? 'increment' : 'decrement']: 1,
          },
          likes: {
            [action]: {
              id: authorId,
            },
          },
        },
      });
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
        include: {
          author: true,
        },
      });
    },
  }),
}));
