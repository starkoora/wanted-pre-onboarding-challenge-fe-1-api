import { afterAll, beforeAll, describe, expect, test } from "vitest";

import userRouter from "../routes/userRouter";
import { DB } from "../models/db";

const email = "testuser@example.com";
const password = "password123";

beforeAll(async () => {
  await DB.createConnection({ preserve: false });
});

describe("User API", () => {
  test("POST /users/create - 사용자 계정 생성", async () => {
    const response = await userRouter.request("/create", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  test("POST /users/login - 사용자 계정 로그인", async () => {
    const res = await userRouter.request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
