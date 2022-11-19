import jwt from 'jsonwebtoken';

import builder from '../../builder';
import db from '../../db';

import decodeAccessToken from '../../helpers/decodeAccessToken';

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  description: 'Update the user information',
  fields: (t) => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
    github: t.string({ required: true }),
    discord: t.string({ required: true }),
    website: t.string({ required: true }),
    twitter: t.string({ required: true }),
    bio: t.string({ required: true }),
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
        email: t.arg.string({ required: true }),
        name: t.arg.string({ required: true }),
        avatar: t.arg.string({ required: true }),
      },
      resolve: async (_, args) => {
        const user = await db.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (user) {
          const token = jwt.sign(user.id, process.env.JWT_SECRET!);
          return String(token);
        }

        const newUser = await db.user.create({
          data: args,
        });

        const token = jwt.sign(newUser.id, process.env.JWT_SECRET!);

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
            id: String(decodeAccessToken),
          },
          data: args.data,
        });
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

        let action;

        const isFollowing = args?.input?.action === 'FOLLOW';

        if (isFollowing) {
          action = 'connect';
        } else {
          action = 'disconnect';
        }

        // Update target user
        const targetUser = await db.user.update({
          ...query,
          where: {
            id: String(args?.input?.userId),
          },
          data: {
            followerCount: {
              [isFollowing ? 'increment' : 'decrement']: 1,
            },
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
            followingCount: {
              [isFollowing ? 'increment' : 'decrement']: 1,
            },
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
