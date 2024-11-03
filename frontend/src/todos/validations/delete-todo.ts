import { z } from "zod";
import { todoSchema } from "../todo";

export const deleteTodoSchema = todoSchema.pick({ id: true });

export type DeleteTodo = z.infer<typeof deleteTodoSchema>;
