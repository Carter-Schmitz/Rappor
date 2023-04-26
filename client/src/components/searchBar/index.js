import { React, useState } from "react";
import SearchResults from "../SearchResults";
import "./searchBar.css"

const SearchBar = () => {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    console.log('incoming values')

    var input =  e.target.value;
    setInputText(input);
  };

  const resetStates = () => {
    console.log('reset values')
    setInputText("")
  }

    return (
      <div className="main">
        <div className="search">
          <form> 
          <input
            type="text"
            id="user-search"
            value={inputText}
            onChange={inputHandler}
            variant="outlined"
            label="Search"
            placeholder="Search for friends..."
            autoComplete="off"
          />
        <SearchResults resetStates={resetStates} inputText={inputText}/>
        </form>
        </div>
      </div>
    );
  };


export default SearchBar;
