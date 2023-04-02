import React from "react";
import { FaHome, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {
  Box,
  HStack,
  List,
  ListItem,
  Flex,
  Divider,
  Button,
  Container,
  ButtonGroup,
} from "@chakra-ui/react";
import "./navtabs.css";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs() {
  return (

    <Flex>
      <nav className="Nav">
          <div className="Nav__container">
            <Link to="/" className="Nav__brand">
              <img src="logo.svg" className="Nav__logo" />
            </Link>

            <div className="Nav__bottom">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item">
                  <Link className="Nav__link" to="/me">Profile</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/feed">Feed</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/">Login</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/signup">Signup</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/friendslist">FriendsList</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </Flex>
  );
}

export default NavTabs;
