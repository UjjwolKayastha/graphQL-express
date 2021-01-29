const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  # scalar type
  scalar DateTime

  type Query {
    me: String!
    profile: User!
    publicProfile(username: String!): User!
    allUsers: [User!]
  }
  type UserCreateResponse {
    username: String!
    email: String!
  }

  # image input
  input ImageInput {
    url: String
    public_id: String
  }

  type Image {
    url: String
    public_id: String
  }

  # returned user type
  type User {
    _id: ID!
    username: String
    name: String
    email: String
    images: [Image]
    about: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input UserUpdateInput {
    username: String
    name: String
    images: [ImageInput]
    about: String
    email: String
  }

  type Mutation {
    userCreate: UserCreateResponse!
    userUpdate(input: UserUpdateInput!): User
  }
`;
