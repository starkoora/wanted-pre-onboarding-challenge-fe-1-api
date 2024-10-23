import { create, Data, db, update } from "../models/db";
import type { Todo, TodoInput } from "../types/todos";

export const todoRepository = {
  create: async ({ title, content }: TodoInput) => {
    const todo = create<Todo>({ title, content });

    db.data?.todos.push(todo);
    await db.write();

    return todo;
  },
  getAll: () => {
    return db.data?.todos;
  },
  find: (predicate: (todo: Todo) => boolean) => {
    return db.data?.todos.find(predicate);
  },
  update: async (todo: Todo, todoValue: Partial<Todo>) => {
    Object.assign(todo, update<Todo>({ ...todo, ...todoValue }));

    await db.write();

    return todo;
  },
  delete: async (todoToDelete: Todo) => {
    const filteredTodos = db.data?.todos.filter(
      (todo) => todo.id !== todoToDelete.id
    )!;

    (db.data as Data).todos = filteredTodos;

    await db.write();

    return todoToDelete;
  },
};
