import React from "react";
import styled, {
  keyframes,
  FlattenSimpleInterpolation
} from "styled-components";

type SpinnerProps = {
  css?: FlattenSimpleInterpolation;
};
type SpinnerStyledStyledProps = {
  css?: FlattenSimpleInterpolation;
};

const SpinnerStyled = styled.div<SpinnerStyledStyledProps>`
  width: 50px;
  margin: 20px auto;
  text-align: center;
  ${props => (props.css ? props.css : "")}
`;

const bouncedeLay = keyframes`
0%, 80%, 100% {
  transform: scale(0.0);
  -webkit-transform: scale(0.0);
} 40% {
  transform: scale(1.0);
  -webkit-transform: scale(1.0);
}
  `;

const SpinnerCircle = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: #ff2f3e;
  animation: ${bouncedeLay} 1.4s infinite ease-in-out;
  animation-fill-mode: both;
`;

const SpinnerCircleBound1 = styled(SpinnerCircle)`
  animation-delay: -0.32s;
`;
const SpinnerCircleBound2 = styled(SpinnerCircle)`
  animation-delay: -0.16s;
`;
const SpinnerCircleBound3 = styled(SpinnerCircle)``;

function Spinner({ css }: SpinnerProps) {
  return (
    <SpinnerStyled css={css}>
      <span className="screen_out">로딩 중, 잠시만 기다려 주세요.</span>
      <SpinnerCircleBound1></SpinnerCircleBound1>
      <SpinnerCircleBound2></SpinnerCircleBound2>
      <SpinnerCircleBound3></SpinnerCircleBound3>
    </SpinnerStyled>
  );
}

export default Spinner;
