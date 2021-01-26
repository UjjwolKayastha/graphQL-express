const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  type Query {
    me: String!
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
    public: String
  }

  # returned user type
  type User {
    _id: ID!
    username: String
    name: String
    email: String
    images: [Image]
    about: String
    createdAt: String
    updatedAt: String
  }

  input UserUpdateInput {
    username: String
    name: String
    images: [ImageInput]
    about: String
  }

  type Mutation {
    userCreate: UserCreateResponse!
    userUpdate(input: UserUpdateInput): User
  }
`;
