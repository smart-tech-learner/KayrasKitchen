import { Router } from "express";
import { login, logout, register } from "../Controllers/AuthController.js";
import {
  validateLogin,
  validateRegister,
} from "../Middlewares/ValidationMiddleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
