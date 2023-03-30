const { Schema } = require("mongoose");

const pendingFriendSchema = new Schema({
  pendingUsername: {
    type: String,
  },
  pendingId: { 
    type: String, 
},
});

module.exports = pendingFriendSchema;
