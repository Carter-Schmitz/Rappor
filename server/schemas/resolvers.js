const { Post, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('posts');
      },
      posts: async () => {
        return Post.find();
      },
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect Credentials!!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect Credentials!!');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    }
}

module.exports = resolvers;