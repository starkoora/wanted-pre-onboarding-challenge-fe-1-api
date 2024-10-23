import { Hono } from "hono";
import { cors } from "hono/cors";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import todoRouter from "./routes/todoRouter";
import userRouter from "./routes/userRouter";
import { createError } from "./utils/responseUtils";
import { StatusCodes } from "http-status-codes";

const app = new Hono();

app.use("*", cors());

app.route("/todos", todoRouter);
app.route("/users", userRouter);

app.notFound((c) => {
  return c.json(createError("Not Found"), StatusCodes.NOT_FOUND);
});

app.onError(globalErrorHandler);

export default app;
