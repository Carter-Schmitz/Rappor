import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { List, ListItem } from "@chakra-ui/layout";
import SearchResults from "../SearchResults";


const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  
  let inputHandler = (e) => {
    //convert input text to lower case
    var input = e.target.value;
    setInputText(input);
  };


    return (
      <div className="main">
        <h1>React Search</h1>
        <div className="search">
          <input
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <SearchResults inputText={inputText}/>
      </div>
    );
  };


export default SearchBar;
