import { makeTodo } from "../todo";

export interface CreateTodo {
	title: string;
	description: string;
	completed?: boolean;
	importance?: string;
}

export const createTodo = (newTodo: CreateTodo) => {
	try {
		const todos = JSON.parse(localStorage.getItem("todos") || "[]");

		const createdTodo = makeTodo({
			title: newTodo.title,
			description: newTodo.description,
			completed: newTodo.completed || false,
		});
		todos.push(createdTodo);
		localStorage.setItem("todos", JSON.stringify(todos));
		return createdTodo;
	} catch (error) {
		console.error("Failed to create todo:", error);
		return null;
	}
};
