import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(500),
	label: z.string(),
	status: z.union([
		z.literal("backlog"),
		z.literal("todo"),
		z.literal("in progress"),
		z.literal("done"),
		z.literal("canceled"),
	]).optional().default("backlog"),
	priority: z.union([
		z.literal("low"),
		z.literal("medium"),
		z.literal("high"),
	]).optional().default("low"),
});

export type CreateTodo = z.infer<typeof createTodoSchema>;
