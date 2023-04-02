import { List, ListItem } from "@chakra-ui/layout";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import React, {useState, useEffect} from "react";
import { QUERY_ME } from "../utils/queries";
import { Box, Card, CardHeader, Flex, Avatar, Heading, CardBody, CardFooter, IconButton, Text } from "@chakra-ui/react";
import { FaUser, FaEllipsisV } from 'react-icons/fa';

const FriendsList = () => {
  const [FriendList, setFriends] = useState('');

  const { data: me }= useQuery(QUERY_ME); 
  const { loading, data: user } = useQuery(QUERY_ME); 
  
const handleChange = (event) => {
  const { name, value } = event.target;
}
  return (
    <Box>
      <h3>FriendsList</h3>
      {me?.me?.friends &&
              me?.me?.friends.map((friend) => ( <Card key={friend.friendId}>
                  <CardHeader>
                      <Flex spacing="4">
                          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                              <Avatar>
                                  <FaUser />
                              </Avatar>
                          </Flex>
                          <IconButton variant="ghost" colorScheme="grey" aria-label="see menu"
                              icon={<FaEllipsisV />} />
                      </Flex>
                  </CardHeader>
                  <CardBody>
                      <Text>{friend.friendUsername}</Text>
                  </CardBody>
        </Card> ))}
    </Box>
  )
}

export default FriendsList