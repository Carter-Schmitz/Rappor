import React, { useState } from "react";
import { useQuery } from '@apollo/client';

import NavTabs from "./NavTabs";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Foot from "./Footer";
import { QUERY_POSTS } from '../utils/queries';

export default function ParentContainer() {
  const [currentPage, setCurrentPage] = useState("Feed");
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "Feed") {
      return <Feed />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    if (currentPage === "Messages") {
      return <Messages />;
    }
    return <Login />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Header />
      {/* We are passing the currentPage from state and the function to update it */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Foot />
    </div>
  );
}
