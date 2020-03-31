import React, { ImgHTMLAttributes } from "react";
import styled from "styled-components";

type ImageProps = {} & ImgHTMLAttributes<HTMLImageElement>;

const ImageStyled = styled.img`
  vertical-align: top;
  max-width: 100%;
  height: 100%;
`;

function Image({ ...rest }: ImageProps) {
  return <ImageStyled {...rest}></ImageStyled>;
}

export default Image;
