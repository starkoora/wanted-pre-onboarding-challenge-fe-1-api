import React, { useEffect, useState } from "react";
import Header from "components/modules/Header";
import CenterSection from "components/template/CenterSection";
import TodoInput from "components/modules/TodoInput";
import TodoItem from "components/modules/TodoItem";
import axios from "axios";
import LogOutButton from "components/modules/LogOutButton";

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
      setTodos([...todos, res.data.data]);
    });
  }

  useEffect(() => {
    getToken();
    if (token === null) {
      window.location.href = "/auth";
    }
    getTodos();
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

    if (targetText === "DELETE") {
      axios({
        method: "DELETE",
        url: `http://localhost:8080/todos/${targetId}`,
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then((res) => getTodos());
    } else if (targetText === "EDIT") {
      target.innerText = "SAVE";
      targetInput.removeAttribute("readonly");
    }

    if (targetText === "SAVE") {
      targetInput.setAttribute("readonly", "readonly");
      target.innerText = "EDIT";

      axios({
        method: "PUT",
        url: `http://localhost:8080/todos/${targetId}`,
        headers: {
          Authorization: `Basic ${token}`,
        },
        data: {
          title: targetInput.value,
        },
      });
    }
  };

  function handleLogOut() {
    window.localStorage.removeItem("token");
    getToken();
  }

  return (
    <CenterSection>
      <Header title="Todo List 2022" />
      <LogOutButton onClick={handleLogOut} name="Logout" />
      <TodoInput onClick={handleInputClick} />
      <Header title="Todos" />
      <ul>
        {todos &&
          todos.map((todo, idx) => (
            <TodoItem
              key={idx}
              id={todo.id}
              value={todo.title}
              onClick={handleTodoClick}
            />
          ))}
      </ul>
    </CenterSection>
  );
};

export default Home;
