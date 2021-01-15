const authCheck = require("../helpers/auth");

const me = (_, args, { req, res }) => {
  authCheck.authCheck(req, res);
  return "UJJWOL";
};

module.exports = {
  Query: {
    me,
  },
};
