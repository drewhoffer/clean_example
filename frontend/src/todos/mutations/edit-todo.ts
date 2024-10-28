import { makeTodo, Todo } from "../todo";
import { EditTodo } from "../validations";

export const editTodo = (todoToEdit: EditTodo) => {
	try {
		const todos = JSON.parse(
			localStorage.getItem("todos") || "[]",
		) as Todo[];

		const updatedTodo = makeTodo({
			...todoToEdit,
		});
		// find the index of the todo to update
		todos.splice(
			todos.findIndex((todo) => {
				console.log(todo.id, todoToEdit.id);
				return todo.id === todoToEdit.id;
			}),
			1,
			updatedTodo,
		);

		localStorage.setItem("todos", JSON.stringify(todos));
		return updatedTodo;
	} catch (error) {
		console.error("Failed to update todo:", error);
		return null;
	}
};
