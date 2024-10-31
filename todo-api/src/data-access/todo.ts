import type { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

import Id from "../utils/id.ts";
import type { Label, Priority, Status, Todo } from "../models/todos.ts";

interface MakesTodosDB {
	makeDb: () => DB;
}
export default function makeTodosDB({ makeDb }: MakesTodosDB) {
	return Object.freeze({
		insert,
		findAll,
		findById,
		remove,
		update,
	});

	type InsertTodo = Todo;
	function insert({
		id = Id.makeId(),
		title,
		label,
		description,
		status,
		priority,
		created_at,
		updated_at,
	}: InsertTodo) {
		const db = makeDb();
		db.query(
			"INSERT INTO todos (id, title, label, description, status, priority, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[
				id,
				title,
				label,
				description,
				status,
				priority,
				created_at,
				updated_at,
			],
		);
		const newlyInsertedUser = db.query(
			"SELECT * FROM todos WHERE id = ?",
			[id],
		);

		db.close();

		// Return the inserted row
		const [insertedRow] = newlyInsertedUser;
		return {
			id: insertedRow[0],
			title: insertedRow[1],
			label: insertedRow[2],
			description: insertedRow[3],
			status: insertedRow[4],
			priority: insertedRow[5],
			created_at: insertedRow[6],
			updated_at: insertedRow[7],
		} as Todo;
	}

	type UpdateTodo = {
		id: string;
		title?: string;
		label?: Label;
		description?: string;
		status?: Status;
		priority?: Priority;
	};

	function update({
		id,
		title,
		label,
		description,
		status,
		priority,
	}: UpdateTodo): Todo {
		const db = makeDb();
		// Prepare the update query
		const updateQuery = db.prepareQuery(
			"UPDATE todos SET title = ?, label = ?, description = ?, status = ?, priority = ?, updated_at = ? WHERE id = ?",
		);

		// Lookup the todo
		const lookupQuery = db.prepareQuery<
			[string, string, string, string, string, string, string, string],
			Todo,
			{ id: string }
		>(
			"SELECT id, title, label, description, status, priority, created_at, updated_at FROM todos WHERE id = :id",
		);
		const result = lookupQuery.first({ id });

		if (!result) {
			lookupQuery.finalize();
			updateQuery.finalize();
			db.close();
			throw new Error(`Todo with id ${id} not found`);
		}

		// Perform the update
		updateQuery.execute([
			title,
			label,
			description,
			status,
			priority,
			new Date().toISOString(),
			id,
		]);

		// Retrieve the updated row
		const updatedResult = lookupQuery.first({ id });

		lookupQuery.finalize();
		updateQuery.finalize();
		db.close();

		if (!updatedResult) {
			throw new Error(`Todo with id ${id} not found after update`);
		}

		const [
			foundId,
			foundTitle,
			foundLabel,
			foundDescription,
			foundStatus,
			foundPriority,
			createdAt,
			updatedAt,
		] = updatedResult;

		return {
			id: foundId,
			title: foundTitle,
			label: foundLabel as Label,
			description: foundDescription,
			status: foundStatus as Status,
			priority: foundPriority as Priority,
			created_at: createdAt,
			updated_at: updatedAt,
		} as Todo;
	}

	function findAll(): Todo[] {
		const db = makeDb();
		const query = db.prepareQuery<
			[string, string, string, string, string, string, string, string]
		>(
			"SELECT id, title, label, description, status, priority, created_at, updated_at FROM todos ORDER BY created_at DESC",
		);
		const todos: Todo[] = [];
		for (
			const [
				id,
				title,
				label,
				description,
				status,
				priority,
				createdAt,
				updatedAt,
			] of query.iter()
		) {
			todos.push({
				id,
				title,
				description,
				label: label as Label,
				status: status as Status,
				priority: priority as Priority,
				created_at: createdAt,
				updated_at: updatedAt,
			});
		}
		query.finalize();
		db.close();
		return todos;
	}

	function findById(id: string): Todo | undefined {
		const db = makeDb();
		const query = db.prepareQuery<
			[string, string, string, string, string, string, string, string],
			Todo,
			{ id: string }
		>(
			"SELECT id, title, label, description, status, priority, created_at, updated_at FROM todos WHERE id = :id",
		);
		const result = query.first({ id });

		query.finalize();
		db.close();
		if (!result) {
			return undefined;
		}
		const [
			foundId,
			title,
			label,
			description,
			status,
			priority,
			createdAt,
			updatedAt,
		] = result;
		return {
			id: foundId,
			title,
			description,
			label: label as Label,
			status: status as Status,
			priority: priority as Priority,
			created_at: createdAt,
			updated_at: updatedAt,
		} as Todo;
	}
	function remove(id: string): Todo | undefined {
		const db = makeDb();
		const query = db.prepareQuery<
			[string, string, string, string, string, string, string, string],
			Todo,
			{ id: string }
		>(
			"SELECT id, title, label, description, status, priority, created_at, updated_at FROM todos WHERE id = :id",
		);
		const result = query.first({ id });
		const deleteQuery = db.prepareQuery(
			"DELETE FROM todos WHERE id = ?",
		);
		deleteQuery.execute([id]);
		query.finalize();
		deleteQuery.finalize();
		db.close();
		if (!result) {
			return undefined;
		}
		const [
			foundId,
			title,
			label,
			description,
			status,
			priority,
			createdAt,
			updatedAt,
		] = result;
		return {
			id: foundId,
			title,
			description,
			label: label as Label,
			status: status as Status,
			priority: priority as Priority,
			created_at: createdAt,
			updated_at: updatedAt,
		} as Todo;
	}
}
