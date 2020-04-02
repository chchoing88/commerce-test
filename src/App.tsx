import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useTab } from "hooks";
import "assets/reset.css";

import Menu from "component/organisms/menu/Menu";

import Dress from "pages/Dress";
import Top from "pages/Top";
import Outer from "pages/Outer";

function App() {
  const tabData = useTab();
  return (
    <BrowserRouter>
      <Menu menuData={tabData}></Menu>
      <Switch>
        <Route path="/dress" component={Dress}></Route>
        <Route path="/top" component={Top}></Route>
        <Route path="/Outer" component={Outer}></Route>
      </Switch>
      <Route path="/" render={() => <Redirect to="/dress" />} exact />
    </BrowserRouter>
  );
}

export default App;
