import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import createError from "http-errors";
import bodyParser from "body-parser";

import todos from "./routes/todos";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/todos", todos);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(
  (
    err: Error & { status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err.status || 500);
    res.send(err);
  }
);

export default app;
