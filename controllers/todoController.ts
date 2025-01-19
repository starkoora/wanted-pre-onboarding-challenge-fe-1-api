import { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import * as todoService from "../services/todoService.js";
import { createError, createResponse } from "../utils/responseUtils.js";
import { TODO_VALIDATION_ERRORS } from "../utils/validator.js";
import type { TodoInput } from "../types/todos.js";

export const createTodo = async (c: Context) => {
  const params: TodoInput = await c.req.json();

  if (Object.values(params).every(Boolean)) {
    const todo = await todoService.createTodo(params);

    return c.json(createResponse(todo), StatusCodes.OK);
  } else {
    return c.json(
      createError(TODO_VALIDATION_ERRORS.INVALID_VALUE),
      StatusCodes.BAD_REQUEST
    );
  }
};

export const getTodos = async (c: Context) => {
  const query = c.req.query();

  const todos = todoService.findTodos(query);

  if (todos) {
    if (query.countOnly === 'true') {
      return c.json(createResponse(todos.length), StatusCodes.OK);
    }
    return c.json(createResponse(todos), StatusCodes.OK);
  } else {
    return c.json(
      createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG),
      StatusCodes.BAD_REQUEST
    );
  }
};

export const getTodoById = (c: Context) => {
  const { id: todoId } = c.req.param();

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (todo) {
    return c.json(createResponse(todo), StatusCodes.OK);
  } else {
    return c.json(
      createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG),
      StatusCodes.BAD_REQUEST
    );
  }
};

export const updateTodo = async (c: Context) => {
  const { id: todoId } = c.req.param();
  const params: TodoInput = await c.req.json();

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (todo) {
    await todoService.updateTodo(todo, params);

    return c.json(createResponse(todo), StatusCodes.OK);
  } else {
    return c.json(
      createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG),
      StatusCodes.BAD_REQUEST
    );
  }
};

export const deleteTodo = async (c: Context) => {
  const { id: todoId } = c.req.param();

  const todo = todoService.findTodo((todo) => todo.id === todoId);

  if (!todo) {
    return c.json(
      createError(TODO_VALIDATION_ERRORS.TODO_SOMETHING_WRONG),
      StatusCodes.BAD_REQUEST
    );
  }

  await todoService.deleteTodo(todo);

  return c.json(createResponse(null), StatusCodes.OK);
};
