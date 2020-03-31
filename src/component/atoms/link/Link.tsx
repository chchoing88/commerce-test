import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type LinkProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};
type LinkStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const LinkStyled = styled.a<LinkStyledProps>`
  ${props => (props.css ? props.css : "")}
`;

function Link({ children, css }: LinkProps) {
  return <LinkStyled css={css}>{children}</LinkStyled>;
}

export default Link;
