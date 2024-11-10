import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableBulkActionOptions } from "./data-table-bulk-action-options";
import { Todo } from "../../todo";
import { Checkbox } from "@/lib/ui";
import { CheckIcon, XIcon } from "lucide-react";

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
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Task" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("title")}
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "due_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Due Date" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					{/* Show a time with different colours? */}
					<span>{row.getValue("due_date")}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "completed",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Completed" />
		),
		cell: ({ row }) => (
			<div className="flex items-center">
				<span>
					{row.getValue("completed") ? <CheckIcon /> : <XIcon />}
				</span>
			</div>
		),

		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "actions",
		header: ({ table }) => <DataTableBulkActionOptions table={table} />,
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
