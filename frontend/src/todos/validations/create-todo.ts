import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(500),
	dueDate: z.date(),
	completed: z.boolean(),
});

export type CreateTodo = z.infer<typeof createTodoSchema>;
