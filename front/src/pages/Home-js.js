import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";

const Home = () => {
  const [token, setToken] = useState();
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);

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

  function handleEdit(e) {
    const editTarget = e.target.parentNode;
    const beforeEditTitle = editTarget.querySelector(".title").innerHTML;
    const beforeEditContent = editTarget.querySelector(".content").innerHTML;

    const li = document.createElement("li");
    li.classList.add("editInputs");
    const editInputTitle = document.createElement("input");
    editInputTitle.setAttribute("value", beforeEditTitle);
    editInputTitle.classList.add("editTitle");
    const editInputContent = document.createElement("input");
    editInputContent.setAttribute("value", beforeEditContent);
    editInputContent.classList.add("editContent");
    const editConfirmButton = document.createElement("button");
    editConfirmButton.innerText = "수정확인";

    e.target.parentNode.remove();
    const ul = document.querySelector(".todoList");
    li.append(editInputTitle, editInputContent, editConfirmButton);
    ul.appendChild(li);
    editConfirmButton.addEventListener("click", function () {
      const title = document.querySelector(".editTitle").value;
      const content = document.querySelector(".editContent").value;

      axios({
        method: "PUT",
        url: `http://localhost:8080/todos/${editTarget.id}`,
        data: {
          title: title,
          content: content,
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      }).then((res) => {
        getTodos();

        const ul = document.querySelector(".todoList");
        const li = document.createElement("li");
        li.innerHTML = `<span>${res.data.data.title}</span><br /><span>${res.data.data.content}</span>`;
        ul.append(li);
        const editInputs = document.querySelector(".editInputs");
        editInputs.remove();

        setEdit(!edit);
      });
    });
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
                  <br />
                  <span className="content"> {el.content}</span>
                  <button onClick={handleDel}>삭제</button>
                  <button onClick={handleEdit}>수정</button>
                  <hr />
                </li>
              );
            })}
        </ul>
        <form>
          <input placeholder="title" {...register("title")} />
          <input placeholder="content" {...register("content")} />
        </form>
        <TodoBtn onClick={handleSubmit(onSubmit)}>추가</TodoBtn>
      </TodoSection>
    </div>
  );
};

export default Home;

const TodoSection = styled.div``;
const TodoBtn = styled.button``;
