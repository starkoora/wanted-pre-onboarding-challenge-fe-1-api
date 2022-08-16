import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

type TodoType = {
  value: string;
  id: string;
  onClick: any;
};

const TodoItem = (props: TodoType) => {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(props.value);
  }, []);

  function handleChange(event: any) {
    setValue(event.target.value);
  }
  return (
    <Wrapper id={props.id}>
      <TodoInput readOnly value={value} onChange={handleChange} />
      <ButtonWrapper>
        <Button onClick={props.onClick} name="EDIT" />
        <Button onClick={props.onClick} name="DELETE" />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TodoItem;

const Wrapper = styled.li`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0.3rem 1.2rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  line-height: 2rem;
  background-color: #10192c;
`;

const TodoInput = styled.input`
  width: 100%;
  background-color: #10192c;
  border-style: none;
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
