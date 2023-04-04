import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextareaAutosize from "react-textarea-autosize";
import { Box, Heading, Button, Textarea } from "@chakra-ui/react";

import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const PostForm = () => {
  const [PostText, setPostText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST);
  if (error) {
    return (error)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
  };

  return (
    <Box maxW="600px" mx="auto" py="10">
      <Heading size="md" mb={5}>What's on your mind?</Heading>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <Textarea
                as={TextareaAutosize}
                borderColor="red"
                resize="none"
                minRows={3}
                name="PostText"
                bg="ivory"
                placeholder="Create a new Post..."
                value={PostText}
                className="form-input w-100"
                onChange={handleChange}
              ></Textarea>
              <p
                className={`m-0 ${
                  characterCount === 280 || error ? "text-danger" : ""
                }`}
              >
                Character Count: {characterCount}/280
              </p>
            </div>

            <div className="col-12 col-lg-3">
              <Button
                className="btn btn-primary btn-block py-3"
                type="submit"
                bg="red.600"
                mt={2}
              >
                Add Post
              </Button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your Posts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Box>
  );
};

export default PostForm;