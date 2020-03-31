import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type RoundThumbProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};

type RoundMaskStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const RoundMaskStyled = styled.div<RoundMaskStyledProps>`
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  ${props => (props.css ? props.css : "")}
`;

function RoundMask({ children, css }: RoundThumbProps) {
  return <RoundMaskStyled css={css}>{children}</RoundMaskStyled>;
}

export default RoundMask;
