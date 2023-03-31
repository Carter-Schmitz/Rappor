const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
    friends: [Friend]
    pendingFriends: [PendingFriend]
  }

  type Friend {
    friendId: String
    friendUsername: String
    topTenRank: String
  }

  type PendingFriend {
    pendingUsername: String
    pendingId: String
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
    downVotes: [User]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    downVotes: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    posts: [Post]
    userByUsername(username:String): User
    userById(id:String): User
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(pendingId: String): User
    addPending(username: String): User
  }
`;

module.exports = typeDefs;
