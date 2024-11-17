import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(500),
	due_date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			return new Date(arg);
		}
	}, z.date()),
	completed: z.boolean(),
});

export type CreateTodo = z.infer<typeof createTodoSchema>;
