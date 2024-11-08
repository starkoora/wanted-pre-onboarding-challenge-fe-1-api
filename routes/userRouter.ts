import { Hono } from "hono";

import * as authController from "../controllers/authController.js";

const router = new Hono()
  .post("/login", authController.login)
  .post("/create", authController.signUp);

export default router;
