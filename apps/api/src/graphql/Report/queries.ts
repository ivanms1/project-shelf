import builder from '../../builder';
import db from '../../db';

builder.prismaObject('Report', {
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

builder.queryFields((t) => ({
  getReports: t.prismaField({
    type: ['Report'],
    description: 'Get reports',
    resolve: async (query) => {
      const reports = await db.report.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return reports;
    },
  }),
}));
