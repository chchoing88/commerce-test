import React from "react";
import { css } from "styled-components";
import { fakeApi } from "api";
import { useInfinityApiCall } from "hooks";

import Box from "component/atoms/box/Box";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

function Top() {
  const { isLoading, pList } = useInfinityApiCall(fakeApi.fetch);

  return (
    <Box
      css={css`
        padding: 15px 10px;
      `}
    >
      <LoadingBoundary isLoading={isLoading}>
        <ProductionList pList={pList}></ProductionList>
      </LoadingBoundary>
    </Box>
  );
}

export default Top;
