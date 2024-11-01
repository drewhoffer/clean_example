export type Todo = {
	id: string;
	title: string;
	status: "backlog" | "todo" | "in progress" | "done" | "canceled";
	label: Label;
	priority: "low" | "medium" | "high";
	description: string;
	created_at: string;
	updated_at: string;
};
export type MakeTodoParams = Omit<Todo, "id" | "created_at" | "updated_at"> & {
	id?: string;
	created_at?: string;
	updated_at?: string;
};

export function makeTodo({
	id = crypto.randomUUID(),
	title,
	label,
	description,
	status = "backlog",
	priority = "low",
	created_at = new Date().toISOString(),
	updated_at = new Date().toISOString(),
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
		created_at,
		updated_at,
	};
}

export type Status = "backlog" | "todo" | "in progress" | "done" | "canceled";
export const statuses: Status[] = [
	"backlog",
	"todo",
	"in progress",
	"done",
	"canceled",
];

export type Priority = "low" | "medium" | "high";
export const priorities: Priority[] = ["low", "medium", "high"];

export type Label = "bug" | "feature" | "documentation";
export const labels: Label[] = ["bug", "feature", "documentation"];
