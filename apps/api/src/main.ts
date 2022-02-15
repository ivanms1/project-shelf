import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import db from './db';

import { schema } from './schema';

const PORT = process.env.PORT || 8080;

const apollo = new ApolloServer({
  //@ts-expect-error TODO: fix type problems
  schema,
  context: async ({ req }) => {
    return {
      db,
      prisma: db,
      accessToken: req?.headers?.authorization,
    };
  },
});

const app = express();

apollo.start().then(() =>
  apollo.applyMiddleware({
    app,
    cors: {
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'https://project-shelf-dev.netlify.app',
      ],
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
