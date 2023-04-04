import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_IS_FRIENDS } from "../../utils/queries";
import { ADD_FRIEND, ADD_PENDING } from "../../utils/mutations";
import { Box, Button, Card, CardHeader, Flex, Avatar, Heading, CardBody, CardFooter, IconButton, Text } from "@chakra-ui/react";
import { FaUser, FaEllipsisV } from "react-icons/fa";
import "./friendArray.css";

const FriendArray = ({username, friendId}) => {
  const { data: friendCheck } = useQuery(QUERY_IS_FRIENDS, {
    variables: { username },
  });

  

  const [addPending, { error: pendingError }] = useMutation(ADD_PENDING, {
    refetchQueries: [{ query: QUERY_IS_FRIENDS, variables: { username } }],
    awaitRefetchQueries: true,
  });

  const [addFriend, { error: addError }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: QUERY_IS_FRIENDS, variables: { username } }],
    awaitRefetchQueries: true,
  });
  return (
    <div>
      {username ? (
        friendCheck?.isFriends === "FRIEND" ? (
          <Button> Remove Friend</Button>
        ) : friendCheck?.isFriends === "PENDING_ACCEPT" ? (
          <Button>Friend Request Sent</Button>
        ) : friendCheck?.isFriends === "PENDING_REQ" ? (
          <Button
            onClick={() => {
              addFriend({ variables: { pendingId: friendId } });
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
      <Card
        key={friendId}
        className="friendcard"
        // maxW={900}
      >
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar mt={30}>
                <FaUser />
              </Avatar>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="grey"
              aria-label="see menu"
              icon={<FaEllipsisV />}
            />
          </Flex>
        </CardHeader>
        <CardBody alignItems="center">
          <Heading mb={70} size="lg">{username}</Heading>
        </CardBody>
      </Card>
    </div>
  );
};

export default FriendArray;
