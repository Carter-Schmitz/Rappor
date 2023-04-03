import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      username
      posts {
        _id
        postText
        postAuthor
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          downVotes {
            _id
            username
          }
        }
        createdAt
        downVotes {
          _id
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_PENDING = gql`
  mutation AddPending($username: String) {
    addPending(username: $username) {
      username
      friends {
        friendId
        friendUsername
        topTenRank
      }
      pendingFriends {
        pendingUsername
        pendingId
      }
      _id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($pendingId: String) {
    addFriend(pendingId: $pendingId) {
      username
      friends {
        friendId
        friendUsername
        topTenRank
      }
      pendingFriends {
        pendingUsername
        pendingId
      }
    }
  }
`;
