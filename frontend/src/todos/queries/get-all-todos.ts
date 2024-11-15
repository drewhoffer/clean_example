import { http } from "@/lib/http";
import { Todo } from "..";

export const getAllTodos = async (): Promise<Todo[]> =>
	await http.get<Todo[]>("/todos");
