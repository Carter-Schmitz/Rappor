const { Schema, mongoose} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = require("./Comment");

const postSchema = new Schema({
  _id: { 
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
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
  timeSort: {
    type: Number,
    default: Date.now,
  },
  comments: [commentSchema],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});


module.exports = postSchema;
