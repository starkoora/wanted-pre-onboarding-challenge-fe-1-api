import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

import app from "../app";

let token: string;

describe.skip("Todos API", () => {
  beforeAll(async () => {
    if (!token) {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "test@example.com", password: "password123" });
      token = response.body.token;
    }
  });

  describe("GET /todos", () => {
    it("should return a list of todos", async () => {
      const response = await request(app)
        .get("/todos")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const response = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "New Todo", content: "This is a new todo" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("title", "New Todo");
      expect(response.body.data).toHaveProperty(
        "content",
        "This is a new todo"
      );
    });
  });

  describe("GET /todos/:id", () => {
    it("should return a single todo by ID", async () => {
      const createResponse = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Single Todo", content: "This is a single todo" });
      const todoId = createResponse.body.data.id;

      const response = await request(app)
        .get(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id", todoId);
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update an existing todo", async () => {
      const createResponse = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Todo to update", content: "Initial content" });
      const todoId = createResponse.body.data.id;

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated title", content: "Updated content" });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("title", "Updated title");
      expect(response.body.data).toHaveProperty("content", "Updated content");
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete a todo by ID", async () => {
      const createResponse = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Todo to delete", content: "Content to delete" });
      const todoId = createResponse.body.data.id;

      const response = await request(app)
        .delete(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data", null);
    });
  });
});
