import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SEARCH } from "../../utils/queries";
import { List, ListItem} from "@chakra-ui/layout";
import "./searchResult.css"
import { useNavigate } from "react-router-dom";

const SearchResults = ({ inputText, resetStates }) => {

const { data } = useQuery(QUERY_USER_SEARCH, {
  variables: { username: inputText, limit: 5 },
});

  const navigate = useNavigate();

  const handleSearch = (endpoint) => {
    resetStates()

    navigate(endpoint)
  }

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
              <button onClick={() => {handleSearch(endpoint)}}>{user.username}</button>
            </ListItem>
          }

          return null
        })}
      </List>
    );
  }

};

export default SearchResults