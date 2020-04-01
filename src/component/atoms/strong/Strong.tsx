import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type StrongProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};
type StrongStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const StrongStyled = styled.strong<StrongStyledProps>`
  display: inline-block;
  font-size: 14px;
  ${props => (props.css ? props.css : "")}
`;

function Strong({ children, css }: StrongProps) {
  return <StrongStyled css={css}>{children}</StrongStyled>;
}

export default Strong;
