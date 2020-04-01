import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useTab } from "hooks";
import "assets/reset.css";

import Menu from "component/organisms/menu/Menu";

import Dress from "pages/Dress";

function App() {
  const tabData = useTab();
  return (
    <BrowserRouter>
      <Menu menuData={tabData}></Menu>
      <Switch>
        <Route path="/dress" component={Dress}></Route>
      </Switch>
      <Route path="/" render={() => <Redirect to="/dress" />} exact />
    </BrowserRouter>
  );
}

export default App;
