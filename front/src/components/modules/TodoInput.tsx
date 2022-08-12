import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const TodoInput = (props: any) => {
  return (
    <TodoInputWrapper>
      <Input placeholder="todo 제목을 입력하세요" />
      <Input placeholder="todo 내용을 입력하세요" />
      <Button onClick={props.callback} name="ADD TODO" />
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
