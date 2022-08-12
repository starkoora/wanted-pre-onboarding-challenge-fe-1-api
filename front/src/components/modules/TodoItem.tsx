import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

const TodoItem = () => {
  return (
    <Wrapper>
      TodoItem
      <div>
        <Button name="EDIT" />
        <Button name="DELETE" />
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
