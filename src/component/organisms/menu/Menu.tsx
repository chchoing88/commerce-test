import React, { useEffect, useCallback, useState } from "react";
import { css } from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useFixHeader } from "hooks";

import ThumbMenuGroup from "component/organisms/thumbMenuGroup/ThumbMenuGroup";
import FixedMenu from "component/organisms/fixedMenu/FixedMenu";
import Box from "component/atoms/box/Box";

import { ITabHook } from "types";

type MenuProps = {
  menuData: ITabHook;
} & RouteComponentProps;

function Menu({ menuData, location }: MenuProps) {
  // 메뉴 접었다 펼치기
  const [menuFold, setMenuFold] = useState(true);
  const menuToggleButton = useCallback(() => {
    setMenuFold(beforeState => !beforeState);
  }, []);

  // 메뉴 활성화
  const { onHandleTabActive } = menuData;
  const pathName = location.pathname.substring(1);
  useEffect(() => {
    onHandleTabActive(pathName);
    setMenuFold(true);
  }, [pathName, onHandleTabActive]);

  // 스크롤시 헤더 fix
  const { isHeaderFix, boundaryPosition, setBoundarayPostion } = useFixHeader();
  const onMountedHeight = useCallback(
    (height: number) => {
      setBoundarayPostion(height);
    },
    [setBoundarayPostion]
  );

  return isHeaderFix ? (
    <>
      <FixedMenu menuData={menuData}></FixedMenu>
      <Box
        css={css`
          padding-top: ${boundaryPosition}px;
        `}
      ></Box>
    </>
  ) : (
    <ThumbMenuGroup
      menuData={menuData}
      menuFold={menuFold}
      menuToggleButton={menuToggleButton}
      onMountedHeight={onMountedHeight}
    ></ThumbMenuGroup>
  );
}

export default withRouter(Menu);
