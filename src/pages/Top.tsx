import React from "react";
import { fakeApi } from "api";
import { useInfinityApiCall } from "hooks";
import { RouteComponentProps } from "react-router-dom";

import BasePageTemplate from "component/templates/BasePageTemplate";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

type TopProps = {} & RouteComponentProps;

function Top({ location }: TopProps) {
  const pageName = location.pathname.substring(1);
  const { isLoading, pList } = useInfinityApiCall({
    apiFetch: fakeApi.fetch,
    pageName
  });

  return (
    <BasePageTemplate>
      <LoadingBoundary isLoading={isLoading}>
        <ProductionList pList={pList}></ProductionList>
      </LoadingBoundary>
    </BasePageTemplate>
  );
}

export default Top;
