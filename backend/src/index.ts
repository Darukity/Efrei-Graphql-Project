import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";
import { getUser } from "./modules/auth.js";
import db from "./datasources/db.js";

const app = express();

// ✅ Configuration de CORS pour le front et Apollo Studio
app.use(
  cors({
    origin: ["http://localhost:5173", "https://studio.apollographql.com"], // ✅ Autorise le front et Apollo Studio
    credentials: true, // ✅ Autorise les cookies et JWT
  })
);
app.use(express.json()); // ✅ Permet de parser les requêtes JSON

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// ✅ Ajouter Apollo GraphQL comme middleware Express
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authorization = req.headers.authorization?.split("Bearer ")?.[1];
      const user = authorization ? getUser(authorization) : null;
      return {
        dataSources: { db },
        user,
      };
    },
  })
);

// ✅ Créer un serveur HTTP avec Express
const httpServer = http.createServer(app);

// ✅ Démarrer le serveur sur le port 4000
httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at: http://localhost:4000/graphql`);
});



