import { Todo } from "../todo";
import { DeleteTodo } from "../validations";

export const deleteTodo = (todoToDelete: DeleteTodo) => {
	try {
		const todos = JSON.parse(
			localStorage.getItem("todos") || "[]",
		) as Todo[];

		// find the index of the todo to remove
		const index = todos.findIndex((todo) => todo.id === todoToDelete.id);
		const deletedTodo = todos[index];
		todos.splice(index, 1);

		localStorage.setItem("todos", JSON.stringify(todos));
		return deletedTodo;
	} catch (error) {
		console.error("Failed to delete todo:", error);
		return null;
	}
};
