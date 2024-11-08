import { testClient } from "hono/testing";
import todoRouter from "../routes/todoRouter";
import { TodoInput } from "../types/todos";

export const todo = {
  title: "New Todo",
  content: "This is a new todo",
};

export const createTodo = async (todo: TodoInput, token: string) => {
  const client = testClient(todoRouter);

  return client.index.$post(
    { json: todo },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getTodo = async (id: string, token: string) => {
  const client = testClient(todoRouter);

  return client.index.$get(
    { id },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateTodo = async (
  id: string,
  todo: TodoInput,
  token: string
) => {
  const client = testClient(todoRouter);

  return client[":id"].$put(
    {
      param: { id },
      // @ts-ignore - put 메서드에 대한 타입 추론 활성화 시킬 수 있는 방법 찾기
      json: todo,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteTodo = async (id: string, token: string) => {
  const client = testClient(todoRouter);

  return client[":id"].$delete(
    { param: { id } },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
