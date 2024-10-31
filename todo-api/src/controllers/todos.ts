import type { Response } from "@oak/oak/response";
import type { Request } from "@oak/oak/request";
import { makeTodo } from "../models/todos.ts";
import type { RouterContext } from "@oak/oak/router";
import { todosDB } from "../data-access/index.ts";

interface GetTodosParams {
	response: Response;
}
export const getTodos = ({ response }: GetTodosParams) => {
	const todos = todosDB.findAll();
	return response.body = {
		success: true,
		todos: todos,
	};
};

type GetTodoParams = RouterContext<"/api/v1/todos/:id">;
export const getTodo = (ctx: GetTodoParams) => {
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

	const selectedTodo = todosDB.findById(id);
	if (selectedTodo) {
		response.status = 200;
		response.body = {
			success: true,
			todo: selectedTodo,
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
	try {
		const { todo } = await request.body.json();
		const newTodo = makeTodo({
			...todo,
			id: crypto.randomUUID(),
		});

		const insertedTodo = todosDB.insert(newTodo);
		// Todos.push(newTodo);
		response.status = 201;
		response.body = {
			success: true,
			todo: insertedTodo,
		};
	} catch (error) {
		response.status = 400;
		response.body = {
			success: false,
			msg: error?.toString(),
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

	const requestedTodo = todosDB.findById(id);
	if (!requestedTodo) {
		response.status = 404;
		response.body = {
			success: false,
			msg: "Not Found",
		};
		return response;
	}

	const deletedTodo = todosDB.remove(requestedTodo.id);
	response.status = 200;
	response.body = {
		success: true,
		todo: deletedTodo,
	};
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
	const requestedTodo = todosDB.findById(id);
	if (!requestedTodo) {
		response.status = 404;
		response.body = {
			success: false,
			msg: `Not Found`,
		};
		return;
	}
	const { todo } = await request.body.json();
	const updatedTodo = makeTodo({
		...requestedTodo,
		...todo,
		id: requestedTodo.id,
	});
	const insertedTodo = todosDB.update(updatedTodo);

	response.status = 200;
	response.body = {
		success: true,
		todo: insertedTodo,
	};
};

export default {
	updateTodo,
	deleteTodo,
	getTodos,
	getTodo,
	createTodo,
};
