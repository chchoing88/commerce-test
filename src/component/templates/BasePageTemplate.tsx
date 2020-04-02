import React from "react";
import styled from "styled-components";

type BasePageTemplateProps = {
  children: React.ReactNode;
};
const BasePageTemplateStyled = styled.div`
  padding: 15px 10px;
`;
function BasePageTemplate({ children }: BasePageTemplateProps) {
  return <BasePageTemplateStyled>{children}</BasePageTemplateStyled>;
}

export default BasePageTemplate;
