import React from "react";
import { css } from "styled-components";
import { fakeApi } from "api";
import { useInfinityApiCall } from "hooks";
import { RouteComponentProps } from "react-router-dom";
// import { IHistoryItem } from "contexts/HistoryContext_back";

import Box from "component/atoms/box/Box";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

type TopProps = {} & RouteComponentProps;

function Top({ location }: TopProps) {
  const pageName = location.pathname.substring(1);
  // const history =
  //   historyItem && historyItem.pageName === pageName ? historyItem : null;

  const { isLoading, pList } = useInfinityApiCall({
    apiFetch: fakeApi.fetch,
    pageName
  });

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
