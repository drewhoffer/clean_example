export interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	importance: string;
}

interface MakeTodo {
	id?: string;
	title: string;
	description: string;
	importance?: string; // maybe low | medium | high
	completed: boolean;
}

export const makeTodo = (todo: MakeTodo): Todo => {
	return {
		id: todo.id || Math.floor(Math.random() * 1000).toString(),
		title: todo.title,
		description: todo.description,
		importance: todo.importance ?? "low",
		completed: todo.completed,
	};
};
