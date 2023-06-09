import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    userByUsername(username: $username) {
      _id
      username
      posts {
        _id
        postText
        createdAt
      }
      friends {
        friendId
        friendUsername
        topTenRank
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postText
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglepost($postId: ID!) {
    post(postId: $postId) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
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
export const QUERY_FRIENDS_POSTS = gql`
  query friendPosts {
    friendsPosts {
      _id
      postAuthor
      postText
      timeSort
      createdAt
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
      downVotes {
        _id
        username
      }
    }
  }
`;

export const QUERY_IS_FRIENDS = gql`
query isFriends($username: String) {
  isFriends(username: $username)
}
`;

export const QUERY_USER_SEARCH = gql`
  query userSearch($username: String!, $limit: Int) {
    userSearch(username: $username, limit: $limit) {
      _id
      username
    }
  }
`;