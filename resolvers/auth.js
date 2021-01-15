const { authCheck } = require("../helpers/auth");

const me = async (_, args, { req, res }) => {
  await authCheck(req, res);
  return "UJJWOL";
};

module.exports = {
  Query: {
    me,
  },
};
