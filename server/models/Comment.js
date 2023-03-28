const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
});

module.exports = commentSchema;
