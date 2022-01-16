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
    t.list.nonNull.field('projects', { type: 'Project' });
    t.list.nonNull.field('projectsLiked', { type: 'Project' });
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
        return ctx.db.user.findUnique({
          where: {
            id: ctx.currentUserId,
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
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const newUser = await ctx.db.user.create({
          data: { ...args },
        });
        return {
          userId: newUser.id,
          token: 'some token',
          expiresIn: '1 year',
        };
      },
    });
  },
});

export const Login = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'JSONObject',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }
        return {
          userId: user.id,
          token: 'some token',
          expiresIn: '1 year',
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
