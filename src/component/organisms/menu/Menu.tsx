import React, { useEffect, useCallback, useState } from "react";
import { css } from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useTab, useFixHeader } from "hooks";

import ThumbMenuGroup from "component/organisms/thumbMenuGroup/ThumbMenuGroup";
import FixedMenu from "component/organisms/fixedMenu/FixedMenu";
import Box from "component/atoms/box/Box";

type MenuProps = {} & RouteComponentProps;

function Menu({ location }: MenuProps) {
  const tabData = useTab();

  // 메뉴 접었다 펼치기
  const [menuFold, setMenuFold] = useState(true);
  const menuToggleButton = useCallback(() => {
    setMenuFold(beforeState => !beforeState);
  }, []);

  // 메뉴 활성화
  const { onHandleTabActive } = tabData;
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
      <FixedMenu menuData={tabData}></FixedMenu>
      <Box
        css={css`
          padding-top: ${boundaryPosition}px;
        `}
      ></Box>
    </>
  ) : (
    <ThumbMenuGroup
      menuData={tabData}
      menuFold={menuFold}
      menuToggleButton={menuToggleButton}
      onMountedHeight={onMountedHeight}
    ></ThumbMenuGroup>
  );
}

export default withRouter(Menu);
