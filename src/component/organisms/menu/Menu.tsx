import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ThumbMenuGroup from "component/organisms/thumbMenuGroup/ThumbMenuGroup";

import { ITabHook } from "types";

type MenuProps = {
  menuData: ITabHook;
} & RouteComponentProps;

function Menu({ menuData, location }: MenuProps) {
  const { onHandleTabActive } = menuData;
  const pathName = location.pathname.substring(1);

  useEffect(() => {
    onHandleTabActive(pathName);
  }, [pathName, onHandleTabActive]);

  return (
    <>
      <ThumbMenuGroup menuData={menuData}></ThumbMenuGroup>
    </>
  );
}

export default withRouter(Menu);
