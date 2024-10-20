export interface CreateTodo {
	title: string;
	description: string;
	completed?: boolean;
}

export interface Todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

export const createTodo = (newTodo: CreateTodo) => {
	// save into local storage array of todos
	const todos = JSON.parse(localStorage.getItem("todos") || "[]");

	const todo = makeTodo({
		title: newTodo.title,
		description: newTodo.description,
		completed: newTodo.completed || false,
	});
	todos.push(todo);
	return todo;
};

interface MakeTodo {
	id?: number;
	title: string;
	description: string;
	completed: boolean;
}

const makeTodo = (todo: MakeTodo): Todo => {
	return {
		id: todo.id || Math.floor(Math.random() * 1000),
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
	};
};
