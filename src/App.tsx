import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "assets/reset.css";
import { HistoryContextProvider } from "contexts/HistoryContext";

import Root from "Root";

function App() {
  return (
    <HistoryContextProvider>
      <HashRouter>
        <Root></Root>
      </HashRouter>
    </HistoryContextProvider>
  );
}

export default App;
