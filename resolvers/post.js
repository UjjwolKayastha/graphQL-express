const { posts } = require("../temp");

const totalPosts = () => posts;

module.exports = {
  Query: {
    totalPosts,
  },
};
