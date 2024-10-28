import { z } from "zod";
import { createTodoSchema } from "./create-todo";

// Type of CreateTodo but has an id field which is a required string
export const editTodoSchema = createTodoSchema.extend({
	id: z.string(),
});
export type EditTodo = z.infer<typeof editTodoSchema>;
