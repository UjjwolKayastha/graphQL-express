const { authCheck } = require("../helpers/auth");
const shortId = require("shortid");

const User = require("../models/user");

const { DateTimeResolver } = require("graphql-scalars");

const me = async (_, args, { req, res }) => {
  await authCheck(req, res);
  return "UJJWOL";
};

const profile = async (_, args, { req }) => {
  const currentUser = await authCheck(req);
  return await User.findOne({ email: currentUser.email }).exec();
};

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortId.generate(),
      }).save();
  if (currentUser) {
  }
};

const userUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  console.log(args);
  const updatedUser = await User.findOneAndUpdate(
    { email: currentUser.email },
    { ...args.input },
    { new: true }
  ).exec();
  return updatedUser;
};

const publicProfile = async (parent, args, { req }) => {
  return await User.findOne({ username: args.username }).exec();
};

const allUsers = async (parent, args, { req }) => {
  return await User.find({}).exec();
};

module.exports = {
  Query: {
    me,
    profile,
    publicProfile,
    allUsers,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
