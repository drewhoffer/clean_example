import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { labels, todoSchema } from "../../todo";
import {
	Button,
	Dialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/lib/ui/components";
import { EditTodoDialog } from "../edit-todo-dialog";
import { useState } from "react";
import DeleteTodoDialog from "../delete-todo-dialog";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const todo = todoSchema.parse(row.original);

	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-[160px]"
			>
				<DropdownMenuItem
					onClick={() => setIsEditDialogOpen(true)}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>Make a copy</DropdownMenuItem>
				<DropdownMenuItem>Favorite</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={todo.label}>
							{labels.map((label) => (
								<DropdownMenuRadioItem
									key={label.value}
									value={label.value}
								>
									{label.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => setIsDeleteDialogOpen(true)}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
			>
				<EditTodoDialog todo={todo} />
			</Dialog>
			<Dialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<DeleteTodoDialog todo={todo} />
			</Dialog>
		</DropdownMenu>
	);
}
