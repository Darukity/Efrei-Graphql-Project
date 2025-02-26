import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';
import { getUser } from './modules/auth.js';
import { db } from './context.js'; // ✅ Correction ici

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authorization = req.headers.authorization?.split('Bearer ')?.[1];
    const user = authorization ? getUser(authorization) : null;

    return {
      dataSources: { db }, // ✅ `db` est bien injecté ici !
      user,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
