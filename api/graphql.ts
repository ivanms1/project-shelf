import { schema } from 'nexus';
import * as cloudinary from 'cloudinary';

const imageUploader = cloudinary.v2;

schema.addToContext((req) => {
  const currentUserId = !Array.isArray(req?.headers?.['current-user-id'])
    ? req?.headers?.['current-user-id']
    : undefined;
  return {
    currentUserId,
  };
});

const ProjectActions = schema.enumType({
  name: 'ProjectAction',
  members: ['LIKE', 'DISLIKE'],
  description: 'Actions available to the user',
});

const FavoriteActions = schema.enumType({
  name: 'FavoriteAction',
  members: ['FAVORITE', 'UNDO'],
  description: 'Favorite actions',
});

schema.objectType({
  name: 'ProjectsResponse',
  definition(t) {
    t.string('nextCursor');
    t.string('prevCursor');
    t.field('results', { type: 'Project', list: true });
    t.int('totalCount');
  },
});

schema.inputObjectType({
  name: 'CreateProjectInput',
  definition(t) {
    t.string('authorId', { required: true });
    t.string('title', { required: true });
    t.string('preview', { required: true });
    t.string('repoLink', { required: true });
    t.string('siteLink', { required: true });
    t.string('description', { required: true });
    t.list.string('tags');
  },
});

schema.inputObjectType({
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

schema.inputObjectType({
  name: 'GetProjectsFilter',
  definition(t) {
    t.json('filterBy');
    t.json('sortBy');
  },
});

schema.inputObjectType({
  name: 'UpdateUsertInput',
  description: 'Update the user information',
  definition(t) {
    t.string('name');
    t.string('lastName');
    t.string('email');
    t.string('github');
    t.string('discord');
    t.string('role');
  },
});

schema.inputObjectType({
  name: 'ReactToProjectInput',
  definition(t) {
    t.string('projectId', { required: true });
    t.string('userId', { required: true });
    t.field('action', {
      type: ProjectActions,
      required: true,
    });
  },
});

schema.inputObjectType({
  name: 'FavoriteProjectInput',
  definition(t) {
    t.string('projectId', { required: true });
    t.string('userId', { required: true });
    t.field('action', {
      type: FavoriteActions,
      required: true,
    });
  },
});

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.lastName();
    t.model.email();
    t.model.github();
    t.model.discord();
    t.model.role();
    t.model.projects();
    t.model.projectsLiked();
    t.model.favoriteProjects();
  },
});

schema.objectType({
  name: 'Project',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.author();
    t.model.preview();
    t.model.repoLink();
    t.model.siteLink();
    t.model.likes();
    t.model.favorites();
    t.model.description();
    t.model.isApproved();
    t.model.createdAt();
    t.model.tags();
  },
});

