import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useIScroll } from "hooks";
import IScroll from "iscroll";

import RouteLink from "component/atoms/routeLink/RouteLink";
import Box from "component/atoms/box/Box";
import Text from "component/atoms/text/Text";

import { ITabHook } from "types";

type FixedMenuProps = {
  menuData: ITabHook;
};

type FixedMenuListStyledProps = {
  width?: number;
};

const FixedMenuStyled = styled.div`
  position: fixed;
  top: -42px;
  left: 0;
  right: 0;
  z-index: 100;
  touch-action: none;
  width: 100%;
  background-color: #fff;
  transform: translateZ(0);
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8e8e8;
  transition-duration: 1s;
`;

const FixedMenuInnerStyled = styled.div`
  position: relative;
  width: 100%;
  touch-action: none;
`;

const FixedMenuListStyled = styled.ul<FixedMenuListStyledProps>`
  display: table;
  width: auto;
`;

const FixedMeunItemStyled = styled.li`
  display: table-cell;
  text-align: center;
`;

function FixedMenu({ menuData }: FixedMenuProps) {
  const $elemFixedMenu = useRef<HTMLDivElement>(null);
  const { tabList } = menuData;

  useEffect(() => {
    if ($elemFixedMenu.current) {
      $elemFixedMenu.current.style.top = `0px`;
    }
  }, []);
  useIScroll("#fixedMenuWrapper");

  return (
    <FixedMenuStyled ref={$elemFixedMenu}>
      <FixedMenuInnerStyled id="fixedMenuWrapper">
        <FixedMenuListStyled>
          {tabList.map(menu => (
            <FixedMeunItemStyled key={menu.id}>
              <RouteLink
                to={menu.id}
                css={css`
                  position: relative;
                  padding: 10px 8px;
                `}
              >
                <Box
                  css={css`
                    &:after {
                      position: absolute;
                      display: ${menu.isActive ? "block" : "none"};
                      content: "";
                      bottom: -1px;
                      left: 0;
                      right: 0;
                      height: 1px;
                      background-color: black;
                    }
                  `}
                >
                  <Text
                    css={css`
                      font-size: 12px;
                      color: ${menu.isActive ? "black" : "#8e8e8e"};
                    `}
                  >
                    {menu.name}
                  </Text>
                </Box>
              </RouteLink>
            </FixedMeunItemStyled>
          ))}
        </FixedMenuListStyled>
      </FixedMenuInnerStyled>
    </FixedMenuStyled>
  );
}

export default FixedMenu;
