import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type EllipsisProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
};
type EllipsisStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const EllipsisStyled = styled.div<EllipsisStyledProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* ellipsis line */
  -webkit-box-orient: vertical;
  ${props => (props.css ? props.css : "")}
`;

function Ellipsis({ children, css }: EllipsisProps) {
  return <EllipsisStyled css={css}>{children}</EllipsisStyled>;
}

export default Ellipsis;
