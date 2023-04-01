import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { Box, Heading, HStack, Button, Textarea } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import PostList from "../components/PostList/PostList";

import { ADD_POST } from "../utils/mutations";

const Feed = () => {
  const [PostText, setPostText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST);
  if (error) {
    return (error)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(PostText)
    try {
      const { data } = await addPost({
        variables: {
          postText: PostText
        },
      });

      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'PostText' && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleFormSubmit}>
        <HStack justify="space-between">
          <Heading size="lg">Start a Rappor</Heading>
          <Button colorScheme="red" type="submit">
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          name="PostText"
          resize="none"
          mt="5"
          inputMode="text"
          value={PostText}
          borderColor="purple"
          placeholder="Create a new Rappor..."
          minRows={3}
          onChange={handleChange}
        />
      </form>
      <PostList />
    </Box>
  );
};

export default Feed;
