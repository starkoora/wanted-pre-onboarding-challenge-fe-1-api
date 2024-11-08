import { Data, DB } from "../models/db.js";
import type { Todo, TodoInput } from "../types/todos.js";

export const todoRepository = {
  create: async ({ title, content, priority }: TodoInput) => {
    const todo = DB.create<Todo>({ title, content, priority });

    DB.instance.data?.todos.push(todo);
    await DB.instance.write();

    return todo;
  },
  getAll: () => {
    return DB.instance.data?.todos;
  },
  find: (predicate: (todo: Todo) => boolean) => {
    return DB.instance.data?.todos.find(predicate);
  },
  update: async (todo: Todo, todoValue: Partial<Todo>) => {
    Object.assign(todo, DB.update<Todo>({ ...todo, ...todoValue }));

    await DB.instance.write();

    return todo;
  },
  delete: async (todoToDelete: Todo) => {
    const filteredTodos = DB.instance.data?.todos.filter(
      (todo) => todo.id !== todoToDelete.id
    )!;

    (DB.instance.data as Data).todos = filteredTodos;

    await DB.instance.write();

    return todoToDelete;
  },
};
