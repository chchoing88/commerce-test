import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import "assets/reset.css";
import Menu from "component/organisms/menu/Menu";

import Dress from "pages/Dress";
import Top from "pages/Top";
import Outer from "pages/Outer";

function Root() {
  return (
    <>
      <Menu></Menu>
      <Switch>
        <Route path="/dress" component={Dress}></Route>
        <Route path="/top" component={Top}></Route>
        <Route path="/outer" component={Outer}></Route>
      </Switch>
      <Route path="/" render={() => <Redirect to="/dress" />} exact />
    </>
  );
}

export default withRouter(Root);
