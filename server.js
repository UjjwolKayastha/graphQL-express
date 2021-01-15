const { ApolloServer } = require("apollo-server-express");
const { db } = require("./db");
const http = require("http");
const express = require("express");
require("dotenv").config();

const { authCheck } = require("./helpers/auth");
const cors = require("cors");
const path = require("path");

const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

//express server
const app = express();

db();
app.use(cors());

//graphql server

//types query/mutation/subscription
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs"))
);

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  //request and response as context
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

app.get("/rest", authCheck, function (req, res) {
  res.json({
    data: "API is working...",
  });
});

httpServer.listen(process.env.PORT, function () {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
