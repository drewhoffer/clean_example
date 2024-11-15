import { http } from "@/lib/http";
import { makeTodo, Todo } from "../todo";
import { CreateTodo } from "../validations";

export const createTodo = async (newTodo: CreateTodo): Promise<Todo> =>
	await http.post<Todo>(
		"/todos",
		makeTodo(newTodo),
	);
