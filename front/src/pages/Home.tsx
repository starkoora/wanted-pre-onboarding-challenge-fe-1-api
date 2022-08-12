import React from "react";
import Header from "components/modules/Header";
import CenterSection from "components/template/CenterSection";
import TodoInput from "components/modules/TodoInput";
import TodoItem from "components/modules/TodoItem";

const Home = () => {
  return (
    <CenterSection>
      <Header title="Todo List 2022" />
      <TodoInput />
      <Header title="Todos" />
      <TodoItem />
    </CenterSection>
  );
};

export default Home;
