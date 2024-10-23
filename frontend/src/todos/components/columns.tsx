import { ColumnDef } from "@tanstack/react-table";
import { Todo } from "../todo";
import { Button, Checkbox } from "@/components/ui";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Todo>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-left font-medium">
				{row.original.title}
			</div>
		),
	},
	{
		accessorKey: "description",
		header: () => <div className="text-right">Description</div>,
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">
					{row.original.description}
				</div>
			);
		},
	},
];
