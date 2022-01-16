import {
  objectType,
  extendType,
  idArg,
  nonNull,
  stringArg,
  booleanArg,
  inputObjectType,
  list,
  enumType,
} from 'nexus';
import { Project } from 'nexus-prisma';

export const ProjectType = objectType({
  name: Project.$name,
  description: Project.$description,
  definition(t) {
    t.field(Project.id);
    t.field(Project.title);
    t.field(Project.preview);
    t.field(Project.repoLink);
    t.field(Project.siteLink);
    t.field(Project.description);
    t.field(Project.isApproved);
    t.field(Project.likesCount);
    t.field(Project.createdAt);
    t.field(Project.tags);
    t.field(Project.author);
    t.field(Project.likes);
    t.boolean('isLiked', {
      description: 'If this project is liked by the current user',
      async resolve(_root, _, ctx) {
        if (!ctx?.currentUserId) {
          return false;
        }

        const isUserLike = await ctx.db.project.findFirst({
          where: {
            id: _root.id,
            likes: {
              some: {
                id: ctx.currentUserId,
              },
            },
          },
        });

        return !!isUserLike;
      },
    });
  },
});

export const ProjectsResponse = objectType({
  name: 'ProjectsResponse',
  definition(t) {
    t.string('nextCursor');
    t.string('prevCursor');
    t.nonNull.list.nonNull.field('results', { type: 'Project' });
    t.int('totalCount');
  },
});

export const CreateProjectInput = inputObjectType({
  name: 'CreateProjectInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('preview');
    t.nonNull.string('repoLink');
    t.nonNull.string('siteLink');
    t.nonNull.string('description');
    t.nonNull.list.string('tags');
  },
});

export const UpdateProjectInput = inputObjectType({
  name: 'UpdateProjectInput',
  definition(t) {
    t.string('title');
    t.string('preview');
    t.string('repoLink');
    t.string('siteLink');
    t.string('description');
    t.list.string('tags');
  },
});

const ProjectActions = enumType({
  name: 'ProjectAction',
  members: ['LIKE', 'DISLIKE'],
  description: 'Actions available to the user',
});

export const ReactToProjectInput = inputObjectType({
  name: 'ReactToProjectInput',
  definition(t) {
    t.nonNull.id('projectId');
    t.nonNull.id('userId');
    t.nonNull.field('action', {
      type: ProjectActions,
    });
  },
});

export const GetProject = extendType({
  type: 'Query',
  definition(t) {
    t.field('getProject', {
      type: 'Project',
      args: {
        id: nonNull(idArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.project.findUnique({
          where: { id: args.id },
          include: {
            likes: true,
            author: true,
          },
        });
      },
    });
  },
});

export const GetApprovedProjects = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getApprovedProjects', {
      type: 'ProjectsResponse',
      description: 'Get all approved projects',
      args: {
        cursor: stringArg(),
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const totalCount = await ctx.db.project.count({
          where: {
            isApproved: true,
          },
        });

        if (incomingCursor) {
          results = await ctx.db.project.findMany({
            take: 9,
            skip: 1,
            cursor: {
              id: incomingCursor,
            },
            where: {
              isApproved: true,
            },
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              isApproved: true,
            },
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        }

        const lastResult = results[8];
        const cursor = lastResult?.id;

        return {
          prevCursor: args.cursor,
          nextCursor: cursor,
          results,
          totalCount,
        };
      },
    });
  },
});

export const GetProjectsAdmin = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getProjectsAdmin', {
      type: 'ProjectsResponse',
      description: 'Admin query to get projects',
      args: {
        cursor: stringArg(),
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const totalCount = await ctx.db.project.count();

        if (incomingCursor) {
          results = await ctx.db.project.findMany({
            take: 9,
            skip: 1,
            cursor: {
              id: incomingCursor,
            },
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        }

        const lastResult = results[8];
        const cursor = lastResult?.id;

        return {
          prevCursor: args.cursor,
          nextCursor: cursor,
          results,
          totalCount,
        };
      },
    });
  },
});

