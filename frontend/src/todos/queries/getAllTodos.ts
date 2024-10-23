import { Todo } from "..";

export const getAllTodos = (): Todo[] => {
	const todosJson = localStorage.getItem("todos");
	if (!todosJson) {
		return [];
	}
	try {
		return JSON.parse(todosJson) as Todo[];
	} catch (error) {
		console.error("Error parsing todos from localStorage", error);
		return [];
	}
};
