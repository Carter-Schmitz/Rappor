import React from "react";
import { FaHome, FaEnvelope } from "react-icons/fa";
import {
  Box,
  HStack,
  List,
  ListItem,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <Flex
      display="flexWrap"
      mt={1000}
      mb={70}
      background="grey"
      color="red.600"
    >
      <List pos="sticky" className="nav nav-tabs">
        <HStack justify="space-between">
          <ListItem
            className="nav-item"
            _hover={{ color: "purple.600", transition: "80ms" }}
          >
            <a
              href="/profile"
              // Check to see if the currentPage is `profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={
                currentPage === "Profile" ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </a>
          </ListItem>
          <ListItem
            className="nav-item"
            _hover={{ color: "purple.600", transition: "80ms" }}
          >
            <a
              href="/feed"
              // Check to see if the currentPage is `Feed`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={
                currentPage === "Feed" ? "nav-link active" : "nav-link"
              }
            >
              <FaHome />
            </a>
          </ListItem>
          <ListItem
            className="nav-item"
            _hover={{ color: "purple.600", transition: "80ms" }}
          >
            <a
              href="/messages"
              onClick={() => handlePageChange("Messages")}
              // Check to see if the currentPage is `messages`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={
                currentPage === "Messages" ? "nav-link active" : "nav-link"
              }
            >
              <FaEnvelope />
            </a>
          </ListItem>
          <ListItem
            className="nav-item"
            _hover={{ color: "purple.600", transition: "80ms" }}
          >
            <a
              href="/login"
              onClick={() => handlePageChange("login")}
              // Check to see if the currentPage is `login`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={
                currentPage === "login" ? "nav-link active" : "nav-link"
              }
            >
              login
            </a>
          </ListItem>
          <ListItem
            className="nav-item"
            _hover={{ color: "purple.600", transition: "80ms" }}
          >
            <a
              href="/signup"
              onClick={() => handlePageChange("Signup")}
              // Check to see if the currentPage is `signup`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={
                currentPage === "Signup" ? "nav-link active" : "nav-link"
              }
            >
              Signup
            </a>
          </ListItem>
        </HStack>
      </List>
    </Flex>
  );
}

export default NavTabs;
