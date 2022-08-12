import React from "react";
import styled from "styled-components";

type ButtonProps = {
  name: string;
};

const Button = (props: ButtonProps) => {
  return <Btn>{props.name}</Btn>;
};

export default Button;

const Btn = styled.button`
  padding: 0 1rem;
  font-size: 1rem;
  border-style: none;
  background-color: #404a5c;
  background-image: linear-gradient(to right, #9900ff 0%, #cc66ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
