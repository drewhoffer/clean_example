import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  due_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
  completed: z.boolean(),
  estimated_duration: z.number().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

export type MakeTodoParams = Omit<Todo, "id"> & { id?: number };

export function makeTodo({
  id,
  title,
  due_date,
  completed,
  description,
  estimated_duration,
}: MakeTodoParams) {
  return {
    id,
    title,
    due_date,
    completed,
    description,
    estimated_duration,
  };
}
