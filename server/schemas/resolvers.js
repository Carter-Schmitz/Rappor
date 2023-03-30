const { Post, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('posts');
      },
      userByUsername: async (parent, { username }) => {
        return User.findOne({username: username}).populate('posts');
      },
      userById: async (parent, { id }) => {
        return User.findOne({_id: id}).populate('posts');
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
      //add friend mutation to be called after pending friend is accepted
      addFriend: async (parent, {pendingId}, context) => {
        console.log(pendingId)
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          //friend that sent request having current user added to their friend list
          const pendingFriend = await User.findOneAndUpdate(
            { _id:pendingId },
            {
              $addToSet: { friends: {friendId: context.user._id, friendUsername: context.user.username}  },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: {friends: {friendId: pendingId, friendUsername: pendingFriend.username}},
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('You need to be logged in!');
      },
    }
}

module.exports = resolvers;