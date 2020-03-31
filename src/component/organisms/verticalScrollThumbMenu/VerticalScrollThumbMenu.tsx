import React from "react";
import styled, { css } from "styled-components";
import { useHorizontalScroll } from "hooks";

import ThumbMenuItem from "component/molecules/thumbMenuItem/ThumbMenuItem";
import RouteLink from "component/atoms/routeLink/RouteLink";
import Button from "component/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { ITabHook } from "types";

type VerticalScrollThumbMenuProps = {
  menuData: ITabHook;
  onMenuToggle: () => void;
};

type MenuListStyledProps = {
  width?: number;
};

type MenuItemStyledProps = {
  width?: number;
};

const VerticalScrollThumbMenuStyled = styled.div`
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  padding: 0 10px;
  &:after {
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    right: 0;
    width: 54px;
    content: "";
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 1) 24%
    );
  }
`;

const MenuListStyled = styled.ul<MenuListStyledProps>`
  overflow: hidden;
  width: ${props => `${props.width}px` || `100%`};
  transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
  transform: translate(0px, 0px) translateZ(0px);
`;
const MenuItemStyled = styled.li<MenuItemStyledProps>`
  float: left;
  width: ${props => `${props.width}px` || `20%`};
  text-align: center;
`;

function VerticalScrollThumbMenu({
  menuData,
  onMenuToggle
}: VerticalScrollThumbMenuProps) {
  const { tabList, onHandleTabClick } = menuData;
  const menuLength = tabList.length;
  const containerWidth = window.innerWidth - 20;

  const {
    translateX,
    menuItemWidth,
    menuListWidth,
    duration,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    moveToByIndex
  } = useHorizontalScroll(menuLength, containerWidth, 5, 600);

  const menuListStyle = {
    transform: `translate(${translateX}px, 0px) translateZ(0px)`,
    transitionDuration: `${duration}ms`
  };

  return (
    <VerticalScrollThumbMenuStyled
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <MenuListStyled width={menuListWidth} style={menuListStyle}>
        {tabList.map((menu, index) => (
          <MenuItemStyled key={menu.id} width={menuItemWidth}>
            <RouteLink
              to={menu.id === "dress" ? "/" : menu.id}
              onClick={() => {
                moveToByIndex(index);
                onHandleTabClick(menu.id);
              }}
            >
              <ThumbMenuItem menu={menu}></ThumbMenuItem>
            </RouteLink>
          </MenuItemStyled>
        ))}
      </MenuListStyled>
      <Button
        css={css`
          position: absolute;
          top: 0;
          bottom: 16px;
          right: 10px;
          width: 34px;
          z-index: 10;
        `}
        onClick={onMenuToggle}
      >
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
      </Button>
    </VerticalScrollThumbMenuStyled>
  );
}

export default VerticalScrollThumbMenu;
