import React from "react";
import styled from "styled-components";

type ButtonProps = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: ButtonProps) => {
  return <Btn onClick={props.onClick}>{props.name}</Btn>;
};

export default Button;

const Btn = styled.button`
  padding: 0 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-style: none;
  background-color: #404a5c;
  background-image: linear-gradient(to right, #9900ff 0%, #cc66ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    box-sizing: border-box;
    border: 1px solid #cc66ff;
    border-radius: 0.8rem;
  }
`;
