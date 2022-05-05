import {
  objectType,
  extendType,
  idArg,
  nonNull,
  stringArg,
  inputObjectType,
  enumType,
} from 'nexus';
import { User } from 'nexus-prisma';
import jwt from 'jsonwebtoken';
import decodeAccessToken from '../helpers/decodeAccessToken';

export const Role = enumType({
  name: 'Role',
  members: ['ADMIN', 'USER'],
});

export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.field(User.id);
    t.field(User.name);
    t.field(User.email);
    t.field(User.github);
    t.field(User.discord);
    t.field(User.avatar);
    t.field(User.role);
    t.field(User.followerCount);
    t.field(User.followingCount);
    t.list.nonNull.field('followers', { type: 'User' });
    t.list.nonNull.field('following', { type: 'User' });
    t.list.nonNull.field('projects', { type: 'Project' });
    t.list.nonNull.field('projectsLiked', { type: 'Project' });
    t.boolean('isFollowing', {
      description: 'If this user is followed by the current user',
      async resolve(_root, _, ctx) {
        try {
          const currentUserId = decodeAccessToken(ctx?.accessToken);
          if (!currentUserId) {
            return false;
          }

          const isUserFollowing = await ctx.db.user.findFirst({
            where: {
              id: _root.id,
              followers: {
                some: {
                  id: String(currentUserId),
                },
              },
            },
          });

          return !!isUserFollowing;
        } catch (error) {
          return false;
        }
      },
    });
  },
});

export const UpdateUsertInput = inputObjectType({
  name: 'UpdateUsertInput',
  description: 'Update the user information',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('github');
    t.nonNull.string('discord');
    t.nonNull.field('role', { type: 'Role' });
  },
});

const UserFollowActions = enumType({
  name: 'UserFollowActions',
  members: ['FOLLOW', 'UNFOLLOW'],
  description: 'Actions of follow or unfollow',
});

export const FollowUserInput = inputObjectType({
  name: 'FollowUserInput',
  description: 'Fields necessary to follow or unfollow a user',
  definition(t) {
    t.nonNull.id('userId');
    t.nonNull.field('action', {
      type: UserFollowActions,
    });
  },
});

export const GetUser = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      args: { id: nonNull(idArg()) },
      resolve(_root, args, ctx) {
        return ctx.db.user.findUnique({
          where: {
            id: args.id,
          },
          include: {
            projects: true,
          },
        });
      },
    });
  },
});

export const getCurrentUser = extendType({
  type: 'Query',
  definition(t) {
    t.field('getCurrentUser', {
      type: 'User',
      resolve(_root, _, ctx) {
        const decoded = jwt.verify(ctx.accessToken, process.env.JWT_SECRET!);

        if (!decoded) {
          throw Error('Not Authorized');
        }

        return ctx.db.user.findUnique({
          where: {
            id: String(decoded),
          },
        });
      },
    });
  },
});

export const GetUsers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getUsers', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});

export const SignUp = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'JSONObject',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        avatar: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (user) {
          const token = jwt.sign(user.id, process.env.JWT_SECRET!);
          return {
            token,
          };
        }

        const newUser = await ctx.db.user.create({
          data: args,
        });

        const token = jwt.sign(newUser.id, process.env.JWT_SECRET!);
        return {
          token,
        };
      },
    });
  },
});

export const UpdateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        userId: nonNull(stringArg()),
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
          data: args.input,
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      },
    });
  },
});

export const FollowUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('followUser', {
      type: 'User',
      description: 'Follow or unfollow a user',
      args: {
        input: 'FollowUserInput',
      },
      async resolve(_root, args, ctx) {
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
        const targetUser = await ctx.db.user.update({
          where: {
            id: args?.input?.userId,
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
        await ctx.db.user.update({
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
    });
  },
});
