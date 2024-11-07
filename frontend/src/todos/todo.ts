import { z } from "zod";

export const todoSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	dueDate: z.date(),
	completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

export type MakeTodoParams = Omit<Todo, "id"> & { id?: string };

export function makeTodo({
	id,
	title,
	dueDate,
	completed,
	description,
}: MakeTodoParams) {
	return {
		id,
		title,
		dueDate,
		completed,
		description,
	};
}
