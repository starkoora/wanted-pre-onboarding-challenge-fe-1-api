import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Home = () => {
  const [token, setToken] = useState();
  const [todos, setTodos] = useState([]);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getToken();
    if (token === null) {
      window.location.href = "/auth";
    }
    getTodos();
  }, [token]);

  const getTodos = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/todos",
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then((res) => setTodos(res.data.data));
  };

  const getToken = () => {
    setToken(window.localStorage.getItem("token"));
    console.log(token);
  };

  function onSubmit(data) {
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
    }).then((res) => setTodos([...todos, res.data.data]));

    resetField("title");
    resetField("content");
  }

  function handleDel(e) {
    const delTargetId = e.target.parentNode.id;

    axios({
      method: "DELETE",
      url: `http://localhost:8080/todos/${delTargetId}`,
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then((res) => getTodos());
  }

  return (
    <div>
      <TodoSection>
        <ul className="todoList">
          {todos &&
            todos.map((el, idx) => {
              return (
                <li key={idx} id={el.id}>
                  <span className="title">{el.title}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Content : {el.content}</span>
                  <button onClick={handleDel}>삭제</button>
                </li>
              );
            })}
        </ul>
        <form>
          <input placeholder="title" {...register("title")} />
          <input placeholder="content" {...register("content")} />
        </form>
        <TodoBtn onClick={handleSubmit(onSubmit)}>추가</TodoBtn>
        <TodoBtn>수정</TodoBtn>
      </TodoSection>
    </div>
  );
};

export default Home;

const TodoSection = styled.div``;
const TodoBtn = styled.button``;
