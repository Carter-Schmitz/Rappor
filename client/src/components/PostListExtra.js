import React from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsDown, FaComment, FaShareSquare } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  Avatar,
  Heading,
  CardBody,
  CardFooter,
  IconButton,
  Text,
  Button
} from "@chakra-ui/react";

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (posts?.length == undefined) {
    return <h3>No posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <Card key={post._id} className="card mb-3" border="1px" borderColor="red.600">
            <CardHeader className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${post.postAuthor}`}
                >
                  {post.postAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    made this post on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You made this post on {post.createdAt}
                  </span>
                </>
              )}
            </CardHeader>
            <CardBody className="card-body bg-light p-2">
              <Text>{post.postText}</Text>
            </CardBody>
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{ "& > button": { minW: "136px" } }}
            >
              <Button flex="1" variant="ghost" leftIcon={<FaThumbsDown />}>
                Downvote
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<FaComment />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<FaShareSquare />}>
                Share
              </Button>
            </CardFooter>

            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Join the discussion on this post.
            </Link>
          </Card>
        ))}
    </div>
  );
};

export default PostList;
