import { List, ListItem } from "@chakra-ui/layout";
import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import FriendsList from "../../pages/FriendsList";
import { FaUser, FaEllipsisH  } from 'react-icons/fa';
import { IconButton, Button } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'


const TopTen = ({username, topTenRank, friendId}) => {

    // going to build modal for selecting rank when the menu item is clicked
    const Modal = () => {      
    
      };

if (11 > topTenRank > 0 ) {
    return (<div>
        <ListItem>
    <div>{username}</div> 
    <div>Rank: {topTenRank}</div>
<Menu>
  <MenuButton>{<FaEllipsisH />}
  </MenuButton>
  <MenuList>
    <MenuItem onClick={() => {}}>Remove Friend</MenuItem>
    <MenuItem onClick={Modal}>Change Rank</MenuItem>
  </MenuList>
</Menu>
</ListItem>
    </div>
    )
}
return
};

export default TopTen;
