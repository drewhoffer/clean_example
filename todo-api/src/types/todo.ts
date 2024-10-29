export type Todo = {
	id: string;
	title: string;
	status: "backlog" | "todo" | "in progress" | "done" | "canceled";
	label: string;
	priority: "low" | "medium" | "high";
	description: string;
};

export type MakeTodoParams = Omit<Todo, "id"> & { id?: string };

export function makeTodo({
	id = crypto.randomUUID(),
	title,
	label,
	description,
	status = "backlog",
	priority = "low",
}: MakeTodoParams) {
	if (!title) {
		throw new Error("Title is required");
	}
	if (!label) {
		throw new Error("Label is required");
	}
	if (!labels.find((l) => l === label)) {
		throw new Error("Invalid label");
	}

	if (!description) {
		throw new Error("Description is required");
	}
	if (!statuses.find((s) => s === status)) {
		throw new Error("Invalid status");
	}
	if (!priorities.find((p) => p === priority)) {
		throw new Error("Invalid priority");
	}

	return {
		id,
		title,
		status,
		label,
		priority,
		description,
	};
}

export const statuses = ["backlog", "todo", "in progress", "done", "canceled"];

export const priorities = ["low", "medium", "high"];

export const labels = ["bug", "feature", "documentation"];
