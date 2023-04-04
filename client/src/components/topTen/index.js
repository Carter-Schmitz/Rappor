import { List, ListItem } from "@chakra-ui/layout";
import React, { useState } from 'react';
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import FriendsList from "../../pages/FriendsList";
import { FaUser, FaEllipsisH } from "react-icons/fa";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { CHANGE_RANK } from "../../utils/mutations";
import "./topTen.css"

const TopTen = ({ username, topTenRank, friendId }) => {
  // going to build modal for selecting rank when the menu item is clicked
  const [submitRank, { error: addError }] = useMutation(CHANGE_RANK, {
    refetchQueries: [
      {query: QUERY_ME,
       variables: { username }},
      ],
      awaitRefetchQueries: true
  } );
  const [NewRank, setNewRank] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'NewRank') {
      setNewRank(value);
    }
  };

  // if (11 < topTenRank && topTenRank > 0 ) {
    return (
      <div>
        {topTenRank < 11 && topTenRank > 0 &&
        <ListItem> 
        <div className="friend-cards">
         <h2>{username}</h2> 
         <h4>Rank: {topTenRank}</h4>
         <Menu>
           <MenuButton>{<FaEllipsisH />}</MenuButton>
           <MenuList>
             <MenuItem onClick={() => {}}>Remove Friend</MenuItem>
             <MenuItem onClick={onOpen}>Change Rank</MenuItem>
           </MenuList>
           <div>
             <>
               <Modal
                 initialFocusRef={initialRef}
                 finalFocusRef={finalRef}
                 isOpen={isOpen}
                 onClose={onClose}
               >
                 <ModalOverlay />
                 <ModalContent>
                   <ModalHeader>Change Rank</ModalHeader>
                   <ModalCloseButton />
                   <ModalBody pb={6}>
                     <FormControl>
                       <FormLabel>New Rank</FormLabel>
                       <Input name="NewRank" onChange={handleChange} placeholder="Rank from 1-10" />
                     </FormControl>
                   </ModalBody>

                   <ModalFooter>
                     <Button colorScheme="orange" mr={3} onClick={() => {
                       submitRank({ variables: { newRank: NewRank, username } })
                        onClose();}}>
                       Save
                     </Button>
                     <Button onClick={onClose}>Cancel</Button>
                   </ModalFooter>
                 </ModalContent>
               </Modal>
             </>
           </div>
         </Menu>
       </div>
       </ListItem>
        }
        
      </div>
    );
  // }
  // return;
};

export default TopTen;
