import builder from '../../builder';
import db from '../../db';

import decodeAccessToken from '../../helpers/decodeAccessToken';

export const Role = builder.enumType('Role', {
  values: ['ADMIN', 'USER'] as const,
  description: 'User role',
});

export const User = builder.prismaObject('User', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email', { nullable: true }),
    role: t.expose('role', { type: Role }),
    avatar: t.exposeString('avatar', { nullable: true }),
    cover: t.exposeString('cover', { nullable: true }),
    github: t.exposeString('github', { nullable: true }),
    discord: t.exposeString('discord', { nullable: true }),
    website: t.exposeString('website', { nullable: true }),
    twitter: t.exposeString('twitter', { nullable: true }),
    bio: t.exposeString('bio', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    projects: t.relation('projects', { nullable: true }),
    likesReceived: t.relationCount('AuthorLike'),
    banned: t.exposeBoolean('banned'),
    followers: t.relation('followers'),
    following: t.relation('following'),
    followingCount: t.relationCount('following'),
    followersCount: t.relationCount('followers'),
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

const UserResponse = builder.objectType('UserResponse', {
  description: 'User response',
  fields: (t) => ({
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', { type: [User] }),
    bannedUsers: t.exposeInt('bannedUsers'),
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
        const currentUserId = decodeAccessToken(ctx.accessToken);
        if (!currentUserId) {
          throw new Error('Not Authorized');
        }
        const user = await db.user.findUnique({
          ...query,
          where: {
            id: String(currentUserId),
          },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      },
    }),
    getAllUsers: t.field({
      type: UserResponse,
      description: 'Get all users',
      resolve: async () => {
        const totalCount = await db.user.count();
        const bannedUsers = await db.user.count({
          where: {
            banned: true,
          },
        });
        const results = await db.user.findMany({
          orderBy: {
            name: 'asc',
          },
        });
        return { results, totalCount, bannedUsers };
      },
    }),
  }),
});
