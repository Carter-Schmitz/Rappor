import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_USER_SEARCH } from "../../utils/queries";
import { List, ListItem } from "@chakra-ui/layout";

const SearchResults = ({username, inputText}) => {

console.log(inputText)

  const  { data } = useQuery(QUERY_USER_SEARCH, {
    variables: { username: inputText },
  });
  console.log(data)
  const user = data?.userSearch;
  console.log(user)
  return (
    <List>
      {user?.map((inputText) => {
        if (user?.username.includes(inputText)) {
          return <ListItem key={user.username}> {user.username}</ListItem>;
        }
      })}
    </List>
  );
};

export default SearchResults