export const GetMyProjects = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getMyProjects', {
      type: 'ProjectsResponse',
      description: 'Get all my projects',
      args: {
        cursor: stringArg(),
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const totalCount = await ctx.db.project.count({
          where: {
            authorId: ctx.currentUserId,
          },
        });

        if (incomingCursor) {
          results = await ctx.db.project.findMany({
            take: 9,
            skip: 1,
            cursor: {
              id: incomingCursor,
            },
            where: {
              authorId: ctx.currentUserId,
            },
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              authorId: ctx.currentUserId,
            },
            include: {
              likes: true,
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        }

        const lastResult = results[8];
        const cursor = lastResult?.id;

        return {
          prevCursor: args.cursor,
          nextCursor: cursor,
          results,
          totalCount,
        };
      },
    });
  },
});

export const CreateProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createProject', {
      type: 'Project',
      args: {
        input: 'CreateProjectInput',
      },
      resolve(_root, { input }, ctx) {
        const authorId = ctx.currentUserId;

        if (!authorId || !input) {
          throw Error('Args missing');
        }

        const { tags, ...rest } = input;

        return ctx.db.project.create({
          data: {
            ...rest,
            tags: {
              set: tags,
            },
            likesCount: 0,
            author: {
              connect: {
                id: authorId,
              },
            },
          },
          include: {
            author: true,
          },
        });
      },
    });
  },
});

export const UpdateProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProject', {
      type: 'Project',
      args: {
        projectId: nonNull(idArg()),
        input: 'UpdateProjectInput',
      },
      resolve(_root, { input, projectId }, ctx) {
        if (!projectId || !input) {
          throw Error('Args missing');
        }

        const { tags, ...rest } = input;

        return ctx.db.project.update({
          where: { id: projectId },
          data: {
            ...rest,
            isApproved: false,
            tags: {
              set: tags,
            },
          },
          include: {
            author: true,
          },
        });
      },
    });
  },
});

export const DeleteProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteProject', {
      type: 'String',
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, { id }, ctx) {
        const projectToDelete = await ctx.db.project.findFirst({
          where: {
            id,
          },
        });
        const userDeleting = await ctx.db.user.findFirst({
          where: {
            id: ctx.currentUserId,
          },
        });
        if (
          projectToDelete?.authorId !== userDeleting?.id &&
          userDeleting?.role !== 'ADMIN'
        ) {
          throw Error('Not Authorized');
        }
        await ctx.db.project.delete({ where: { id } });
        return id;
      },
    });
  },
});

export const DeleteManyProjects = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyProjects', {
      type: 'JSONObject',
      args: {
        ids: nonNull(list(idArg())),
      },
      async resolve(_root, { ids }, ctx) {
        const { count } = await ctx.db.project.deleteMany({
          where: {
            id: { in: ids },
          },
        });

        return {
          count,
          ids,
        };
      },
    });
  },
});

export const ReactToProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('reactToProject', {
      type: 'Project',
      args: {
        input: 'ReactToProjectInput',
      },
      resolve(_root, { input }, ctx) {
        if (!input) {
          throw new Error('Invalid action');
        }

        if (!input.projectId) {
          throw new Error('Missing project dd');
        }
        let action;
        if (input.action === 'LIKE') {
          action = 'connect';
        } else {
          action = 'disconnect';
        }

        return ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            likes: {
              [action]: {
                id: input.userId,
              },
            },
          },
          include: {
            likes: true,
            author: true,
          },
        });
      },
    });
  },
});

export const UpdateProjectStatus = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProjectStatus', {
      type: 'Project',
      args: {
        projectId: nonNull(stringArg()),
        isApproved: nonNull(booleanArg()),
      },
      async resolve(_root, args, ctx) {
        if (!ctx.currentUserId) {
          throw Error('Not Authorized');
        }
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.currentUserId,
          },
        });

        if (!user || user.role !== 'ADMIN') {
          throw Error('Not Authorized');
        }

        return ctx.db.project.update({
          where: { id: args.projectId },
          data: { isApproved: args.isApproved },
          include: {
            author: true,
          },
        });
      },
    });
  },
});
