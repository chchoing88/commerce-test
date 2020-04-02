import React from "react";
import { fakeApi } from "api";
import { useInfinityApiCall } from "hooks";
import { RouteComponentProps } from "react-router-dom";

import BasePageTemplate from "component/templates/BasePageTemplate";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

type OuterProps = {} & RouteComponentProps;

function Outer({ location }: OuterProps) {
  const pageName = location.pathname.substring(1);
  const { isLoading, pList } = useInfinityApiCall({
    apiFetch: fakeApi.fetch,
    pageName,
    isEmptyArray: true
  });

  return (
    <BasePageTemplate>
      <LoadingBoundary isLoading={isLoading}>
        <ProductionList pList={pList}></ProductionList>
      </LoadingBoundary>
    </BasePageTemplate>
  );
}

export default Outer;
