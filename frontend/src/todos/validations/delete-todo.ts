import { z } from "zod";

export const deleteTodoSchema = z.object({
	id: z.string(),
});

export type DeleteTodo = z.infer<typeof deleteTodoSchema>;
