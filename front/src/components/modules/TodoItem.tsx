import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

type TodoType = {
  value: string;
};
const TodoItem = (props: TodoType) => {
  return (
    <Wrapper>
      {props.value}
      <div>
        <Button onClick={() => console.log("edit")} name="EDIT" />
        <Button onClick={() => console.log("delete")} name="DELETE" />
      </div>
    </Wrapper>
  );
};

export default TodoItem;

const Wrapper = styled.div`
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
