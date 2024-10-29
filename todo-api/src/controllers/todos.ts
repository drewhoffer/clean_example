import type { Response } from "@oak/oak/response";
import { Todos } from "../models/todos.ts";
import type { Request } from "@oak/oak/request";
import { makeTodo, type Todo } from "../types/todo.ts";
import type { RouterContext } from "@oak/oak/router";

interface GetTodosParams {
	response: Response;
}
export const getTodos = ({ response }: GetTodosParams) => {
	return response.body = {
		success: true,
		data: Todos,
	};
};

type GetTodoParams = RouterContext<"/api/v1/todos/:id">;

export const getTodo = (ctx: GetTodoParams) => {
	const { response } = ctx;
	const { id } = ctx.params;
	console.log(id);
	if (!id) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No id provided",
		};
		return response;
	}

	const selectedTodo: Todo | undefined = Todos.find((todo) => todo.id === id);

	if (selectedTodo) {
		response.status = 200;
		response.body = {
			success: true,
			data: selectedTodo,
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: "Todo Not Found",
		};
	}
	return response;
};

interface CreateTodoParams {
	request: Request;
	response: Response;
}

export const createTodo = async (
	{ request, response }: CreateTodoParams,
) => {
	if (!request.hasBody) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No data",
		};
	} else {
		const { todo } = await request.body.json();
		const newTodo = makeTodo({
			...todo,
			id: crypto.randomUUID(),
		});

		Todos.push(newTodo);
		response.status = 201;
		response.body = {
			success: true,
			data: todo,
		};
	}
};

type DeleteTodoParams = RouterContext<"/api/v1/todos/:id">;
export const deleteTodo = (
	ctx: DeleteTodoParams,
) => {
	const { response } = ctx;
	const { id } = ctx.params;

	if (!id) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No id provided",
		};
		return response;
	}
	const filteredTodos: Array<Todo> = Todos.filter(
		(todo: Todo) => (todo.id !== id),
	);

	if (filteredTodos.length === Todos.length) {
		response.status = 404;
		response.body = {
			success: false,
			msg: "Not found",
		};
	} else {
		Todos.splice(0, Todos.length);
		Todos.push(...filteredTodos);
		response.status = 200;
		response.body = {
			success: true,
			msg: `Todo with id ${id} has been deleted`,
		};
	}
};

type UpdateTodoParams = RouterContext<"/api/v1/todos/:id">;
export const updateTodo = async (
	ctx: UpdateTodoParams,
) => {
	const { request, response } = ctx;
	const { id } = ctx.params;

	if (!id) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No id provided",
		};
		return response;
	}
	const requestedTodo: Todo | undefined = Todos.find(
		(todo: Todo) => todo.id === id,
	);
	if (requestedTodo) {
		const { todo } = await request.body.json();
		const updatedTodo = makeTodo({
			...todo,
			id: id!,
		});

		const updatedTodos: Array<Todo> = Todos.map(
			(todo: Todo) => {
				if (todo.id === id) {
					return {
						...todo,
						...updatedTodo,
					};
				} else {
					return todo;
				}
			},
		);

		Todos.splice(0, Todos.length);
		Todos.push(...updatedTodos);
		response.status = 200;
		response.body = {
			success: true,
			msg: `Todo with id ${id} updated`,
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: `Not Found`,
		};
	}
};

export default {
	updateTodo,
	deleteTodo,
	getTodos,
	getTodo,
	createTodo,
};
