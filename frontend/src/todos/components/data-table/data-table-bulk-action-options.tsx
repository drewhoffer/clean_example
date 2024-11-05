import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import {
	Button,
	Dialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/lib/ui";
import { useState } from "react";
import { DeleteManyTodosDialog } from "../delete-many-todos-dialog";
import { Todo } from "@/todos/todo";

interface DataTableRowActionsProps<TData> {
	table: Table<TData>;
}

export function DataTableBulkActionOptions<TData>({
	table,
}: DataTableRowActionsProps<TData>) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<DotsVerticalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-[160px]"
			>
				<DropdownMenuItem
					onClick={() => setIsDeleteDialogOpen(true)}
					disabled={!table.getIsSomeRowsSelected()}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>

			<Dialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<DeleteManyTodosDialog
					todos={table.getSelectedRowModel().rows.map((row) =>
						row.original
					) as Todo[]}
				/>
			</Dialog>
		</DropdownMenu>
	);
}
