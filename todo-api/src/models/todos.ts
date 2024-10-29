import { makeTodo, type Todo } from "../types/todo.ts";

export const Todos: Array<Todo> = [
	makeTodo({
		title: "Create a todo API",
		label: "feature",
		description: "Create a todo API using Oak",
		status: "in progress",
		priority: "high",
	}),
	makeTodo({
		title: "Create a dinosaur API",
		label: "feature",
		description: "Create a dinosaur API using Oak",
		status: "done",
		priority: "low",
	}),
	makeTodo({
		title: "Create a user API",
		label: "feature",
		description: "Create a user API using Oak",
		priority: "medium",
		status: "backlog",
	}),
	makeTodo({
		title: "Create a blog API",
		label: "feature",
		description: "Create a blog API using Oak",
		priority: "low",
		status: "backlog",
	}),
];
