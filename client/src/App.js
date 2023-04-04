import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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

const loggedIn = Auth.loggedIn()

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
      <Router>
      <NavTabs loggedIn={loggedIn}/>
        <>
          <Routes>
            {loggedIn ? <Route path="/" element={<Navigate to="/feed" />} /> : <Route path="/" element={<Login/>} />}
            {loggedIn ? <Route path="/feed" element={<Feed/>} /> : <Route path="/feed" element={<Navigate to="/" />} />}
            {loggedIn ? <Route path="/me" element={<Profile loggedIn={loggedIn} />} /> : <Route path="/me" element={<Navigate to="/" />} />}
            {loggedIn ? <Route path="/friendsList" element={<FriendsList />} /> : <Route path="/friendsList" element={<Navigate to="/" />} />}
            {loggedIn ? <Route path="/signup" element={<Navigate to="/me" />} /> : <Route path="/signup" element={<Signup />} />}
            {loggedIn ? <Route path={"/profiles" }>
              <Route path=":username" element={<Profile />}/>
              </Route> 
            : <Route path="/profiles" element={<Navigate to="/" />} />}
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ChakraProvider>

    </ApolloProvider>
  );
}

export default App;
