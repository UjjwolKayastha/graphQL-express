const { ApolloServer } = require("apollo-server-express");

const express = require("express");
require("dotenv").config();

const path = require("path");

const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

//graphql server

//types query/mutation/subscription
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

//express server
const app = express();

apolloServer.applyMiddleware({ app });

app.get("/rest", (req, res) => {
  res.json({
    data: "API is working...",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
