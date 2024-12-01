import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Button,
	Calendar,
	CardContent,
	CardFooter,
	Checkbox,
	cn,
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
	Popover,
	PopoverContent,
	PopoverTrigger,
	Textarea,
} from "@/lib/ui";
import { CreateTodo, createTodoSchema } from "../validations";
import { createTodo } from "../mutations";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface CreateTodoDialogProps {
	due_date?: Date;
	onClose?: () => void;
	onSuccess?: () => void;
}

export const CreateTodoDialog = ({ due_date }: CreateTodoDialogProps) => {
	const form = useForm<CreateTodo>({
		resolver: zodResolver(createTodoSchema),
		defaultValues: {
			title: "",
			description: "",
			due_date: due_date,
			completed: false,
		},
	});

	async function onSubmit(values: CreateTodo) {
		try {
			await createTodo({ ...values });
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create a new Todo</DialogTitle>
				<DialogDescription>
					Give a name and description
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Call my mom"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What do you need to do?
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
											placeholder="You could write anything here..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Anything you want to say about this
										thing?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="due_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value &&
															"text-muted-foreground",
													)}
												>
													{field.value
														? (
															format(
																field.value,
																"PPP",
															)
														)
														: (
															<span>
																Pick a date
															</span>
														)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
											
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>
										You better finish it before this date...
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="completed"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>
											Is already completed?
										</FormLabel>
										<FormDescription>
											I don&apos;t know why you would
											create a completed task, but here
											you go.
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="estimated_duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estimated Duration</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="How many minutes to complete?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit">Create</Button>
					</CardFooter>
				</form>
			</Form>
		</DialogContent>
	);
};
export default CreateTodoDialog;
