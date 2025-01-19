import { Context } from "hono";
import { HTTPResponseError } from "hono/types";
import { StatusCodes } from "http-status-codes";

import { createError } from "../utils/responseUtils.js";

export const globalErrorHandler = (
  err: Error | HTTPResponseError,
  c: Context
) => {
  console.error(err);
  return c.json(
    createError("Something went wrong"),
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
