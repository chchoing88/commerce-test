import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import VerticalScrollThumbMenu from "component/organisms/verticalScrollThumbMenu/VerticalScrollThumbMenu";
import TotalThumbMenu from "component/organisms/totalThumbMenu/TotalThumbMenu";

import { ITabHook } from "types";

type ThumbMenuGroupProps = {
  menuData: ITabHook;
  menuFold: boolean;
  onMountedHeight: (height: number) => void;
  menuToggleButton: () => void;
};

const ThumbMenuGroupStyled = styled.div`
  padding-top: 20px;
`;

function ThumbMenuGroup({
  menuData,
  menuFold,
  menuToggleButton,
  onMountedHeight
}: ThumbMenuGroupProps) {
  const $elemThumbMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ($elemThumbMenu.current) {
      onMountedHeight($elemThumbMenu.current.offsetHeight);
    }
  }, [menuFold, onMountedHeight]);

  return (
    <ThumbMenuGroupStyled ref={$elemThumbMenu}>
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
    </ThumbMenuGroupStyled>
  );
}

export default ThumbMenuGroup;
