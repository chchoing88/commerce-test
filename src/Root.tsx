import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import "assets/reset.css";
import Menu from "component/organisms/menu/Menu";

import Dress from "pages/Dress";
import Top from "pages/Top";
import Outer from "pages/Outer";
import Bottom from "pages/Bottom";
import Shoes from "pages/Shoes";
// import Bags from "pages/Bags";
// import Accessories from "pages/Accessories";
// import Jewelry from "pages/Jewelry";
// import Etc from "pages/Etc";
// import Man from "pages/Man";

function Root() {
  return (
    <>
      <Menu></Menu>
      <Switch>
        <Route path="/dress" component={Dress}></Route>
        <Route path="/top" component={Top}></Route>
        <Route path="/outer" component={Outer}></Route>
        <Route path="/bottom" component={Bottom}></Route>
        <Route path="/shoes" component={Shoes}></Route>
      </Switch>
      <Route path="/" render={() => <Redirect to="/dress" />} exact />
    </>
  );
}

export default withRouter(Root);
