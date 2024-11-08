import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";

import { JWT_TOKEN_SALT } from "../utils/authorizeUtils";
import { StatusCodes } from "http-status-codes";
import { createError } from "../utils/responseUtils";

export const validateToken = createMiddleware(async (c, next) => {
  const token = c.req.header()["authorization"].split(" ")[1];

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
