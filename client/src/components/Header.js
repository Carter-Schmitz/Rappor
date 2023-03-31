import React from "react";
// imported default user pfp
import { FaUser } from "react-icons/fa";

import { Box, HStack, IconButton, Heading, Divider } from "@chakra-ui/react";

const Header = ({ currentPage, handlePageChange }) => {
  return (
    <Box background="grey">
      <HStack justify="space-between">
        <Heading color="red.600" marginLeft="1150">
          Rappor
        </Heading>
        {/* turned FaUser icon into a button that takes user to profile page. */}
        <IconButton bg="red.600" _hover={{background: "purple.600", transition: "80ms"}}>
          <a
            href="#profile"
            onClick={() => handlePageChange("Profile")}
            className={
              currentPage === "Profile" ? "nav-link active" : "nav-link"
            }
          >
            <FaUser />
          </a>
        </IconButton>
      </HStack>
      <Divider bg="red" />
    </Box>
  );
};

export default Header;
