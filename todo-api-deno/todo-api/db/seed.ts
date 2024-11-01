import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { makeTodo, type Todo } from "../src/types/todo.ts";

const db = new DB("./db/clean_example_development.db");

// Sample data
const Todos: Array<Todo> = [
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

for (const todo of Todos) {
	db.query(
		"INSERT INTO todos (id, title, label, description, status, priority) VALUES (?, ?, ?, ?, ?, ?)",
		[
			todo.id,
			todo.title,
			todo.label,
			todo.description,
			todo.status,
			todo.priority,
		],
	);
}

// Close connection
db.close();

export default db;
