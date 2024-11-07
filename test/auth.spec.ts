import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { testClient } from "hono/testing";

import userRouter from "../routes/userRouter";
import { DB } from "../models/db";

beforeAll(async () => {
  await DB.createConnection({ preserve: false });
});

describe("User API", () => {
  test("POST /users/create - 사용자 계정 생성", async () => {
    const response = await userRouter.request("/create", {
      method: "POST",
      body: JSON.stringify({
        email: "testuser@example.com",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  test("POST /users/login - 사용자 계정 로그인", async () => {
    const res = await userRouter.request("/login", {
      method: "POST",
      body: JSON.stringify({
        email: "testuser@example.com",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await DB.instance.write();
});
