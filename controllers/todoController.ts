import type { Request, Response } from "express";

import { create, Data, update } from "../models/db";
import { getTodoByTodoId } from "../utils/relationUtils";
import { StatusCodes } from "http-status-codes";
import { db } from "../models/db";
import { createError, createResponse } from "../utils/responseUtils";
import type { Todo } from "../types/todos";

export const createTodo = async (req: Request, res: Response) => {
  const { title, content }: { title: string; content: string } = req.body;

  console.log(req.body);

  if (title) {
    const todo = create<Todo>({ title, content });
    db.data?.todos.push(todo);
    await db.write();

    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("must provide a valid title"));
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const { countOnly } = req.query;

  const todos = db.data?.todos;

  if (todos) {
    if (countOnly) {
      return res.status(StatusCodes.OK).send(createResponse(todos.length));
    }
    return res.status(StatusCodes.OK).send(createResponse(todos));
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createError("Unable to retrieve data from server"));
  }
};

export const getTodo = (req: Request, res: Response) => {
  const todoId = req.params.id;

  const todo = getTodoByTodoId(todoId);

  if (todo) {
    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("invalid todo id"));
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { title, content } = req.body;

  const todo = getTodoByTodoId(todoId);

  Object.assign(update<Todo>(todo), { title, content });

  await db.write();

  if (todo) {
    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("unable to find designated memo"));
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id: todoId } = req.params;

  const todo = getTodoByTodoId(todoId);

  if (!todo) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("unable to find designated todo"));
  }

  const filteredTodos = db.data?.todos.filter((todo) => todo.id !== todoId)!;

  (db.data as Data).todos = filteredTodos;

  await db.write();

  return res.status(StatusCodes.OK).send(createResponse(null));
};
