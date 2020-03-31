import React, { useState } from "react";
import VerticalScrollThumbMenu from "component/organisms/verticalScrollThumbMenu/VerticalScrollThumbMenu";
import TotalThumbMenu from "component/organisms/totalThumbMenu/TotalThumbMenu";

import { ITabHook } from "types";

type ThumbMenuGroupProps = {
  menuData: ITabHook;
};

function ThumbMenuGroup({ menuData }: ThumbMenuGroupProps) {
  const [menuFold, setMenuFold] = useState(true);

  const menuToggleButton = () => {
    setMenuFold(beforeState => !beforeState);
  };

  return (
    <>
      {menuFold ? (
        <VerticalScrollThumbMenu
          menuData={menuData}
          onMenuToggle={menuToggleButton}
        ></VerticalScrollThumbMenu>
      ) : (
        <TotalThumbMenu
          menuData={menuData}
          onMenuToggle={menuToggleButton}
        ></TotalThumbMenu>
      )}
    </>
  );
}

export default ThumbMenuGroup;
