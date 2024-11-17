import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
	Button,
	Dialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
	useDisclosure,
} from "@/lib/ui";
import { todoSchema } from "../../todo";
import { EditTodoDialog } from "../edit-todo-dialog";
import DeleteTodoDialog from "../delete-todo-dialog";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const todo = todoSchema.parse(row.original);

	const {
		open: isEditDialogOpen,
		onOpen: onEditOpen,
		onToggle: onEditToggle,
	} = useDisclosure();
	const {
		open: isDeleteDialogOpen,
		onOpen: onDeleteOpen,
		onToggle: onDeleteToggle,
	} = useDisclosure();

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
					onClick={onEditOpen}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>Make a copy</DropdownMenuItem>
				<DropdownMenuItem>Favorite</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={onDeleteOpen}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={onEditToggle}
			>
				<EditTodoDialog todo={todo} />
			</Dialog>
			<Dialog
				open={isDeleteDialogOpen}
				onOpenChange={onDeleteToggle}
			>
				<DeleteTodoDialog todo={todo} />
			</Dialog>
		</DropdownMenu>
	);
}
