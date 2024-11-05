import {
	Button,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/lib/ui";
import { Todo } from "../todo";
import { deleteManyTodos } from "../mutations";

interface DeleteManyTodosDialogProps {
	todos: Todo[];
}
export const DeleteManyTodosDialog = (
	{ todos }: DeleteManyTodosDialogProps,
) => {
	const onDeleteClick = async () => {
		try {
			await deleteManyTodos(todos.map((todo) => todo.id));
		} catch (error) {
			console.error("Failed to delete todos", error);
		}
	};
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Are you absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. Are you sure you want to
					permanently delete {todos.length} item(s)?
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					variant={"destructive"}
					type="submit"
					onClick={onDeleteClick}
				>
					Confirm
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};
