import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { NavLink, NavLinkProps } from "react-router-dom";

type RouteLinkProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
  onClick?: () => void;
} & NavLinkProps;
type RouteLinkStyledProps = {
  css?: FlattenSimpleInterpolation;
} & NavLinkProps;

const RouteLinkStyled = styled(NavLink)<RouteLinkStyledProps>`
  display: inline-block;
  ${props => (props.css ? props.css : "")}
`;

function RouteLink({ children, css, onClick, ...rest }: RouteLinkProps) {
  return (
    <RouteLinkStyled css={css} onClick={onClick} {...rest}>
      {children}
    </RouteLinkStyled>
  );
}

export default RouteLink;
