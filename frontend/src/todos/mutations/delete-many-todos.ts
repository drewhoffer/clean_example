import { http } from "@/lib/http";
import { Todo } from "../todo";

export const deleteManyTodos = async (ids: Todo["id"][]) =>
	await http.deleteReq("/todos/destroy_many", { ids });
