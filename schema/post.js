const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    totalPosts: int!
    allPosts: [Post!]!
  }
`;
