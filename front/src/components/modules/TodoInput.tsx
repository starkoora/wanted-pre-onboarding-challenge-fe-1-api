import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const TodoInput = (props: any) => {
  return (
    <TodoInputWrapper>
      <Input id="title" placeholder="todo 제목을 입력하세요" width="80%" />
      <Input id="content" placeholder="todo 내용을 입력하세요" width="80%" />
      <Button onClick={props.onClick} name="ADD TODO" />
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
