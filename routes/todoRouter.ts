import { Hono } from "hono";
import * as todoController from "../controllers/todoController";
import { validateToken } from "../middleware/validateToken";

const router = new Hono();

// 모든 경로에 대해 validateToken 미들웨어 적용
router.use("*", validateToken);

// 라우트 설정
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
