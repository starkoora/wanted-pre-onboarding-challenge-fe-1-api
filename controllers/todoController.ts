import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as todoService from "../services/todoService";
import { createError, createResponse } from "../utils/responseUtils";
import { TODO_VALIDATION_ERRORS } from "../utils/validator";
import type { TodoInput } from "../types/todos";

export const createTodo = async (req: Request, res: Response) => {
  const { title, content }: TodoInput = req.body;

  if (title) {
    const todo = await todoService.createTodo({ title, content });

    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(TODO_VALIDATION_ERRORS.INVALID_VALUE));
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
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }
};

export const getTodoById = (req: Request, res: Response) => {
  const { id: todoId } = req.params;

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (todo) {
    return res.status(StatusCodes.OK).send(createResponse(todo));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
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
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id: todoId } = req.params;

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (!todo) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG));
  }

  await todoService.deleteTodo(todo);

  return res.status(StatusCodes.OK).send(createResponse(null));
};
