const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = require("./Comment");

const postSchema = new Schema({
  postText: {
    type: String,
    required: "You need to leave a post!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentSchema],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
});

const Post = model("Post", postSchema);

module.exports = Post;
