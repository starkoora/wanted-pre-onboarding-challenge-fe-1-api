import React from "react";
import styled from "styled-components";

type InputProps = {
  placeholder: string;
  width?: string;
  id?: string;
};

const Input = (props: InputProps) => {
  return <InputSection id={props.id} placeholder={props.placeholder} />;
};

export default Input;

const InputSection = styled.input`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  background-color: #232e3f;
`;
