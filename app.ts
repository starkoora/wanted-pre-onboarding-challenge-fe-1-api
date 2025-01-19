import { Hono } from "hono";
import { cors } from "hono/cors";
import { StatusCodes } from "http-status-codes";

import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import todoRouter from "./routes/todoRouter.js";
import userRouter from "./routes/userRouter.js";
import { createError } from "./utils/responseUtils.js";

const app = new Hono();

app.use("*", cors());

app.route("/todos", todoRouter);
app.route("/users", userRouter);

app.notFound((c) => {
  return c.json(createError("Not Found"), StatusCodes.NOT_FOUND);
});

app.onError(globalErrorHandler);

export default app;
