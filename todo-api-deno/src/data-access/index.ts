import makeTodosDB from "./todo.ts";
import makeDb from "./makeDb.ts";

export const todosDB = makeTodosDB({ makeDb });
