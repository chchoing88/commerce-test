import React, { ImgHTMLAttributes } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type ImageProps = {
  css?: FlattenSimpleInterpolation;
} & ImgHTMLAttributes<HTMLImageElement>;

type ImageStyledProps = {
  css?: FlattenSimpleInterpolation;
};
const ImageStyled = styled.img<ImageStyledProps>`
  vertical-align: top;
  max-width: 100%;
  height: 100%;
  ${props => (props.css ? props.css : "")}
`;

function Image({ ...rest }: ImageProps) {
  return <ImageStyled {...rest}></ImageStyled>;
}

export default Image;
