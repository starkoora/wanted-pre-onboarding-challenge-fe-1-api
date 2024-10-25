import { Hono } from "hono";
import * as authController from "../controllers/authController";

const router = new Hono();

router.post("/login", authController.login);
router.post("/create", authController.signUp);

export default router;
