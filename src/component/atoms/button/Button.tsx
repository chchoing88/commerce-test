import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  css?: FlattenSimpleInterpolation;
  onClick: (e: React.MouseEvent) => void;
};
type ButtonStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const ButtonStyled = styled.button<ButtonStyledProps>`
  ${props => (props.css ? props.css : "")}
  outline: none;
`;

function Button({ children, css, onClick }: ButtonProps) {
  return (
    <ButtonStyled onClick={onClick} css={css}>
      {children}
    </ButtonStyled>
  );
}

export default Button;
