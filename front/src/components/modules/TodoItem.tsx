import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

type TodoType = {
  value: string;
  id: string;
  onClick: any;
};

const TodoItem = (props: TodoType) => {
  return (
    <Wrapper id={props.id}>
      <div>{props.value}</div>
      <div>
        <Button onClick={props.onClick} name="EDIT" />
        <Button onClick={props.onClick} name="DELETE" />
      </div>
    </Wrapper>
  );
};

export default TodoItem;

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  padding: 0.3rem 1.2rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  line-height: 2rem;
  background-color: #10192c;
`;
