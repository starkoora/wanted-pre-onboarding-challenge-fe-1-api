import { testClient } from "hono/testing";
import { beforeAll, describe, expect, test } from "vitest";

import { DB } from "../models/db.js";
import todoRouter from "../routes/todoRouter.js";
import { Todo } from "../types/todos.js";
import {
  createTodo,
  deleteTodo,
  getTodo,
  todo,
  updateTodo,
} from "./setupTodos.js";
import { createUser, user } from "./setupUser.js";

let token: string;

beforeAll(async () => {
  await DB.createConnection({ preserve: false, filename: "test.json" });

  const response = await createUser(user);
  const body = await response.json();

  if ("token" in body) {
    token = body.token;
  }
});

describe("Todos API", () => {
  describe("POST /todos", () => {
    test("should create a new todo", async () => {
      const response = await createTodo(todo, token);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
    });
  });

  describe("GET /todos", () => {
    test("should return a list of todos", async () => {
      const client = testClient(todoRouter);

      const response = await client.index.$get(
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
    });
  });

  describe("GET /todos/:id", () => {
    test("should return a single todo by ID", async () => {
      const response = await createTodo(todo, token);
      const body = (await response.json()) as { data: { id: string } };

      const todoId = body.data.id;

      const getResponse = await getTodo(todoId, token);
      const getBody = await getResponse.json();

      expect(getResponse.status).toBe(200);
      expect(getBody).toHaveProperty("data");
    });
  });

  describe("PUT /todos/:id", () => {
    test("should update an existing todo", async () => {
      const createResponse = await createTodo(todo, token);

      const createBody = (await createResponse.json()) as {
        data: { id: string };
      };
      const todoId = createBody.data.id;

      const updateResponse = await updateTodo(todoId, todo, token);
      const updateBody = await updateResponse.json();

      expect(updateResponse.status).toBe(200);
      expect(updateBody).toHaveProperty("data");
    });
  });

  describe("DELETE /todos/:id", () => {
    test("should delete a todo by ID", async () => {
      const createResponse = await createTodo(todo, token);

      const createBody = (await createResponse.json()) as {
        data: Todo;
      };
      const todoId = createBody.data.id;

      const deleteResponse = await deleteTodo(todoId, token);
      const deleteBody = await deleteResponse.json();

      expect(deleteResponse.status).toBe(200);
      expect(deleteBody).toHaveProperty("data");
    });
  });
});
