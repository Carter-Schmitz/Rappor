const { Post, User } = require('../models');


const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('posts');
      },
      posts: async () => {
        return Post.find();
      },
    },
}

module.exports = resolvers;