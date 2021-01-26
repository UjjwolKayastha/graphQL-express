const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true, //it is used for indexing while querying
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    images: {
      type: Array,
      default: [
        {
          url: "http://via.placeholder.com/150x150.png?text=%20Profile%20Image",
          public_id: Date.now,
        },
      ],
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
