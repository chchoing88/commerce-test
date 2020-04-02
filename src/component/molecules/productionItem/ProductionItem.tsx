import React from "react";
import { css, FlattenSimpleInterpolation } from "styled-components";

import Box from "component/atoms/box/Box";
import Image from "component/atoms/image/Image";
import Strong from "component/atoms/strong/Strong";
import Text from "component/atoms/text/Text";
import Ellipsis from "component/atoms/ellipsis/Ellipsis";
import RouteLink from "component/atoms/routeLink/RouteLink";

type ProductionItemProps = {
  oCss?: FlattenSimpleInterpolation;
} & typeof defaultProps;

const defaultProps = {
  title: `상품명상품명상품명상품명상품명abcdefghijklmn123456789`,
  price: "17,900"
};

function ProductionItem({ oCss, title, price }: ProductionItemProps) {
  return (
    <Box css={oCss}>
      <RouteLink
        to="/"
        css={css`
          display: block;
        `}
      >
        <Box
          css={css`
            position: relative;
            overflow: hidden;
            padding-top: 100%;
          `}
        >
          <Image
            src="https://via.placeholder.com/150"
            alt={title}
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            `}
          ></Image>
        </Box>
        <Box
          css={css`
            padding: 0 10px;
            margin-top: 10px;
          `}
        >
          <Strong>
            <Ellipsis>
              Page 1: 브랜드명{" "}
              <Text
                css={css`
                  font-weight: normal;
                `}
              >
                {title}
              </Text>
            </Ellipsis>
          </Strong>
          <Text
            css={css`
              font-size: 18px;
              font-weight: bold;
            `}
          >
            {price}
            <Text
              css={css`
                font-size: 14px;
                font-weight: normal;
              `}
            >
              원
            </Text>
          </Text>
        </Box>
      </RouteLink>
    </Box>
  );
}

ProductionItem.defaultProps = defaultProps;

export default ProductionItem;
