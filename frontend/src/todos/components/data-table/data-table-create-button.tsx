import { Button, Dialog, DialogTrigger } from "@/lib/ui";

import { CreateTodoDialog } from "../create-todo-dialog";
import { PlusCircle } from "lucide-react";

export const DataTableCreateButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"ghost"} size="sm">
					<PlusCircle />
					Add todo
				</Button>
			</DialogTrigger>
			<CreateTodoDialog />
		</Dialog>
	);
};

export default DataTableCreateButton;
