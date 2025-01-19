import { testClient } from "hono/testing";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";

import { DB } from "../models/db.js";
import todoRouter from "../routes/todoRouter.js";
import { Todo } from "../types/todos.js";
import {
  createTodo,
  deleteTodo,
  getTodo,
  todo,
  todosForQS,
  updateTodo,
} from "./setupTodos.js";
import { createUser, user } from "./setupUser.js";
import { TodoQueryService } from "../services/todoQueryService.js";
import { ResponseData } from "../utils/responseUtils.js";

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
    test("새로운 할 일을 생성해야 한다", async () => {
      const response = await createTodo(todo, token);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
    });
  });

  describe("GET /todos", () => {
    test("할 일 목록을 반환해야 한다", async () => {
      const client = testClient(todoRouter);

      const response = await client.index.$get(
        {},
        { headers: { Authorization: token } }
      );
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
    });

    test("할 일 목록의 개수를 반환해야 한다", async () => {
      const client = testClient(todoRouter);

      const response = await client.index.$get(
        { query: { countOnly: true } },
        { headers: { Authorization: token } }
      );
      const body = (await response.json()) as ResponseData;

      expect(response.status).toBe(200);
      expect(body.data).toBe(1);
    });

    test("countOnly가 false일 때는 할 일 목록을 그대로 반환해야 한다", async () => {
      const client = testClient(todoRouter);

      const response = await client.index.$get(
        { query: { countOnly: false } },
        { headers: { Authorization: token } }
      );
      const body = (await response.json()) as ResponseData;

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
      expect(Array.isArray(body.data)).toBe(true);
    });

    test("할 일 목록을 필터링해야 한다", async () => {
      const client = testClient(todoRouter);

      const response = await client.index.$get(
        { query: { priorityFilter: "urgent" } },
        { headers: { Authorization: token } }
      );
      const body = (await response.json()) as ResponseData;

      expect(response.status).toBe(200);
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveLength(0);
    });
  });

  describe("GET /todos/:id", () => {
    test("ID로 특정 할 일을 반환해야 한다", async () => {
      const response = await createTodo(todo, token);
      const body = (await response.json()) as { data: { id: string } };

      const todoId = body.data.id;

      const getResponse = await getTodo(todoId, token);
      const getBody = (await getResponse.json()) as ResponseData;

      expect(getResponse.status).toBe(200);
      expect(getBody.data).toEqual(body.data);
    });
  });

  describe("PUT /todos/:id", () => {
    test("기존 할 일을 업데이트해야 한다", async () => {
      const createResponse = await createTodo(todo, token);

      const createBody = (await createResponse.json()) as {
        data: { id: string };
      };
      const todoId = createBody.data.id;

      const updateResponse = await updateTodo(
        todoId,
        { ...todo, content: "hi" },
        token
      );
      const updateBody = (await updateResponse.json()) as ResponseData;

      expect(updateResponse.status).toBe(200);
      expect(updateBody.data.content).toBe("hi");
    });
  });

  describe("DELETE /todos/:id", () => {
    test("ID로 특정 할 일을 삭제해야 한다", async () => {
      const createResponse = await createTodo(todo, token);

      const createBody = (await createResponse.json()) as {
        data: Todo;
      };
      const todoId = createBody.data.id;

      const deleteResponse = await deleteTodo(todoId, token);
      const deleteBody = (await deleteResponse.json()) as ResponseData;

      expect(deleteResponse.status).toBe(200);
      expect(deleteBody.data).toBeNull();
    });
  });
});

describe("TodoQueryService", () => {
  let queryService: TodoQueryService;

  beforeEach(() => {
    queryService = new TodoQueryService(todosForQS);
  });

  test("우선순위로 할 일을 필터링해야 한다", () => {
    const result = queryService.filterByPriority("urgent").getResult();
    expect(result).toHaveLength(1);
    expect(result[0].priority).toBe("urgent");
  });

  test("제목과 내용에서 키워드를 사용하여 할 일을 검색해야 한다", () => {
    const result = queryService.searchByKeyword("normal").getResult();
    expect(result).toHaveLength(1);
    expect(result[0].title).toContain("Normal");
  });

  test("생성일 기준 오름차순으로 할 일을 정렬해야 한다", () => {
    const result = queryService.sortByField("createdAt", "asc").getResult();
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
  });

  test("우선순위 기준으로 할 일을 정렬해야 한다", () => {
    const result = queryService.sortByField("priority", "asc").getResult();
    expect(result[0].priority).toBe("urgent");
    expect(result[1].priority).toBe("normal");
    expect(result[2].priority).toBe("low");
  });
});
