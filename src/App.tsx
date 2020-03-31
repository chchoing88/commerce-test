import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/reset.css";

import Menu from "component/organisms/menu/Menu";
import { useTab } from "hooks";

function App() {
  const tabData = useTab();
  return (
    <BrowserRouter>
      <Menu menuData={tabData}></Menu>
    </BrowserRouter>
  );
}

export default App;
