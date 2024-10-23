import cors from "cors";
import express from "express";
import createError from "http-errors";
import bodyParser from "body-parser";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import todoRouter from "./routes/todoRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/todos", todoRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(globalErrorHandler);

export default app;
