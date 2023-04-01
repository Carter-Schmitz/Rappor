import { React, useState } from "react";
import TextField from "@mui/material/TextField";


const SearchBar = (props) => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    const filteredData = props.filter((el) => {
      //if no input the return the original
      if (props.input === "") {
        return el;
      }
      //return the item which contains the user input
      else {
        return el.text.toLowerCase().includes(props.input);
      }
    });
    return (
      <div className="main">
        <h1>React Search</h1>
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    );
  };
};

export default SearchBar;
