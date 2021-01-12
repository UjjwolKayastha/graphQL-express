const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    totalPosts: Int!
    allPosts: [Post!]!
  }

  # input type
  input PostInput {
    title: String!
    description: String!
  }

  # mutations
  type Mutation {
    newPost(input: PostInput!): Post!
  }
`;
