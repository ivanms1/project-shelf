import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schema';

const PORT = process.env.PORT || 8080;

const DEV_ORIGINS = [
  'http://localhost:3000',
  'https://studio.apollographql.com',
  'http://localhost:4000',
];

const PROD_ORIGINS = [
  'https://project-shelf-dev.netlify.app',
  'https://project-shelf-web.vercel.app',
  'https://project-shelf-admin.vercel.app',
  'https://project-shelf.fly.dev',
  'https://www.projectshelf.dev',
];

const apollo = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      accessToken: req?.headers?.authorization,
    };
  },
});

const app = express();

apollo.start().then(() =>
  apollo.applyMiddleware({
    app,
    cors: {
      origin:
        process.env.NODE_ENV === 'production' ? PROD_ORIGINS : DEV_ORIGINS,
      credentials: true,
    },
  })
);

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ type: 'application/json', limit: '50mb' }));

app.listen(PORT, () => {
  console.log(
    `🚀 GraphQL service ready at ${process.env.SERVER_URL}:${PORT}/graphql`
  );
});
