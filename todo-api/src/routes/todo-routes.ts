import { Router } from "@oak/oak/router";
import {
	createTodo,
	deleteTodo,
	getTodo,
	getTodos,
	updateTodo,
} from "../controllers/todos.ts";

export const router = new Router();

router.get("/api/v1/todos", getTodos)
	.get("/api/v1/todos/:id", getTodo)
	.post("/api/v1/todos", createTodo)
	.put("/api/v1/todos/:id", updateTodo)
	.delete("/api/v1/todos/:id", deleteTodo);

export default router;
