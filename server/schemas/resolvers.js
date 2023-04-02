const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        const user = User.findOne({_id: context.user._id});
        return user
      },
      users: async () => {
        return User.find();
      },
      userByUsername: async (parent, { username }) => {
        return User.findOne({username: username});
      },
      userById: async (parent, { id }) => {
        return User.findOne({_id: id});
      },
      friendsPosts: async (parent, args, context) => {
        const user = await User.findOne({_id: context.user._id})

        let allPosts = [...user.posts];

        const data = Promise.all(
            user.friends.map(async (friend) => {
            const id = friend.friendId;
            const friendData = await User.findOne({_id: id})
            const friendPosts = friendData.posts;
            allPosts = [...allPosts, ...friendPosts]
            }
          )
        )

        return Promise.resolve(data).then(() => {
          allPosts.sort(function(a, b) {
            let keyA = (a.timeSort);
            let keyB = (b.timeSort);
            // Compare the 2 dates
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });

          return allPosts
        })
      }
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
      //mutation for addin current user to another users pending users array
      addPending: async (parent, {username}, context) => {
        if (context.user) {
          const pendingCheck = await User.findOne({username: username})
          
          const updateUser = async () => {
            const pendingFriend = await User.findOneAndUpdate(
              { username: username },
              {
                $addToSet: { pendingFriends: {pendingUsername: context.user.username, pendingId: context.user._id}  },
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }

          //check if user is already pending
          const check = pendingCheck.pendingFriends.some(request => request.pendingId === context.user._id) 

          check ? console.log("Already Pending") : updateUser();

          return User.findOne({_id: context.user._id});
        }
      },
      //add friend mutation to be called after pending friend is accepted
      addFriend: async (parent, {pendingId}, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          //check for users friends to see if either of them already match
          const pendingCheckUser = await User.findOne({_id: context.user._id})
          const pendingCheckReq = await User.findOne({_id: pendingId})

          if (pendingCheckUser == null || pendingCheckReq == null) {
            return Error("User not found")
          }

            //current user setting the accepted request to a friend and removing the pending request
          const updateUsersFriends = async () => {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $addToSet: {friends: {friendId: pendingId, friendUsername: pendingCheckReq.username}},
                $pull: {pendingFriends: {pendingId: {$eq: pendingId}}}
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }

          const updateReqFriends = async () => {
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
          }

          //check if request is already a friend
          if (pendingCheckReq.friends.length) {
          const checkReq = pendingCheckReq.friends.some(request => request.friendId === context.user._id) 
          checkReq ? console.log("Req is already friends with User") : await updateReqFriends();
          } else {
            updateReqFriends()
          }
         
          //check if current user is already a friend of requesting user
          if (pendingCheckUser.friends.length) {
            const checkUser = pendingCheckUser.friends.some(request => request.friendId === pendingId) 
            checkUser ? console.log("User is already friends with Req") : await updateUsersFriends();
          } else {
            updateUsersFriends()
          }

          return User.findOne({_id: context.user._id});
        }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('You need to be logged in!');
      },

      addPost: async (parent, { postText }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $addToSet: {posts: {postText: postText, postAuthor: context.user.username, downVotes: []}},
              },
              {
                new: true,
                runValidators: true,
              }
            );
        }

        throw new AuthenticationError('You need to be logged in!');
      },
      removePost: async (parent, { postId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $pull: {posts: {_id: {$eq: postId}}},
              },
              {
                new: true,
                runValidators: true,
              }
            );
        }

        throw new AuthenticationError('You need to be logged in!');
      },

      addComment: async (parent, { username, postId, commentText }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
              {"posts.$[elem]":postId },
              {
                $addToSet: { "posts.$[elem].comments": {commentText: commentText, commentAuthor: context.user.username}}
              },
              {
                arrayFilters: [{ "elem._id": postId}],
                new: true,
                runValidators: true,
              }
            );


        }

        throw new AuthenticationError('You need to be logged in!');
      },
    }
}

module.exports = resolvers;