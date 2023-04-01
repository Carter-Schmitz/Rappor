import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import PostForm from '../components/PostForm';
import PostList from '../components/PostList';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { List, ListItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);
  console.log("query me data",data)

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
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
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className='topTen'>
          <List>
            <ListItem> {user.friends.topTenRank(1)} </ListItem>
            
            <ListItem> {user.friends.topTenRank(2)} </ListItem>
            <ListItem> {user.friends.topTenRank(3)} </ListItem>
            <ListItem> {user.friends.topTenRank(3)} </ListItem>
            <ListItem> {user.friends[4]} </ListItem>
            <ListItem> {user.friends[5]} </ListItem>
            <ListItem> {user.friends[6]} </ListItem>
            <ListItem> {user.friends[7]} </ListItem>
            <ListItem> {user.friends[8]} </ListItem>
            <ListItem> {user.friends[9]} </ListItem>
          </List>
        </div>
        <div className="col-12 col-md-10 mb-5">

          <PostList

            posts={user.posts}
            title={`${user.username}'s Posts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
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