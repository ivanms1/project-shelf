import { Prisma, Role } from '@prisma/client';
import builder from '../../builder';
import db from '../../db';
import { SearchInput } from '../Project';
import {
  getReportsPaginationArgs,
  type SearchArgs,
} from '../../helpers/getPaginationArgs';
import decodeAccessToken from '@/helpers/decodeAccessToken';
import { GraphQLError } from 'graphql';
import { ERROR_CODES } from '@/src/const';

const Report = builder.prismaObject('Report', {
  name: 'Report',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    project: t.relation('project'),
    user: t.relation('reporter'),
    reason: t.exposeString('reason'),
    message: t.exposeString('message', { nullable: true }),
  }),
});

const ReportsResponse = builder.objectType('ReportsResponse', {
  description: 'Projects response',
  fields: (t) => ({
    nextCursor: t.exposeString('nextCursor', { nullable: true }),
    prevCursor: t.exposeString('prevCursor', { nullable: true }),
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', { type: [Report] }),
  }),
});

builder.queryFields((t) => ({
  getReports: t.field({
    type: ReportsResponse,
    description: 'Get reports',
    args: { input: t.arg({ type: SearchInput }) },
    resolve: async (_, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);
      if (!userId) {
        throw new GraphQLError('You are not allowed to do this', {
          extensions: {
            code: ERROR_CODES.UNAUTHENTICATED,
          },
        });
      }

      const user = await db.user.findUnique({
        where: {
          id: String(userId),
        },
      });

      if (user?.role !== Role.ADMIN) {
        throw new GraphQLError('You are not allowed to do this', {
          extensions: {
            code: ERROR_CODES.FORBIDDEN,
          },
        });
      }

      const incomingCursor = args?.input?.cursor;
      let results;

      const filter: Prisma.ReportScalarWhereInput | undefined = {
        OR: [
          {
            reason: {
              contains: args?.input?.search || '',
              mode: 'insensitive',
            },
          },
          {
            message: {
              contains: args?.input?.search || '',
              mode: 'insensitive',
            },
          },
        ],
      };
      const totalCount = await db.report.count({
        where: filter,
      });
      if (incomingCursor) {
        results = await db.report.findMany(
          getReportsPaginationArgs(args as SearchArgs, filter, false)
        );
      } else {
        results = await db.report.findMany(
          getReportsPaginationArgs(args as SearchArgs, filter, true)
        );
      }

      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
}));
