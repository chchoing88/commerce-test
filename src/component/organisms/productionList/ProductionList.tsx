import React from "react";

import ProductionItem from "component/molecules/productionItem/ProductionItem";

type ProductionListProps = {};

function ProductionList({}: ProductionListProps) {
  return (
    <div>
      Production List
      <ProductionItem></ProductionItem>
    </div>
  );
}

export default ProductionList;
