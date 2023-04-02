import React, {useState, useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';


import PostForm from '../components/PostForm';
import PostList from '../components/PostList/PostList';


import { QUERY_USER, QUERY_ME, QUERY_IS_FRIENDS } from '../utils/queries';

import Auth from '../utils/auth';
import { List, ListItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import TopTen from '../components/topTen';

import { ADD_FRIEND, ADD_PENDING } from '../utils/mutations';

const Profile = () => {
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username },
  });
  
  const { data: friendCheck } = useQuery(QUERY_IS_FRIENDS, {
    variables: { username },
  });

  const user = data?.me || data?.userByUsername || {};

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
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className='topTen'>
          
        </div>

      {username ? 
      friendCheck?.isFriends === "FRIEND" ? <Button> Remove Friend</Button> :
      friendCheck?.isFriends  === "PENDING_ACCEPT" ? <Button>Friend Request Sent</Button> :
      friendCheck?.isFriends  === "PENDING_REQ" ? <Button onClick={() => {addFriend({variables: { pendingId: user?._id }})}}>Accept Friend Request</Button> :
      <Button onClick={() => {addPending({variables: { username }})}}> Add Friend</Button>
      : null}

        <div className="col-12 col-md-10 mb-5">

          <PostList

            posts={user?.posts}
            title={username ? `${user?.username}'s Posts...` : 'Your Posts...'}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!username && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >

            <PostForm />

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;