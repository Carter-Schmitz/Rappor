import React from 'react'
import { FaUser, FaEllipsisV } from 'react-icons/fa';
import { Box, Card, CardHeader, Flex, Avatar, Heading, CardBody, CardFooter, IconButton, Text } from "@chakra-ui/react";

import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if (!posts?.length) {
        return <h3>Nothing to see here...</h3>
    }

  return (
    <Box>
      <h3>{title}</h3>
      {posts &&
              posts.map((post) => ( <Card key={post._id}>
                  <CardHeader>
                      <Flex spacing="4">
                          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                              <Avatar>
                                  <FaUser />
                              </Avatar>
                              <Box>
                                  <Heading size="sm">
                                      {post.postAuthor} <br />
                                      <span style={{ fontsize: "1rem" }}>posted at {post.createdAt}</span>
                                  </Heading>
                              </Box>
                          </Flex>
                          <IconButton variant="ghost" colorScheme="grey" aria-label="see menu"
                              icon={<FaEllipsisV />} />
                      </Flex>
                  </CardHeader>
                  <CardBody>
                      <Text>{post.postText}</Text>
                  </CardBody>
        </Card> ))}
    </Box>
  );
}

export default PostList;