schema.queryType({
  definition(t) {
    t.field('getUser', {
      type: 'User',
      args: {
        id: schema.stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.findOne({
          where: { id: args.id },
        });
      },
    });
    t.field('getUsers', {
      type: 'User',
      list: true,
      resolve(_root, _, ctx) {
        return ctx.db.user.findMany();
      },
    });
    t.field('getCurrentUser', {
      type: 'User',
      resolve(_root, _, ctx) {
        if (!ctx.currentUserId) {
          throw Error('User not Found');
        }
        return ctx.db.user.findOne({
          where: {
            id: ctx.currentUserId,
          },
        });
      },
    });
    t.field('getProject', {
      type: 'Project',
      args: {
        id: schema.stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.project.findOne({
          where: { id: args.id },
        });
      },
    });
    t.field('getProjects', {
      type: 'ProjectsResponse',
      description: 'Get all approved projects',
      args: {
        cursor: schema.stringArg(),
        modifiers: 'GetProjectsFilter',
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const filter =
          args.modifiers?.filterBy?.field &&
          (args.modifiers?.filterBy?.value ||
            args.modifiers?.filterBy?.value === '')
            ? {
                [args.modifiers?.filterBy?.field]: {
                  contains: args.modifiers?.filterBy.value,
                },
              }
            : {};

        const sorter = {
          [args.modifiers?.sortBy?.field ?? 'createdAt']:
            args.modifiers?.sortBy?.value ?? 'desc',
        };

        const totalCount = await ctx.db.project.count({
          where: {
            ...filter,
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
              ...filter,
              isApproved: true,
            },
            orderBy: sorter,
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              ...filter,
              isApproved: true,
            },
            orderBy: sorter,
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
    t.field('getMyProjects', {
      type: 'ProjectsResponse',
      description: 'Get all my projects',
      args: {
        cursor: schema.stringArg(),
        modifiers: 'GetProjectsFilter',
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const filter =
          args.modifiers?.filterBy?.field &&
          (args.modifiers?.filterBy?.value ||
            args.modifiers?.filterBy?.value === '')
            ? {
                [args.modifiers?.filterBy?.field]: {
                  contains: args.modifiers?.filterBy.value,
                },
              }
            : {};

        const sorter = {
          [args.modifiers?.sortBy?.field ?? 'createdAt']:
            args.modifiers?.sortBy?.value ?? 'desc',
        };

        const totalCount = await ctx.db.project.count({
          where: {
            ...filter,
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
              ...filter,
              authorId: ctx.currentUserId,
            },
            orderBy: sorter,
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              ...filter,
              authorId: ctx.currentUserId,
            },
            orderBy: sorter,
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
    t.field('getMyFavoriteProjects', {
      type: 'ProjectsResponse',
      description: 'Get my favorite projects',
      args: {
        cursor: schema.stringArg(),
        modifiers: 'GetProjectsFilter',
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const filter =
          args.modifiers?.filterBy?.field &&
          (args.modifiers?.filterBy?.value ||
            args.modifiers?.filterBy?.value === '')
            ? {
                [args.modifiers?.filterBy?.field]: {
                  contains: args.modifiers?.filterBy.value,
                },
              }
            : {};

        const sorter = {
          [args.modifiers?.sortBy?.field ?? 'createdAt']:
            args.modifiers?.sortBy?.value ?? 'desc',
        };

        const totalCount = await ctx.db.project.count({
          where: {
            ...filter,
            favorites: {
              some: {
                id: {
                  equals: ctx.currentUserId,
                },
              },
            },
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
              ...filter,
              favorites: {
                some: {
                  id: {
                    equals: ctx.currentUserId,
                  },
                },
              },
            },
            orderBy: sorter,
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              ...filter,
              favorites: {
                some: {
                  id: {
                    equals: ctx.currentUserId,
                  },
                },
              },
            },
            orderBy: sorter,
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
    t.field('adminGetNotApprovedProjects', {
      type: 'ProjectsResponse',
      description: 'Get all approved projects',
      args: {
        cursor: schema.stringArg(),
        modifiers: 'GetProjectsFilter',
      },
      async resolve(_root, args, ctx) {
        const incomingCursor = args?.cursor;
        let results;

        const filter =
          args.modifiers?.filterBy?.field &&
          (args.modifiers?.filterBy?.value ||
            args.modifiers?.filterBy?.value === '')
            ? {
                [args.modifiers?.filterBy?.field]: {
                  contains: args.modifiers?.filterBy.value,
                },
              }
            : {};

        const sorter = {
          [args.modifiers?.sortBy?.field ?? 'createdAt']:
            args.modifiers?.sortBy?.value ?? 'desc',
        };

        const totalCount = await ctx.db.project.count({
          where: {
            ...filter,
            isApproved: false,
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
              ...filter,
              isApproved: false,
            },
            orderBy: sorter,
          });
        } else {
          results = await ctx.db.project.findMany({
            take: 9,
            where: {
              ...filter,
              isApproved: false,
            },
            orderBy: sorter,
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

schema.mutationType({
  definition(t) {
    t.field('signUp', {
      type: 'Json',
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
        name: schema.stringArg({ required: true }),
        lastName: schema.stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const newUser = await ctx.db.user.create({ data: { ...args } });
        return {
          userId: newUser.id,
          token: 'some token',
          expiresIn: '1 year',
        };
      },
    });
    t.field('login', {
      type: 'Json',
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findMany({
          where: {
            email: args.email,
          },
        });

        if (user.length < 1) {
          throw new Error('User not found');
        }

        return {
          userId: user[0].id,
          token: 'some token',
          expiresIn: '1 year',
        };
      },
    });
    t.field('updateUser', {
      type: 'User',
      args: {
        userId: schema.stringArg({ required: true }),
        input: 'UpdateUsertInput',
      },
      async resolve(_root, args, ctx) {
        if (!args?.input) {
          throw new Error('Data not found');
        }

        const user = await ctx.db.user.update({
          where: {
            id: args.userId,
          },
          // @ts-expect-error
          data: args.input,
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      },
    });
    t.field('createProject', {
      type: 'Project',
      args: {
        input: 'CreateProjectInput',
      },
      resolve(_root, { input }, ctx) {
        // @ts-expect-error
        const { authorId, ...rest } = input;
        return ctx.db.project.create({
          data: {
            ...rest,
            tags: {
              // @ts-expect-error
              set: rest.tags,
            },
            author: {
              connect: {
                id: authorId,
              },
            },
          },
        });
      },
    });
    t.field('updateProject', {
      type: 'Project',
      args: {
        projectId: schema.stringArg({ required: true }),
        input: 'UpdateProjectInput',
      },
      resolve(_root, { projectId, input }, ctx) {
        if (!projectId) {
          throw Error('No ID provided');
        }

        if (!input) {
          throw 'No Data';
        }

        return ctx.db.project.update({
          where: { id: projectId },
          data: {
            ...input,
            isApproved: false,
            tags: {
              // @ts-expect-error
              set: input.tags,
            },
          },
        });
      },
    });
    t.field('deleteProject', {
      type: 'String',
      args: {
        projectId: schema.stringArg({ required: true }),
      },
      async resolve(_root, { projectId }, ctx) {
        const projectToDelete = await ctx.db.project.findOne({
          where: {
            id: projectId,
          },
        });

        const userDeleting = await ctx.db.user.findOne({
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

        await ctx.db.project.delete({ where: { id: projectId } });

        return projectId;
      },
    });
    t.field('deleteManyProjects', {
      type: 'Json',
      args: {
        projectIds: schema.stringArg({ required: true, list: true }),
      },
      async resolve(_root, { projectIds }, ctx) {
        const { count } = await ctx.db.project.deleteMany({
          where: {
            id: { in: projectIds },
          },
        });

        return {
          count,
          ids: projectIds,
        };
      },
    });
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
    t.field('favoriteProject', {
      type: 'Project',
      args: {
        input: 'FavoriteProjectInput',
      },
      resolve(_root, { input }, ctx) {
        if (!input) {
          throw new Error('Invalid action');
        }

        if (!input.projectId) {
          throw new Error('Missing project dd');
        }
        let action;
        if (input.action === 'FAVORITE') {
          action = 'connect';
        } else {
          action = 'disconnect';
        }

        return ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            favorites: {
              [action]: {
                id: input.userId,
              },
            },
          },
          include: {
            favorites: true,
            author: true,
          },
        });
      },
    });
    t.field('uploadImage', {
      type: 'Json',
      args: {
        path: schema.stringArg({ required: true }),
      },
      async resolve(_root, { path }, ctx) {
        return new Promise((resolve, reject) => {
          imageUploader.uploader.upload(path, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve({
              url: res!.url,
            });
          });
        });
      },
    });
    t.field('updateProjectStatus', {
      type: 'Project',
      args: {
        projectId: schema.stringArg({ required: true }),
        isApproved: schema.booleanArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        if (!ctx.currentUserId) {
          throw Error('Not Authorized');
        }
        const user = await ctx.db.user.findOne({
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
        });
      },
    });
  },
});
