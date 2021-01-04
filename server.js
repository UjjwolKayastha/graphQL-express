const { ApolloServer } = require("apollo-server-express");

const express = require("express");
require("dotenv").config();

//graphql server

//types query/mutation/subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

//resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

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
