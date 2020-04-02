import React from "react";
import { BrowserRouter } from "react-router-dom";
import "assets/reset.css";
import { HistoryContextProvider } from "contexts/HistoryContext";

import Root from "Root";

function App() {
  return (
    <HistoryContextProvider>
      <BrowserRouter>
        <Root></Root>
      </BrowserRouter>
    </HistoryContextProvider>
  );
}

export default App;
