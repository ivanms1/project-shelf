import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schema';

const PORT = process.env.PORT || 8080;

const ORIGINS = JSON.parse(process.env.ORIGINS || '[]');

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
      origin: ORIGINS,
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
