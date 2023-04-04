import { React, useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_USER_SEARCH } from "../../utils/queries";
import { List, ListItem} from "@chakra-ui/layout";
import "./searchResult.css"
import { extendTheme, Button } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";



const SearchResults = ({inputText, resetStates}) => {

const { loading: queryCheck, data } = useQuery(QUERY_USER_SEARCH, {
  variables: { username: inputText, limit: 5 },
});

  //console.log(data)
  const users = data?.userSearch;

  if (inputText && users) {
    if (!users?.length) {
      return (
        <List id="search-list">
          <ListItem className="results-item">No matches found...</ListItem>;
        </List>
      )
    }
    
    return (
      <List id="search-list">
        {users.map((user) => {
          if (user?.username) {
            const endpoint = `/profiles/${user?.username}`
            return <ListItem className="results-item" key={user.username}>
            <Link to={endpoint} onClick={resetStates}>{user.username}</Link>
            </ListItem>
          }
        })}
      </List>
    );
  }
 
};

export default SearchResults