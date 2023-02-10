import builder from '../../builder';

builder.prismaObject('Like', {
  name: 'Like',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    project: t.relation('project'),
    user: t.relation('user'),
    author: t.relation('author'),
  }),
});
