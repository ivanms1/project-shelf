import jwt from 'jsonwebtoken';

import builder from '../../builder';
import db from '../../db';

import decodeAccessToken from '../../helpers/decodeAccessToken';

export const Role = builder.enumType('Role', {
  values: ['ADMIN', 'USER'] as const,
  description: 'User role',
});

builder.prismaObject('User', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
    role: t.expose('role', { type: Role }),
    avatar: t.exposeString('avatar', { nullable: true }),
    followerCount: t.exposeInt('followerCount'),
    github: t.exposeString('github', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true }),
    projects: t.relation('projects', { nullable: true }),
    followers: t.relation('followers'),
    following: t.relation('following'),
    followingCount: t.exposeInt('followingCount'),
    projectsLiked: t.relation('projectsLiked'),
    isFollowing: t.boolean({
      resolve: async (parent, _, ctx) => {
        try {
          const currentUserId = decodeAccessToken(ctx?.accessToken);
          if (!currentUserId) {
            return false;
          }

          const isUserFollow = await db.user.findFirst({
            where: {
              id: parent.id,
              followers: {
                some: {
                  id: String(currentUserId),
                },
              },
            },
          });

          return !!isUserFollow;
        } catch (error) {
          return false;
        }
      },
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    getUser: t.prismaField({
      type: 'User',
      description: 'Get a user by id',
      args: { id: t.arg.string({ required: true }) },
      resolve: async (query, _, args) => {
        const user = await db.user.findUniqueOrThrow({
          ...query,
          where: {
            id: args.id,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      },
    }),
    getCurrentUser: t.prismaField({
      type: 'User',
      description: 'Get the current user',
      resolve: async (query, _, __, ctx) => {
        const decodeAccessToken = jwt.verify(
          ctx.accessToken,
          process.env.JWT_SECRET!
        );
        if (!decodeAccessToken) {
          throw new Error('Not Authorized');
        }
        const user = await db.user.findUnique({
          ...query,
          where: {
            id: String(decodeAccessToken),
          },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      },
    }),
    getUsers: t.prismaField({
      type: ['User'],
      description: 'Get all users',
      resolve: async () => {
        return db.user.findMany();
      },
    }),
  }),
});
