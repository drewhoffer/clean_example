import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Button,
	CardContent,
	CardFooter,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@/components/ui";
import { EditTodo, editTodoSchema } from "../validations";
import { editTodo } from "../mutations";
import { useRouter } from "next/router";
import { Todo } from "../todo";

export interface EditTodoDialogProps {
	todo: Todo;
}

export const EditTodoDialog = ({ todo }: EditTodoDialogProps) => {
	const form = useForm<EditTodo>({
		resolver: zodResolver(editTodoSchema),
		defaultValues: {
			...todo,
		},
	});

	const { reload } = useRouter();

	async function onSubmit(values: EditTodo) {
		try {
			await editTodo({ ...values });
			reload();
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Update yourTodo</DialogTitle>
				<DialogDescription>
					Go ahead and do whatever... or don&apos;t. I&apos;m not your
					boss.
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											autoFocus
											placeholder="shadcn"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Label" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														Label
													</SelectLabel>
													<SelectItem value="bug">
														Bug
													</SelectItem>
													<SelectItem value="feature">
														Feature
													</SelectItem>
													<SelectItem value="documentation">
														Documentation
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										How important is this task?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="shadcn"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Importance</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select an importance" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														Priority
													</SelectLabel>
													<SelectItem value="backlog">
														Backlog
													</SelectItem>
													<SelectItem value="todo">
														Todo
													</SelectItem>
													<SelectItem value="in progress">
														In Progress
													</SelectItem>
													<SelectItem value="done">
														Done
													</SelectItem>
													<SelectItem value="canceled">
														Canceled
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										How important is this task?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Priority" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														Importance
													</SelectLabel>
													<SelectItem value="low">
														Low
													</SelectItem>
													<SelectItem value="medium">
														Medium
													</SelectItem>
													<SelectItem value="high">
														High
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										How important is this task?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit">Update</Button>
					</CardFooter>
				</form>
			</Form>
		</DialogContent>
	);
};
export default EditTodoDialog;
