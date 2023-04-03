const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = require("./Comment");

const multiPostSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
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
  },
  timeSort: {
    type: Number,
  },
  comments: [commentSchema],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const MultiPost = model("MultiPost", multiPostSchema);

module.exports = MultiPost;
