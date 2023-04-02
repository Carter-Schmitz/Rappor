import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import PostForm from '../components/PostForm';
import PostList from '../components/PostList';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { List, ListItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import TopTen from '../components/topTen';

const Profile = () => {
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username},
  });
  console.log(username) 


  const user = data?.me || data?.userByUsername || {};
  console.log(data)
  // navigate to personal profile page if username is yours
      if (!Auth.loggedIn() && !Auth.getProfile().data.username === username) {
    return <Navigate to={`/profiles/${username}`} />; 
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

      <Button> Add Friend</Button>
        <div className="col-12 col-md-10 mb-5">

          <PostList

            posts={data?.me?.posts}
            title={`${data?.me?.username}'s Posts...`}
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