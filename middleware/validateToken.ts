import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { JWT_TOKEN_SALT } from "../utils/authorizeUtils.js";
import { createError } from "../utils/responseUtils.js";

// TODO: @hono/zod-validator로 이관
export const validateToken = createMiddleware(async (c, next) => {
  const token = c.req.header()["authorization"];

  if (!token) {
    return c.json(createError("Token is missing"), StatusCodes.UNAUTHORIZED);
  }
  try {
    jwt.verify(token, JWT_TOKEN_SALT);
  } catch (err) {
    return c.json(createError("Invalid token"), StatusCodes.UNAUTHORIZED);
  }
  await next();
});
