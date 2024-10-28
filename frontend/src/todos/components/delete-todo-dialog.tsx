import {
	Button,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui";

import { deleteTodo } from "../mutations";
import { useRouter } from "next/router";
import { Todo } from "../todo";

export interface DeleteTodoDialogProps {
	todo: Todo;
}

export const DeleteTodoDialog = ({ todo }: DeleteTodoDialogProps) => {
	const { push, reload } = useRouter();

	async function onSubmit() {
		try {
			deleteTodo({ ...todo });

			await push("/", { query: { deleted: "true" } });
			reload();
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Are you absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. Are you sure you want to
					permanently delete this file from our servers?
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					variant={"destructive"}
					type="submit"
					onClick={onSubmit}
				>
					Confirm
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};
export default DeleteTodoDialog;
