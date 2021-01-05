const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  type Query {
    totalPosts: Int!
  }
`;
