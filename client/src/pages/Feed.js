import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { Box, Heading, HStack, Button, Textarea } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import PostList from "../components/PostList/PostList";
import { useForm } from "react-hook-form";
import { QUERY_FRIENDS_POSTS } from '../utils/queries';
import { ADD_POST } from "../utils/mutations";
import Auth from '../utils/auth';

const Feed = () => {
  const [PostText, setPostText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);
  const [addPost, { error }] = useMutation(ADD_POST);
  const { loading, data } = useQuery(QUERY_FRIENDS_POSTS);
  console.log("this is Auth",data) 


  const user = data?.user || {};
  //console.log(user)
  // navigate to personal profile page if username is yours
      if (!Auth.loggedIn() && !Auth.getProfile().data.username === data?.me?.username) {
    return <Navigate to="/feed" />; 
  }
 
  if (loading) {
    return <div>Loading...</div>;
  } ;

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
          <Heading size="lg" color="ivory">Start a Rappor</Heading>
          <Button
            colorScheme="red"
            type="submit"
            color="ivory"
            _hover={{ color: "cyan", transition: "80ms" }}
          >
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
          borderColor="beige"
          placeholder="Create a new Rappor..."
          bg="ivory"
          textColor="black"
          minRows={3}
          onChange={handleChange}
        />
      </form>
      <PostList
        posts={data?.me?.posts}
        title={`${data?.me?.username}'s Posts...`}
        showTitle={false}
        showUsername={false}
        textColor="ivory"
      />
    </Box>
  );
};

export default Feed;
