import { createTodo } from "@/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
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
} from "./ui";
import { createTodoSchema } from "@/todos/validations";

export const CreateTodo = () => {
	const form = useForm<z.infer<typeof createTodoSchema>>({
		resolver: zodResolver(createTodoSchema),
		defaultValues: {
			title: "",
			description: "",
			label: "",
		},
	});

	function onSubmit(values: z.infer<typeof createTodoSchema>) {
		try {
			createTodo({ ...values });
			console.log("Todo created successfully");
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<Card className="w-[350px] mt-10 mx-auto">
			<CardHeader>
				<CardTitle>Create a new Todo</CardTitle>
				<CardDescription>Give a name and description</CardDescription>
			</CardHeader>
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
						<Button type="submit">Create</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};
export default CreateTodo;
