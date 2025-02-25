// src/index.ts
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { context } from './context';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer();



