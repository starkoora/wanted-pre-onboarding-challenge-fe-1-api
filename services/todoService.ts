import { todoRepository } from "../repositories/todoRepository";
import type { Todo, TodoInput } from "../types/todos";

export const createTodo = async ({ title, content }: TodoInput) => {
  return todoRepository.create({ title, content });
};

export const findTodos = () => {
  return todoRepository.getAll();
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
