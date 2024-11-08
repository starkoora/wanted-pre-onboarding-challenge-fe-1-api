import { testClient } from "hono/testing";
import userRouter from "../routes/userRouter.js";

export const createUser = (params: { email: string; password: string }) => {
  const client = testClient(userRouter);

  return client.create.$post({ json: params });
};

export const login = (params: { email: string; password: string }) => {
  const client = testClient(userRouter);

  return client.login.$post({ json: params });
};

export const user = {
  email: "testuser@example.com",
  password: "password123",
};
