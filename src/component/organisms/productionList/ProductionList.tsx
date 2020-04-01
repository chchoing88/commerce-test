import React from "react";
import styled from "styled-components";

import ProductionItem from "component/molecules/productionItem/ProductionItem";

type ProductionListProps = {
  pList: number[];
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
      {pList.map(item => (
        <ProductionItemStyled>
          <ProductionItem></ProductionItem>
        </ProductionItemStyled>
      ))}
    </ProductionListStyled>
  );
}

export default ProductionList;
