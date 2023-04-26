import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Route } from "react-router";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import SearchBar from "./components/searchBar";
import NavTabs from "./components/navtabs/navtabs";

import Feed from "./pages/Feed";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import FriendsList from "./pages/FriendsList";
import Signup from "./pages/Signup";
import Auth from "./utils/auth";
import "./App.css"
import Protected from "./components/Protected";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  const [loggedIn, setLoggedIn] = useState();

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
      <Router>
      <NavTabs/>
        <>
          <Routes>
            <Route index path="/login" element={<Login/>} /> 
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/feed" element={
              <Protected>
                <Feed/>
              </Protected>
            } />
            <Route path="/me" element={
              <Protected>
                <Profile/>
              </Protected>
            } />
            <Route path="/friendsList" element={
              <Protected>
                <FriendsList/>
              </Protected>
            } />
            <Route path={"/profiles"} element={
              <Protected>
                <Profile/>
              </Protected>
            }>
                <Route path=":username" element={
                <Protected>
                  <Profile/>
                </Protected>
                } />
            </Route> 

            <Route
              path="*"
              element={<Login/>}
            />
          </Routes>
        </>
      </Router>
    </ChakraProvider>

    </ApolloProvider>
  );
}

export default App;
