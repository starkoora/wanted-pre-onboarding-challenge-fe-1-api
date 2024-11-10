import { testClient } from "hono/testing";
import todoRouter from "../routes/todoRouter.js";
import { Todo, TodoInput } from "../types/todos.js";

export const todo: TodoInput = {
  title: "New Todo",
  content: "This is a new todo",
  priority: "normal",
};

// 테스트용 데이터
export const todosForQS: Todo[] = [
  {
    id: "1",
    title: "Urgent Task",
    content: "This is an urgent task",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    priority: "urgent",
  },
  {
    id: "2",
    title: "Normal Task",
    content: "This is a normal task",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
    priority: "normal",
  },
  {
    id: "3",
    title: "Low Priority Task",
    content: "This task has low priority",
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-03T00:00:00.000Z",
    priority: "low",
  },
];

export const createTodo = async (todo: TodoInput, token: string) => {
  const client = testClient(todoRouter);

  return client.index.$post(
    { json: todo },
    { headers: { Authorization: token } }
  );
};

export const getTodo = async (id: string, token: string) => {
  const client = testClient(todoRouter);

  return client[":id"].$get(
    { param: { id } },
    { headers: { Authorization: token } }
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
    { headers: { Authorization: token } }
  );
};

export const deleteTodo = async (id: string, token: string) => {
  const client = testClient(todoRouter);

  return client[":id"].$delete(
    { param: { id } },
    { headers: { Authorization: token } }
  );
};
