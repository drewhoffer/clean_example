import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	CheckCircledIcon,
	CircleIcon,
	CrossCircledIcon,
	QuestionMarkCircledIcon,
	StopwatchIcon,
} from "@radix-ui/react-icons";

import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const todoSchema = z.object({
	id: z.string(),
	title: z.string(),
	status: z.union([
		z.literal("backlog"),
		z.literal("todo"),
		z.literal("in progress"),
		z.literal("done"),
		z.literal("canceled"),
	]),
	label: z.string(),
	priority: z.union([
		z.literal("low"),
		z.literal("medium"),
		z.literal("high"),
	]),
	description: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

export type MakeTodoParams = Omit<Todo, "id"> & { id?: string };

export function makeTodo({
	id = Math.random().toString(36).substring(7),
	title,
	label,
	description,
	status = "backlog",
	priority = "low",
}: MakeTodoParams) {
	return {
		id,
		title,
		status,
		label,
		priority,
		description,
	};
}

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: QuestionMarkCircledIcon,
	},
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: StopwatchIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircledIcon,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CrossCircledIcon,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDownIcon,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRightIcon,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUpIcon,
	},
];

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];
