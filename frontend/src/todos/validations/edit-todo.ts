import { z } from "zod";
import { createTodoSchema } from "./create-todo";
import { todoSchema } from "../todo";

export const editTodoSchema = createTodoSchema.extend({
	id: todoSchema.shape.id,
});

export type EditTodo = z.infer<typeof editTodoSchema>;
