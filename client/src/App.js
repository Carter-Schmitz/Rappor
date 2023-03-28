import React from "react";
import Header from "./components/Header";
import Navtabs from "./components/navtabs";
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
    <div className="container">
      <Header />
      <Navtabs />
    </div>
    </ChakraProvider>
  );
}

export default App;
