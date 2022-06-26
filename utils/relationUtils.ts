import { db } from "../models/db";

export const getTodoByTodoId = (todoId: any) => {
  return db.data?.todos.find((t) => t.id === todoId);
};
