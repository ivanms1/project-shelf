import decodeAccessToken from '../../helpers/decodeAccessToken';
import builder from '../../builder';
import db from '../../db';
import { GraphQLError } from 'graphql';
import { ERROR_CODES } from '@/src/const';

builder.mutationFields((t) => ({
  createReport: t.prismaField({
    type: 'Report',
    description: 'Create a new report',
    args: {
      projectId: t.arg.string({ required: true }),
      reason: t.arg.string({ required: true }),
      message: t.arg.string(),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);
      const { projectId, reason, message = '' } = args;

      if (!userId || !projectId) {
        throw Error('Args missing');
      }

      const project = await db.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        throw new GraphQLError('Project not found', {
          extensions: {
            code: ERROR_CODES.NOT_FOUND,
          },
        });
      }

      if (project.authorId === userId) {
        throw new GraphQLError('You cannot report your own project', {
          extensions: {
            code: ERROR_CODES.BAD_USER_INPUT,
          },
        });
      }

      // check if user has already reported this project
      const existingReport = await db.report.findFirst({
        where: {
          AND: [
            {
              reporterId: String(userId),
            },
            {
              projectId,
            },
          ],
        },
      });

      if (existingReport) {
        throw new GraphQLError('You have already reported this project', {
          extensions: {
            code: ERROR_CODES.BAD_USER_INPUT,
          },
        });
      }

      // if project as already been reported 2 times, this would be the third time, change isApproved to false
      const reports = await db.report.findMany({
        where: {
          projectId,
        },
      });

      if (reports.length >= 3) {
        await db.project.update({
          where: {
            id: projectId,
          },
          data: {
            isApproved: false,
          },
        });
      }

      return db.report.create({
        ...query,
        data: {
          project: {
            connect: {
              id: projectId,
            },
          },
          reporter: {
            connect: {
              id: String(userId),
            },
          },
          reason,
          message: message || '',
        },
      });
    },
  }),
  deleteReport: t.prismaField({
    type: 'Report',
    description: 'Delete a report',
    args: {
      reportId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);

      if (!userId) {
        throw Error('Args missing');
      }

      return db.report.delete({
        ...query,
        where: {
          id: args?.reportId,
        },
      });
    },
  }),
}));
