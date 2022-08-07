import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Home = () => {
  const [token, setToken] = useState();
  const [todoTitle, setTodoTitle] = useState();
  const [todoContent, setTodoContent] = useState();
  const [todos, setTodos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));

    axios({
      method: "GET",
      url: "http://localhost:8080/todos",
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then((res) => setTodos(res.data.data));
  }, [token, todoTitle, todoContent]);

  function onSubmit(data) {
    setTodoTitle(data.title);
    setTodoContent(data.content);

    axios({
      method: "POST",
      url: "http://localhost:8080/todos",
      headers: {
        Authorization: `Basic ${token}`,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    }).then((res) => console.log(res));
  }

  return (
    <div>
      <TodoSection>
        {todos &&
          todos.map((el) => {
            return (
              <div key={el.title}>
                <span>Title : {el.title}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Content : {el.content}</span>
              </div>
            );
          })}
        <form>
          <input placeholder="title" {...register("title")} />
          <input placeholder="content" {...register("content")} />
        </form>
        <TodoBtn onClick={handleSubmit(onSubmit)}>추가</TodoBtn>
        <TodoBtn>수정</TodoBtn>
        <TodoBtn>삭제</TodoBtn>
      </TodoSection>
    </div>
  );
};

export default Home;

const TodoSection = styled.div``;
const TodoBtn = styled.button``;
