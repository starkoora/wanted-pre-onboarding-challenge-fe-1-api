import React, { useEffect, useState } from "react";
import Header from "components/modules/Header";
import CenterSection from "components/template/CenterSection";
import TodoInput from "components/modules/TodoInput";
import TodoItem from "components/modules/TodoItem";
import axios from "axios";

type TodosType = {
  title: string;
  content: string;
};

const Home = () => {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    getToken();
    if (token === null) {
      window.location.href = "/auth";
    }
  }, [token]);

  const getToken = () => {
    setToken(window.localStorage.getItem("token"));
  };

  return (
    <CenterSection>
      <Header title="Todo List 2022" />
      <TodoInput />
      <Header title="Todos" />
      <TodoItem value="Todo Task" />
    </CenterSection>
  );
};

export default Home;
