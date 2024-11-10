import { http } from "@/lib";
import { Todo } from "..";

export const getAllTodos = async (): Promise<Todo[]> =>
	await http.get<Todo[]>("/todos?include_google_events=true");
