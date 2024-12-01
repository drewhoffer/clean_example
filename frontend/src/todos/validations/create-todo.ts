import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(500),
	due_date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			return new Date(arg);
		}
	}, z.date().optional()),
	completed: z.boolean(),
	// This will be a number input so we will need to ensure its converted to a number
	estimated_duration: z.preprocess((arg) => {
		if (typeof arg === "string") {
			return parseFloat(arg);
		}
		return arg;
	}, z.number().optional())
});

export type CreateTodo = z.infer<typeof createTodoSchema>;
