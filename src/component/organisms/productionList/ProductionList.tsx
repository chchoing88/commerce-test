import React from "react";
import styled, { css } from "styled-components";

import ProductionItem from "component/molecules/productionItem/ProductionItem";
import NoProduction from "component/molecules/noProduction/NoProduction";

import { IFakeResponseItem } from "types/api";

type ProductionListProps = {
  pList: IFakeResponseItem[] | null;
};

const ProductionListStyled = styled.ul`
  margin-left: -1px;
  box-sizing: border-box;
  width: 100%;
`;

const ProductionItemStyled = styled.li`
  display: inline-block;
  width: 50%;
  padding-bottom: 20px;
  border-left: 1px solid #fff;
  box-sizing: border-box;
`;

function ProductionList({ pList }: ProductionListProps) {
  return (
    <ProductionListStyled>
      {pList ? (
        pList.length > 0 ? (
          pList.map(item => (
            <ProductionItemStyled key={item.ID}>
              <ProductionItem></ProductionItem>
            </ProductionItemStyled>
          ))
        ) : (
          <NoProduction
            oCss={css`
              padding-top: 80px;
              text-align: center;
            `}
          ></NoProduction>
        )
      ) : null}
    </ProductionListStyled>
  );
}

export default ProductionList;
