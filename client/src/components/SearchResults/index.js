import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { List, ListItem } from "@chakra-ui/layout";

const SearchResults = ({username}) => {



  const { data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  const user = data?.userByUsername;
  console.log(user)
  return (
    <List>
      {user.map((inputText) => {
        if (user.username == inputText) {
          return <ListItem key={user.username}> {user.username}</ListItem>;
        }
      })}
    </List>
  );
};
