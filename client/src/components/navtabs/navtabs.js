import React, { useEffect, useState } from "react";
import { FaHome, FaEnvelope, FaUser, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {
  HStack,
  Flex,
} from "@chakra-ui/react";
import "./navtabs.css";
import Auth from "../../utils/auth";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({loggedIn}) {
  //console.log("LoggedIn",props.loggedIn)

  return (
    <Flex borderBottom="2px" borderBottomColor="red.600">
      <HStack className="Nav">
        <div className="Nav__container">
          <Link to="/" className="Nav__brand">
            <img src="RapporLogo-removebg-preview.png" id="logo-image" alt="logo" />
          </Link>

          <div className="Nav__bottom">
            <ul className="Nav__item-wrapper">
              <li className="Nav__item">
                <Link className="Nav__link" to="/me">
                  <FaUser />
                </Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to="/feed">
                  <FaHome />
                </Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to="/friendslist">
                  <FaUsers />
                </Link>
              </li>
              <li className="Nav__item">
                {loggedIn ? (
                  <Link className="Nav__link" to="/" onClick={Auth.logout}>
                    Logout
                  </Link>
                ) : (
                  <Link className="Nav__link" to="/">
                    Login
                  </Link>
                )}
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </HStack>
    </Flex>
  );
}

export default NavTabs;
