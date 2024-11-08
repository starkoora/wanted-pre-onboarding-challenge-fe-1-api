import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { DB } from "../models/db.js";
import { createUser, login, user } from "./setupUser.js";

beforeAll(async () => {
  await DB.createConnection({ preserve: false, filename: "test.json" });
});

describe("User API", () => {
  test("POST /users/create - 사용자 계정 생성", async () => {
    const response = await createUser(user);

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  test("POST /users/login - 사용자 계정 로그인", async () => {
    const response = await login(user);

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await DB.instance.write();
});
