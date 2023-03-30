const { Schema } = require("mongoose");

const friendSchema = new Schema({
  friendId: {
    type: String
  },
  friendUsername: {
    type: String,
  },
  topTenRank: {
    required: true,
    type: Number,
    default: 0,
  },
});


module.exports = friendSchema;
