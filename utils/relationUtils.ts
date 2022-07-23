import { db } from "../models/db";

export const getTodoByTodoId = (todoId: string) => {
  return db.data?.todos.find((t) => t.id === todoId);
};
