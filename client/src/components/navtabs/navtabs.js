import React, { useEffect, useState } from "react";
import { FaList, FaUser, FaUsers, FaLock, FaLockOpen, FaSignInAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router"
import {
  HStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import "./navtabs.css";
import Auth from "../../utils/auth";
import SearchBar from "../searchBar/index"

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs() {

  const loggedIn = Auth.loggedIn();

  const navigate = useNavigate()
  //console.log("LoggedIn",props.loggedIn)

  const handleLogout = async () => {
    const logout = await Auth.logout();

    if (logout === true) {
      navigate("/login")
    }
  }

  return (
    <Flex borderBottom="2px" borderBottomColor="red.600">
      <HStack className="Nav">
        <div className="Nav__container">
          <Link to="/me" className="Nav__brand">
            <img
              src="/RapporLogo-removebg-preview.png"
              id="logo-image"
              alt="Rappor Logo"
            />
          </Link>
          <div className="Nav__bottom">
            <ul className="Nav__item-wrapper">
              {loggedIn ? 
              <li className="Nav__item">
              <Link className="Nav__link" to="/me">
                <FaUser />
                Profile
              </Link>
            </li>
            : null
            }
              {loggedIn ? (
                <li className="Nav__item">
                  <Link className="Nav__link" to="/feed">
                    <FaList />
                    Feed
                  </Link>
                </li>
              ) : null}
              {loggedIn ? (
                <li className="Nav__item">
                  <Link className="Nav__link" to="/friendslist">
                    <FaUsers />
                    Friends
                  </Link>
                </li>
              ) : null}
              <li className="Nav__item">
                {loggedIn ? (
                  <Link className="Nav__link" onClick={handleLogout}>
                    <FaLock/>
                    Logout
                  </Link>
                ) : (
                  <Link className="Nav__link" to="/">
                    <FaLockOpen />
                    Login
                  </Link>
                )}
              </li>
              {loggedIn ? null : (
                <li className="Nav__item">
                  <Link className="Nav__link" to="/signup">
                    <FaSignInAlt />
                    Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Box mt="30px">{loggedIn ? <SearchBar /> : null}</Box>
        </div>
      </HStack>
    </Flex>
  );
}

export default NavTabs;
