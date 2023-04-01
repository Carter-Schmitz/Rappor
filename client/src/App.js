import React from "react";
import ParentContainer from "./components/parentContainer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';

import Header from "./components/Header"
import NavTabs from "./components/navtabs";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
          <NavTabs />
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/me" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/signup" element={<Signup />} />
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
