import { Hono } from "hono";
import * as authController from "../controllers/authController";

const router = new Hono();

router.get("/login", authController.login);
router.get("/create", authController.signUp);

export default router;
