import React from "react";
import { css } from "styled-components";

import Box from "component/atoms/box/Box";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

const SMAPLE_LIST = new Array(30).fill(0);

function Dress() {
  return (
    <Box
      css={css`
        padding: 15px 10px;
      `}
    >
      <LoadingBoundary>
        <ProductionList pList={SMAPLE_LIST}></ProductionList>
      </LoadingBoundary>
    </Box>
  );
}

export default Dress;
