import { Router } from "express";
import authmiddleware from "../middlewares/auth.middleware.js";
import { getTodos , createTodo , toggleTodo , deleteTodo , updateTodoTitle} from "../controllers/todo.controller.js";

const router = Router();

router.get("/",authmiddleware,getTodos);

router.post("/", authmiddleware, createTodo);

router.put("/:id", authmiddleware, toggleTodo);

router.delete("/:id",authmiddleware,deleteTodo);

router.put("/:id/title", authmiddleware, updateTodoTitle);

export default router;