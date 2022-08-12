import React from "react";
import styled from "styled-components";

type ButtonProps = {
  name: string;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  console.log(props.onClick);
  return <Btn onClick={props.onClick}>{props.name}</Btn>;
};

export default Button;

const Btn = styled.button`
  padding: 0 1rem;
  font-size: 1rem;
  border-style: none;
  background-color: #404a5c;
  background-image: linear-gradient(to right, #9900ff 0%, #cc66ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
