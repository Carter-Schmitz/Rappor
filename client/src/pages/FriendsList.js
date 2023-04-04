import { List, ListItem } from "@chakra-ui/layout";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { QUERY_USER, QUERY_ME, QUERY_IS_FRIENDS } from "../utils/queries";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  CardBody,
  CardFooter,
  IconButton,
  Text,
  Spinner
} from "@chakra-ui/react";
import { FaUser, FaEllipsisV } from "react-icons/fa";
import { ADD_FRIEND, ADD_PENDING, CHANGE_RANK } from '../utils/mutations';
import  FriendArray  from "../components/friendArray/index";
import  TopTen  from "../components/topTen/index";
import Auth from "../utils/auth"

const FriendsList = ({username}) => {
  const [FriendList, setFriends] = useState("");

  const { loading: loadMe, data: me } = useQuery(QUERY_ME);

  const { loading: loadFriends, data: friendCheck } = useQuery(QUERY_IS_FRIENDS, {
    variables: { username },
  });

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

  if (loadFriends || loadMe) {
    return <div style={{textAlign:"center", marginTop:"100px"}}><Spinner thickness='4px'
    speed='0.45s'
    emptyColor='gray.200'
    color='orange.500'
    size='xl'/>
    </div>;
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
    <Box align="center">
      <Heading size="lg">Top Ten</Heading>
      <List borderBottom="1px" borderBottomColor="red.600">
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
      <Heading size="md">FriendsList</Heading>
      {me?.me?.friends &&
        me?.me?.friends.map((friend) => (
          <FriendArray
            key={friend.friendId}
            username={friend.friendUsername}
            friendId={friend.friendId}
          ></FriendArray>
        ))}
    </Box>
  );
};

export default FriendsList;
