import React, {useState, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { Box, Heading, HStack, Button, Textarea } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import PostList from "../components/PostList/PostList";
import { QUERY_FRIENDS_POSTS, QUERY_ME } from '../utils/queries';
import { ADD_POST } from "../utils/mutations";
import Auth from '../utils/auth';

const Feed = () => {
  const [PostText, setPostText] = useState('');

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [
      {query: QUERY_FRIENDS_POSTS}
    ],
    awaitRefetchQueries: true
  });

  const { data: posts}= useQuery(QUERY_FRIENDS_POSTS); 
  //console.log("this is posts", posts?.friendsPosts)


  const { loading, data: me } = useQuery(QUERY_ME); 
  //console.log("this is posts",me)

  // navigate to personal profile page if username is yours
      if (!Auth.loggedIn() && !Auth.getProfile().data.username === me?.username) {
    return <Navigate to="/feed" />; 
  }
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (error)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
       await addPost({
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
    }
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleFormSubmit}>
        <HStack justify="space-between">
          <Heading size="lg" color="Black">Start a Rappor</Heading>
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
          borderColor="red.600"
          placeholder="Create a new Rappor..."
          bg="ivory"
          textColor="black"
          minRows={3}
          onChange={handleChange}
        />
      </form>
      <PostList
      posts={posts?.friendsPosts}
      title={`Your Feed...`}
      showTitle={false}
      showUsername={false} />
    </Box>
  );
};

export default Feed;
