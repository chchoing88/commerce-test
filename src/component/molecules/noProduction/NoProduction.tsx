import React from "react";
import { css, FlattenSimpleInterpolation } from "styled-components";

import Box from "component/atoms/box/Box";
import Text from "component/atoms/text/Text";

type NoProductionProps = {
  oCss?: FlattenSimpleInterpolation;
};

function NoProduction({ oCss }: NoProductionProps) {
  return (
    <Box css={oCss}>
      <Text
        css={css`
          font-size: 13px;
          color: #8e8e8e;
        `}
      >
        해당 카테고리에 상품이 없습니다.
      </Text>
    </Box>
  );
}

export default NoProduction;
