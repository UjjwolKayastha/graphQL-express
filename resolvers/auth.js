const { authCheck } = require("../helpers/auth");
const shortId = require("shortid");

const User = require("../models/user");

const me = async (_, args, { req, res }) => {
  await authCheck(req, res);
  return "UJJWOL";
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

module.exports = {
  Query: {
    me,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
