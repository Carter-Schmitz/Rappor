import React, {useState, useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Box, Button, Heading, Spinner } from '@chakra-ui/react';


import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList/PostList';


import { QUERY_USER, QUERY_ME, QUERY_IS_FRIENDS } from '../../utils/queries';

import Auth from '../../utils/auth';
import { List, ListItem } from '@chakra-ui/layout';
import TopTen from '../../components/topTen';

import { ADD_FRIEND, ADD_PENDING } from '../../utils/mutations';

import "./profile.css"

const Profile = () => {
  const { username } = useParams();
  const { data: me } = useQuery(QUERY_ME);

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username },
  });
  
  const { data: friendCheck } = useQuery(QUERY_IS_FRIENDS, {
    variables: { username },
  });

  const user = data?.me || data?.userByUsername;
  console.log(user)
  const [addPending, { error: pendingError }] = useMutation(ADD_PENDING, { 
    refetchQueries: [
      {query: QUERY_IS_FRIENDS,
       variables: { username }},
      ],
      awaitRefetchQueries: true
  });
 
  const [addFriend, { error: addError }] = useMutation(ADD_FRIEND, {
    refetchQueries: [
      {query: QUERY_IS_FRIENDS,
        variables: { username }},
       ],
       awaitRefetchQueries: true
  });


  // navigate to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to={`/me`} />; 
  }

  if ( addError || pendingError) {
    Error(addError || pendingError)
  }
 
  if (loading) {
    return <div style={{textAlign:"center", marginTop:"100px"}}><Spinner thickness='4px'
    speed='0.45s'
    emptyColor='gray.200'
    color='orange.500'
    size='xl'/>
    </div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  let sortedTopTen = [...me?.me.friends];

  sortedTopTen.sort(function(a, b) {
    let keyA = (a.topTenRank);
    let keyB = (b.topTenRank);

    keyA = Number(keyA) 
    keyB = Number(keyB) 
    // Compare the 2 ranks
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })

  return (
    <div>
    <Box mx="auto" py="10">
      <div className="mb-3">
        <div id="aside-box">
        <aside>
          <h1>Top 10</h1>
       <List>
        {me?.me?.friends &&
          sortedTopTen.map((friend) => (
            <TopTen
              key={friend.friendId}
              username={friend.friendUsername}
              friendId={friend.friendId}
              topTenRank={friend.topTenRank}
            ></TopTen>
          ))}
      </List>
       </aside>
       <section>
       <Heading className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user?.username}'s` : "your"} profile.
        </Heading>
        {!username && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            // style={{ border: "1px dotted #1a1a1a" }}
          >
            <PostForm />
          </div>
        )}
        <Box className="col-12 col-md-10 mb-5" justifyItems="center">
          <PostList
            posts={user?.posts}
            title={username ? `${user?.username}'s Posts...` : "Your Posts..."}
            showTitle={false}
            showUsername={false}
          />
        </Box>
       </section>
      </div>
        {username ? (
          friendCheck?.isFriends === "FRIEND" ? (
            <Button> Remove Friend</Button>
          ) : friendCheck?.isFriends === "PENDING_ACCEPT" ? (
            <Button>Friend Request Sent</Button>
          ) : friendCheck?.isFriends === "PENDING_REQ" ? (
            <Button
              onClick={() => {
                addFriend({ variables: { pendingId: user?._id } });
              }}
            >
              Accept Friend Request
            </Button>
          ) : (
            <Button
              onClick={() => {
                addPending({ variables: { username } });
              }}
            >
              {" "}
              Add Friend
            </Button>
          )
        ) : null}
        {/* {!username && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            // style={{ border: "1px dotted #1a1a1a" }}
          >
            <PostForm />
          </div>
        )} */}
      </div>
    </Box>
    </div>
  );
};

export default Profile;