import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "components/modules/Header";
import CenterSection from "components/template/CenterSection";
import TodoInput from "components/modules/TodoInput";
import TodoItem from "components/modules/TodoItem";
import LogOutButton from "components/modules/LogOutButton";
import axios from "axios";

type TodosType = {
  title: string;
  content: string;
  id: string;
};

const Home = () => {
  const [token, setToken] = useState<string | null>();
  const [todos, setTodos] = useState<TodosType[]>([]);

  function handleInputClick(event: React.MouseEvent<HTMLButtonElement>) {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const content = (document.getElementById("content") as HTMLInputElement)
      .value;

    axios({
      method: "POST",
      url: "http://localhost:8080/todos",
      headers: {
        Authorization: `Basic ${token}`,
      },
      data: {
        title: title,
        content: content,
      },
    }).then((res) => {
      console.log(res);
      setTodos([...todos, res.data.data]);
    });
  }

  useEffect(() => {
    getToken();
    if (token === null) {
      window.location.href = "/auth";
    }
    getTodos();
    console.log(todos);
  }, [token]);

  const getToken = () => {
    setToken(window.localStorage.getItem("token"));
  };

  const getTodos = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/todos",
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then((res) => {
      setTodos(res.data.data);
    });
  };

  const handleTodoClick = (event: any) => {
    const target = event.target;
    const targetLi = target.parentNode.parentNode;
    const targetInput = targetLi.children[0];
    const targetId = targetLi.id;
    const targetText = target.innerText;
    const targetDetail = targetLi.parentNode.children[1];

    if (targetText === "DELETE") {
      axios({
        method: "DELETE",
        url: `http://localhost:8080/todos/${targetId}`,
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then((res) => getTodos());
    } else if (targetText === "EDIT") {
      targetInput.focus();
      target.innerText = "SAVE";
      targetInput.removeAttribute("readonly");
      targetDetail.removeAttribute("readonly");
      targetDetail.classList.add("showUp");
    }

    if (targetText === "SAVE") {
      target.innerText = "EDIT";
      targetInput.setAttribute("readonly", "readonly");
      targetDetail.setAttribute("readonly", "readonly");

      axios({
        method: "PUT",
        url: `http://localhost:8080/todos/${targetId}`,
        headers: {
          Authorization: `Basic ${token}`,
        },
        data: {
          title: targetInput.value,
          content: targetDetail.value,
        },
      });
    }
  };

  const clickTodoListItem = (event: any) => {
    const targetLi = event.target.parentNode.parentNode;
    const targetLiDetail = targetLi.children[1];

    if (targetLiDetail.className.includes("showUp")) {
      targetLiDetail.classList.remove("showUp");
    } else {
      targetLiDetail.classList.add("showUp");
    }
  };

  function handleLogOut() {
    window.localStorage.removeItem("token");
    getToken();
  }

  return (
    <CenterSection>
      <Header title="Todo List 2022" />
      <LogOutWrapper>
        <LogOutButton onClick={handleLogOut} name="Logout" />
      </LogOutWrapper>
      <hr />
      <TodoInput onClick={handleInputClick} />
      <hr />
      <Header title="Todos" />
      <ul>
        {todos &&
          todos.map((todo, idx) => (
            <TodoItem
              key={idx}
              id={todo.id}
              value={todo.title}
              content={todo.content}
              onClick={handleTodoClick}
              onClickList={clickTodoListItem}
            />
          ))}
      </ul>
    </CenterSection>
  );
};

export default Home;

const LogOutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
