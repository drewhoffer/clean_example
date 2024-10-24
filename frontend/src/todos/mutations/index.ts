import { z } from "zod";
import { makeTodo } from "../todo";
import { CreateTodo } from "../validations";

export const createTodo = (newTodo: CreateTodo) => {
	try {
		const todos = JSON.parse(localStorage.getItem("todos") || "[]");

		const createdTodo = makeTodo({
			...newTodo,
		});
		console.log(createdTodo);
		todos.push(createdTodo);
		localStorage.setItem("todos", JSON.stringify(todos));
		return createdTodo;
	} catch (error) {
		console.error("Failed to create todo:", error);
		return null;
	}
};
