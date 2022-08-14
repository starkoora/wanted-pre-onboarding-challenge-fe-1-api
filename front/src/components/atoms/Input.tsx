import React from "react";
import styled from "styled-components";

type InputProps = {
  placeholder: string;
  width?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  return (
    <InputSection onChange={props.onChange} placeholder={props.placeholder} />
  );
};

export default Input;

const InputSection = styled.input`
  width: ${(props) => (props.width ? props.width : "10%")};
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  background-color: #232e3f;
`;
