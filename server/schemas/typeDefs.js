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
    timeSort: String
    comments: [Comment]
    downVotes: [User]
  }

  type MultiPost {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    timeSort: String
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
    user(username: String!): User
    posts(username: String): [Post]
    userByUsername(username:String): User
    userById(id:String): User
    me: User
    friendsPosts: [MultiPost]
    isFriends(username: String): String
    userSearch(username: String, limit: Int): [User]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(pendingId: String): User
    addPending(username: String): User
    addPost(postText: String): User
    removePost(postId: String): User
    addComment(postId: String, commentText: String): User
    changeRank(username: String, newRank: String): User
  }
`;

module.exports = typeDefs;
