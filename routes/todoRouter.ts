import { Hono } from "hono";
import * as todoController from "../controllers/todoController.js";
import { validateToken } from "../middleware/validateToken.js";

const router = new Hono()
  .use("*", validateToken)
  .get("/", todoController.getTodos)
  .post("/", todoController.createTodo)
  .get("/:id", todoController.getTodoById)
  .put("/:id", todoController.updateTodo)
  .delete("/:id", todoController.deleteTodo);

export default router;
