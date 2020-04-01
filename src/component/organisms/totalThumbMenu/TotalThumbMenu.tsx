import React from "react";
import styled, { css } from "styled-components";

import ThumbMenuItem from "component/molecules/thumbMenuItem/ThumbMenuItem";
import RouteLink from "component/atoms/routeLink/RouteLink";
import Box from "component/atoms/box/Box";
import Strong from "component/atoms/strong/Strong";
import Button from "component/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { ITabHook } from "types";

type TotalThumbMenuProps = {
  menuData: ITabHook;
  onMenuToggle: () => void;
};

const TotalThumbMenuStyled = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 10px;
  margin-top: 15px;
`;

const MenuListStyled = styled.ul`
  overflow: hidden;
  width: 100%;
`;
const MenuItemStyled = styled.li`
  float: left;
  width: 20%;
  margin-bottom: 7px;
  text-align: center;
`;

function TotalThumbMenu({ menuData, onMenuToggle }: TotalThumbMenuProps) {
  const { tabList } = menuData;
  return (
    <TotalThumbMenuStyled>
      <Box
        css={css`
          position: relative;
          margin-bottom: 10px;
          overflow: hidden;
        `}
      >
        <Strong
          css={css`
            font-size: 16px;
          `}
        >
          전체보기
        </Strong>
        <Button
          css={css`
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 34px;
          `}
          onClick={onMenuToggle}
        >
          <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
        </Button>
      </Box>
      <MenuListStyled>
        {tabList.map(menu => (
          <MenuItemStyled key={menu.id}>
            <RouteLink to={menu.id}>
              <ThumbMenuItem menu={menu}></ThumbMenuItem>
            </RouteLink>
          </MenuItemStyled>
        ))}
      </MenuListStyled>
    </TotalThumbMenuStyled>
  );
}

export default TotalThumbMenu;
