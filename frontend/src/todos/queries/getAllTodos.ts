import { http } from "@/lib";
import { Todo } from "..";

export const getAllTodos = async (): Promise<Todo[]> => {
	console.log("called");
	try {
		const res = await http.get<Todo[]>("/todos");
		console.log(res);
		return res;
	} catch (e) {
		console.log(e);
		throw e;
	}
};
