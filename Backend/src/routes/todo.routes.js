import { Router } from "express";
import authmiddleware from "../middlewares/auth.middleware.js";
import { getTodos } from "../controllers/todo.controller.js";
import { createTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/",authmiddleware,getTodos);

router.post("/", authmiddleware, createTodo);

export default router;