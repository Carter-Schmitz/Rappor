import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_USER_SEARCH } from "../../utils/queries";
import { List, ListItem } from "@chakra-ui/layout";
import SearchResults from "../SearchResults";
import { useParams } from 'react-router-dom';


const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var input =  e.target.value;
    setInputText(input);
  };

    return (
      <div className="main">
        <div className="search">
          <input
            id="user-search"
            value={searchValue}
            onChange={inputHandler}
            variant="outlined"
            label="Search"
            placeholder="Search for friends..."
          />
        </div>
        <SearchResults inputText={inputText}/>
      </div>
    );
  };


export default SearchBar;
