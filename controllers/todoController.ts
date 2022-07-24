import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { createError, createResponse } from "../utils/responseUtils";
import * as todoService from "../services/todoService";
import type { TodoInput } from "../types/todos";

export const createTodo = async (req: Request, res: Response) => {
  const { title, content }: TodoInput = req.body;

  if (title) {
    const todo = todoService.createTodo({ title, content });

    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("must provide a valid title"));
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const { countOnly } = req.query;

  const todos = todoService.findTodos();

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

export const getTodoById = (req: Request, res: Response) => {
  const { id: todoId } = req.params;

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  console.log(todo);

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

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (todo) {
    await todoService.updateTodo(todo, { title, content });

    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("unable to find designated memo"));
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id: todoId } = req.params;

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (!todo) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("unable to find designated todo"));
  }

  await todoService.deleteTodo(todo);

  return res.status(StatusCodes.OK).send(createResponse(null));
};
