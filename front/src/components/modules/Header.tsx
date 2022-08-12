import React from "react";
import styled from "styled-components";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <TextWrapper>
      <Text>{title}</Text>
    </TextWrapper>
  );
};

export default Header;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Text = styled.span`
  font-size: 2rem;
`;
