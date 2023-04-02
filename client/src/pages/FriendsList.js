import { List, ListItem } from "@chakra-ui/layout";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FaUser, FaEllipsisV } from "react-icons/fa";
import { ADD_FRIEND, ADD_PENDING } from '../utils/mutations';
import  FriendArray  from "../components/friendArray/index";
import  TopTen  from "../components/topTen/index";

const FriendsList = ({username}) => {
  const [FriendList, setFriends] = useState("");

  const { data: me } = useQuery(QUERY_ME);

  const { data: friendCheck } = useQuery(QUERY_IS_FRIENDS, {
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

  return (
    <Box>
      <h2>Top Ten</h2>
      <List>
      {me?.me?.friends &&
        me?.me?.friends.map((friend) => (
          <TopTen key={friend.friendId} username={friend.friendUsername} friendId={friend.friendId} topTenRank={friend.topTenRank}></TopTen>  
        ))}
      </List>
      <h3>FriendsList</h3>
      {me?.me?.friends &&
        me?.me?.friends.map((friend) => (
          <FriendArray key={friend.friendId} username={friend.friendUsername} friendId={friend.friendId}></FriendArray>  
        ))}
    </Box>
  );
};

export default FriendsList;
