import { todoRepository } from "../repositories/todoRepository.js";
import type { FindTodosOptions, Todo, TodoInput } from "../types/todos.js";
import { TodoQueryService } from "./todoQueryService.js";

export const createTodo = async (params: TodoInput) => {
  return todoRepository.create(params);
};

export const findTodos = (options: FindTodosOptions) => {
  const todos = todoRepository.getAll() ?? [];

  return new TodoQueryService(todos)
    .filterByPriority(options.priorityFilter)
    .searchByKeyword(options.keyword)
    .sortByField(options.sort, options.order)
    .getResult();
};

export const findTodo = (predicate: (todo: Todo) => boolean) => {
  return todoRepository.find(predicate);
};

export const updateTodo = async (todo: Todo, todoValue: Partial<Todo>) => {
  return todoRepository.update(todo, todoValue);
};

export const deleteTodo = async (todoToDelete: Todo) => {
  return todoRepository.delete(todoToDelete);
};
