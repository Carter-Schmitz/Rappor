import { List, ListItem } from "@chakra-ui/layout";
import React from "react";


const FriendsList = ({user, friends}) => {
  
  return (
    <List>
    {friends && user.friends.map((friend) => (
        <ListItem key={friend._id}> {friend.friendUsername}</ListItem>
      ))}
    </List>
  )
}

export default FriendsList