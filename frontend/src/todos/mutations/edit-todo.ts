import { http } from "@/lib";
import { makeTodo, Todo } from "../todo";
import { EditTodo } from "../validations";

export const editTodo = async (todoToEdit: EditTodo): Promise<Todo> =>
	await http.patch<Todo>(
		`/todos/${todoToEdit.id}`,
		makeTodo(todoToEdit),
	);
