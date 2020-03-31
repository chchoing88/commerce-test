import React from "react";
import { css } from "styled-components";

import RoundMask from "component/atoms/roundMask/RoundMask";
import Image from "component/atoms/image/Image";
import Text from "component/atoms/text/Text";
import Box from "component/atoms/box/Box";

import { IMenuItem } from "types";

type ThumbMenuItemProps = {
  menu: IMenuItem;
};

function ThumbMenuItem({ menu }: ThumbMenuItemProps) {
  return (
    <Box
      css={css`
        display: block;
        margin: 0 auto;
        width: 50px;
      `}
    >
      <RoundMask
        css={css`
          height: 50px;
        `}
      >
        <Image src="https://via.placeholder.com/150"></Image>
      </RoundMask>
      <Text
        css={css`
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 5px;
          font-size: 11px;
          line-height: 11px;
          color: ${menu.isActive ? "black" : "#8e8e8e"};
        `}
      >
        {menu.name}
      </Text>
    </Box>
  );
}

export default ThumbMenuItem;
