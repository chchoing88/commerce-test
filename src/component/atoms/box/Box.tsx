import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type BoxProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};
type BoxStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const BoxStyled = styled.div<BoxStyledProps>`
  ${props => (props.css ? props.css : "")}
`;

function Box({ children, css }: BoxProps) {
  return <BoxStyled css={css}>{children}</BoxStyled>;
}

export default Box;
