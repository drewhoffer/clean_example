import { http } from "@/lib/http";
import { Todo } from "../todo";
import { DeleteTodo } from "../validations";

export const deleteTodo = async (todoToDelete: DeleteTodo): Promise<Todo> =>
	await http.deleteReq<Todo>(`/todos/${todoToDelete.id}`);
