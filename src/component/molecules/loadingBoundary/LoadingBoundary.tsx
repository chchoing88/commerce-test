import React from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import Box from "component/atoms/box/Box";
import Spinner from "component/atoms/spinner/Spinner";

type LoadingBoundaryProps = {
  children: React.ReactNode;
  oCss?: FlattenSimpleInterpolation;
} & typeof defaultProps;

const defaultProps = {
  isLoading: false
};

function LoadingBoundary({ isLoading, children, oCss }: LoadingBoundaryProps) {
  return isLoading ? (
    <Box css={oCss}>
      <Spinner></Spinner>
    </Box>
  ) : (
    <>{children}</>
  );
}

LoadingBoundary.defaultProps = defaultProps;
export default LoadingBoundary;
