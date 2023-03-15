import decodeAccessToken from '../../helpers/decodeAccessToken';
import builder from '../../builder';
import db from '../../db';

builder.mutationFields((t) => ({
  createLike: t.prismaField({
    type: 'Like',
    description: 'Create a new like',
    args: {
      projectId: t.arg.string({ required: true }),
      authorId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);
      const { projectId, authorId } = args;

      if (!userId || !projectId) {
        throw Error('Args missing');
      }

      return db.like.create({
        ...query,
        data: {
          project: {
            connect: {
              id: projectId,
            },
          },
          user: {
            connect: {
              id: String(userId),
            },
          },
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    },
  }),
  deleteLike: t.prismaField({
    type: 'Like',
    description: 'Delete a like',
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);
      const { projectId } = args;

      if (!userId) {
        throw Error('Args missing');
      }

      return db.like.delete({
        ...query,
        where: {
          userId_projectId: {
            userId: String(userId),
            projectId,
          },
        },
      });
    },
  }),
}));
