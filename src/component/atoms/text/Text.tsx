import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type TextProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};
type TextStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const TextStyled = styled.span<TextStyledProps>`
  font-size: 14px;
  ${props => (props.css ? props.css : "")}
`;

function Text({ children, css }: TextProps) {
  return <TextStyled css={css}>{children}</TextStyled>;
}

export default Text;
