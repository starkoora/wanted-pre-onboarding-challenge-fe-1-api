import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

type TodoType = {
  value: string;
  id: string;
  content: string;
  onClick: any;
  onClickList: any;
};

const TodoItem = (props: TodoType) => {
  const [value, setValue] = useState<string>();
  const [detail, setDetail] = useState<string>();

  useEffect(() => {
    setValue(props.value);
    setDetail(props.content);
  }, []);

  function handleChange(event: any) {
    const targetType = event.target.id;
    if (targetType === "title") setValue(event.target.value);
    else if (targetType === "detail") setDetail(event.target.value);
  }
  return (
    <ListItem onClick={props.onClickList}>
      <Wrapper id={props.id}>
        <TodoInput id="title" readOnly value={value} onChange={handleChange} />
        <ButtonWrapper>
          <Button onClick={props.onClick} name="EDIT" />
          <Button onClick={props.onClick} name="DELETE" />
        </ButtonWrapper>
      </Wrapper>
      <TodoDetailInput
        id="detail"
        readOnly
        value={detail}
        onChange={handleChange}
      />
    </ListItem>
  );
};

export default TodoItem;

const ListItem = styled.li``;
const Wrapper = styled.div`
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
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const TodoDetailInput = styled.input`
  position: fixed;
  background-color: #404a5b;
  border: none;
  padding-left: 2rem;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  visibility: hidden;
  outline: none;
  &.showUp {
    position: relative;
    visibility: visible;
  }
`;
