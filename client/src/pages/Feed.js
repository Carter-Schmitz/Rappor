import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Heading, HStack, Button, Textarea } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import PostList from "../components/PostList/PostList";

import { QUERY_POSTS } from "../utils/queries";

const Feed = () => {
  const { register, handleSubmit, reset } = useForm();
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  console.log(posts) 

  function handlePost(data) {
    console.log(data);
    reset();
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handlePost)}>
        <HStack justify="space-between">
          <Heading size="lg">Start a Rappor</Heading>
          <Button colorScheme="red" type="submit">
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          borderColor="purple"
          placeholder="Create a new Rappor..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
      <PostList />
    </Box>
  );
};

export default Feed;
