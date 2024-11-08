import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { testClient } from "hono/testing";

import userRouter from "../routes/userRouter";
import { DB } from "../models/db";

const email = "testuser@example.com";
const password = "password123";

beforeAll(async () => {
  await DB.createConnection({ preserve: false });
});

describe("User API", () => {
  test("POST /users/create - 사용자 계정 생성", async () => {
    const client = testClient(userRouter);

    const response = await client.create.$post({
      json: { email, password },
    });

    const body = await response.json();
    console.log(body);

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  test("POST /users/login - 사용자 계정 로그인", async () => {
    const client = testClient(userRouter);

    const response = await client.login.$post({
      json: { email, password },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await DB.instance.write();
});
