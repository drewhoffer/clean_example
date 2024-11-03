import { http } from "@/lib";
import { makeTodo, Todo } from "../todo";
import { CreateTodo } from "../validations";

export const createTodo = async (newTodo: CreateTodo): Promise<Todo> =>
	await http.post<Todo>(
		"/todos",
		makeTodo(newTodo),
	);
