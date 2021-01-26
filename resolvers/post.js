const { posts } = require("../temp");
const { authCheck } = require("../helpers/auth");

const totalPosts = () => posts.length;

const allPosts = async (parent, args, { req }) => {
  await authCheck(req);
  return posts;
};

//mutation
const newPost = (parent, args, context) => {
  //create new post object
  // console.log(args.input);
  // const { title, description } = args.input;

  const post = {
    id: posts.length + 1,
    // title,
    // description,
    ...args.input,
  };

  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },

  Mutation: {
    newPost,
  },
};
