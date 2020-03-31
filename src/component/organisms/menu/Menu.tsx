import React from "react";

import ThumbMenuGroup from "component/organisms/thumbMenuGroup/ThumbMenuGroup";

import { ITabHook } from "types";
type MenuProps = {
  menuData: ITabHook;
};

function Menu({ menuData }: MenuProps) {
  return (
    <>
      <ThumbMenuGroup menuData={menuData}></ThumbMenuGroup>
    </>
  );
}

export default Menu;
