import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import Box from "component/atoms/box/Box";
import Image from "component/atoms/image/Image";
import Strong from "component/atoms/strong/Strong";
import Text from "component/atoms/text/Text";
import Ellipsis from "component/atoms/ellipsis/Ellipsis";
import RouteLink from "component/atoms/routeLink/RouteLink";

type ProductionItemProps = {
  oCss?: FlattenSimpleInterpolation;
};

function ProductionItem({ oCss }: ProductionItemProps) {
  return (
    <Box css={oCss}>
      <RouteLink to="/">
        <Box
          css={css`
            position: relative;
            overflow: hidden;
            padding-top: 100%;
          `}
        >
          <Image
            src="https://via.placeholder.com/150"
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            `}
          ></Image>
        </Box>
        <Strong
          css={css`
            padding: 0 10px;
            margin-top: 10px;
          `}
        >
          <Ellipsis>
            Page 2: 브랜드명
            <Text
              css={css`
                font-weight: normal;
              `}
            >
              상품명상품명상품명상품명상품명abcdefg1234
            </Text>
          </Ellipsis>
        </Strong>
      </RouteLink>
    </Box>
  );
}

export default ProductionItem;
