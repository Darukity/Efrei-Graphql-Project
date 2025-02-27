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


const corsOptions = {
  origin: ["http://localhost:5173", "https://studio.apollographql.com"], 
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"], 
  methods: ["GET", "POST", "OPTIONS"],
};

app.use(cors(corsOptions)); 
app.use(express.json()); 

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();


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


const httpServer = http.createServer(app);


httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at: http://localhost:4000/graphql`);
});




