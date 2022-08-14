import React from "react";
import styled from "styled-components";

type LoginSectionProps = {
  children: React.ReactNode; //👈 children prop typr
};

const LoginSection = (props: LoginSectionProps) => {
  return <Section>{props.children}</Section>;
};

export default LoginSection;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem auto;
`;
