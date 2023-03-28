import jwt from 'jsonwebtoken';
import got from 'got';

import builder from '../../builder';
import db from '../../db';

import decodeAccessToken from '../../helpers/decodeAccessToken';

const GITHUB_API_URL = 'https://api.github.com/user';

const GITHUB = 'github';

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  description: 'Update the user information',
  fields: (t) => ({
    name: t.string(),
    discord: t.string(),
    website: t.string(),
    twitter: t.string(),
    bio: t.string(),
    location: t.string(),
    avatar: t.string(),
    cover: t.string(),
    banned: t.boolean(),
  }),
});

const UpdateUserInputAsAdmin = builder.inputType('UpdateUserInputAsAdmin', {
  description: 'Update the user information as an admin',
  fields: (t) => ({
    id: t.string(),
    name: t.string(),
    discord: t.string(),
    website: t.string(),
    twitter: t.string(),
    bio: t.string(),
    location: t.string(),
    avatar: t.string(),
    cover: t.string(),
    banned: t.boolean(),
    role: t.string(),
  }),
});

const UserFollowActions = builder.enumType('UserFollowActions', {
  values: ['FOLLOW', 'UNFOLLOW'],
  description: 'Actions of follow or unfollow',
});

const FollowUserInput = builder.inputType('FollowUserInput', {
  description: 'Fields necessary to follow or unfollow a user',
  fields: (t) => ({
    userId: t.id(),
    action: t.field({ type: UserFollowActions }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    signup: t.field({
      type: 'String',
      description: 'Create a new user',
      args: {
        token: t.arg.string({ required: true }),
      },
      resolve: async (_, { token: githubToken }) => {
        const data: {
          email: string;
          name: string;
          login: string;
          avatar_url: string;
          id: number;
        } = await got
          .get(GITHUB_API_URL, {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github+json',
            },
          })
          .json();

        const user = await db.user.findFirst({
          where: {
            providerId: data?.id,
          },
        });

        if (user) {
          const token = jwt.sign(user.id, process.env.JWT_SECRET!);

          return String(token);
        }

        const newUser = await db.user.create({
          data: {
            providerId: data?.id,
            provider: GITHUB,
            name: data?.name || data?.login,
            email: data?.email,
            github: data?.login,
            avatar: data?.avatar_url,
          },
        });

        const token = jwt.sign(newUser.id, process.env.JWT_SECRET!);

        return String(token);
      },
    }),
    loginAsAdmin: t.field({
      type: 'String',
      description: 'Login in as a admin',
      args: {
        token: t.arg.string({ required: true }),
      },
      resolve: async (_, { token: githubToken }) => {
        const data: {
          email: string;
          name: string;
          login: string;
          avatar_url: string;
          id: number;
        } = await got
          .get(GITHUB_API_URL, {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github+json',
            },
          })
          .json();

        const user = await db.user.findFirst({
          where: {
            providerId: data?.id,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        if (user.role !== 'ADMIN') {
          throw new Error('Not Authorized');
        }

        const token = jwt.sign(user.id, process.env.JWT_SECRET!);

        return String(token);
      },
    }),
    updateUser: t.prismaField({
      type: 'User',
      description: 'Update the user information',
      args: {
        input: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: async (query, __, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx.accessToken);
        if (!decodeAccessToken) {
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

        return db.user.update({
          ...query,
          where: {
            id: String(currentUserId),
          },
          data: {
            name: args.input.name ?? undefined,
            discord: args.input.discord ?? undefined,
            website: args.input.website ?? undefined,
            twitter: args.input.twitter ?? undefined,
            bio: args.input.bio ?? undefined,
            location: args.input.location ?? undefined,
            avatar: args.input.avatar ?? undefined,
            cover: args.input.cover ?? undefined,
          },
        });
      },
    }),
    updateUserAsAdmin: t.prismaField({
      type: 'User',
      description: 'Update the user information as an admin',
      args: {
        input: t.arg({ type: UpdateUserInputAsAdmin, required: true }),
      },
      resolve: async (query, __, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx.accessToken);
        if (!decodeAccessToken) {
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

        if (user?.role == 'ADMIN') {
          return db.user.update({
            ...query,
            where: {
              id: String(args.input.id),
            },
            data: {
              role: args?.input?.role ?? undefined,
              banned: args?.input?.banned ?? undefined,
            },
          });
        }
      },
    }),
    followUser: t.prismaField({
      type: 'User',
      description: 'Follow or unfollow a user',
      args: {
        input: t.arg({ type: FollowUserInput, required: true }),
      },
      resolve: async (query, __, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx.accessToken);
        if (!args?.input) {
          throw new Error('Data not found');
        }

        const isFollowing = args?.input?.action === 'FOLLOW';

        const action = isFollowing ? 'connect' : 'disconnect';

        // Update target user
        const targetUser = await db.user.update({
          ...query,
          where: {
            id: String(args?.input?.userId),
          },
          data: {
            followers: {
              [action]: {
                id: currentUserId,
              },
            },
          },
        });

        // update current user
        await db.user.update({
          ...query,
          where: {
            id: String(currentUserId),
          },
          data: {
            following: {
              [action]: {
                id: args?.input?.userId,
              },
            },
          },
        });

        return targetUser;
      },
    }),
  }),
});
