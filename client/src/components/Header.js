import React from "react";
// imported default user pfp
import { FaUser } from "react-icons/fa";

import { Box } from "@chakra-ui/react";

const Header = ({ currentPage, handlePageChange }) => {
  return (
    <div>
      <h1>
        <Box color="red">Rappor</Box>
      </h1>
      {/* turned FaUser icon into a button that takes user to profile page. */}
      <button>
        <a
          href="#profile"
          onClick={() => handlePageChange("Profile")}
          className={currentPage === "Profile" ? "nav-link active" : "nav-link"}
        >
          <FaUser />
        </a>
      </button>
    </div>
  );
};

export default Header;
