import React from "react";
import styled from "styled-components";

type InputProps = {
  placeholder: string;
};

const Input = (props: InputProps) => {
  return <InputSection placeholder={props.placeholder} />;
};

export default Input;

const InputSection = styled.input`
  width: 80%;
  height: 3rem;
  padding: 0 1rem;
  margin-right: 2rem;
  border-radius: 0.5rem;
  border-style: none;
  background-color: #232e3f;
`;
