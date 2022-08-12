import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

const TodoInput = () => {
  return (
    <TodoInputWrapper>
      <Input />
      <Button name="ADD TODO" />
    </TodoInputWrapper>
  );
};

export default TodoInput;

const TodoInputWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  width: 80%;
  height: 3em;
  border-radius: 0.5rem;
  border-style: none;
  background-color: #232e3f;
`;
