import { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import * as userService from "../services/userService.js";
import { createError } from "../utils/responseUtils.js";
import { loginValidator, USER_VALIDATION_ERRORS } from "../utils/validator.js";
import { createToken } from "../utils/authorizeUtils.js";

import type { UserInput } from "../types/users.js";

// 로그인
export const login = async (c: Context) => {
  const { email, password }: UserInput = await c.req.json();

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return c.json(createError(message), StatusCodes.BAD_REQUEST);
  }

  const user = userService.findUser(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return c.json({
      message: "성공적으로 로그인 했습니다",
      token: createToken(email),
    });
  } else {
    return c.json(
      createError(USER_VALIDATION_ERRORS.USER_NOT_FOUND),
      StatusCodes.BAD_REQUEST
    );
  }
};

// 회원 가입
export const signUp = async (c: Context) => {
  const { email, password }: UserInput = await c.req.json();

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return c.json(createError(message), StatusCodes.BAD_REQUEST);
  }

  const existUser = userService.findUser((user) => user.email === email);
  if (existUser) {
    return c.json(
      createError(USER_VALIDATION_ERRORS.EXIST_USER),
      StatusCodes.CONFLICT
    );
  } else {
    await userService.createUser({ email, password });

    return c.json({
      message: "계정이 성공적으로 생성되었습니다",
      token: createToken(email),
    });
  }
};
