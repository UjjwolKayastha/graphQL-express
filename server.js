const { ApolloServer } = require("apollo-server-express");
const { db } = require("./db");
const http = require("http");
const express = require("express");
require("dotenv").config();

const { authCheck, authCheckMiddleware } = require("./helpers/auth");
const cors = require("cors");
const path = require("path");

const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");

//express server
const app = express();

db();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

//graphql server

//types query/mutation/subscription
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs"))
);

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  //request and response as context
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

app.get("/rest", authCheck, function (req, res) {
  res.json({
    data: "API is working...",
  });
});

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//upload image to cloudinary
app.post("/uploadimages", authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      console.log("RESULT", result);
      res.send({
        url: result.secure_url,
        public_id: result.public_id,
      });
    },
    {
      public_id: `${Date.now()}`, //public name
      resource_type: "auto", //JPEG, PNG
    }
  );
});

//delete image
app.post("/removeimage", authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.send("OK");
  });
});

httpServer.listen(process.env.PORT, function () {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
