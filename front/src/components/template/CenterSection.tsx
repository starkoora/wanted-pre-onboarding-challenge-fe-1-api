import React from "react";
import styled from "styled-components";

type ContainerProps = {
  children: React.ReactNode; //👈 children prop typr
};

const CenterSection = (props: ContainerProps) => {
  return <Section>{props.children}</Section>;
};

export default CenterSection;

const Section = styled.div`
  width: 50%;
  margin: 5rem auto;
`;
