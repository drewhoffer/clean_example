import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Button,
	Calendar,
	CardContent,
	CardFooter,
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
import { CreateEvent, createEventSchema } from "../validations";
import { createEvent } from "../mutations";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface CreateEventDialogProps {
	start_date?: Date;
	onClose?: () => void;
	onSuccess?: () => void;
}

export const CreateEventDialog = ({ start_date }: CreateEventDialogProps) => {
	const form = useForm<CreateEvent>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			title: "",
			description: "",
			start_date: start_date,
		},
	});

	async function onSubmit(values: CreateEvent) {
		try {
			await createEvent({ ...values });
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create a new Event In GooGoo</DialogTitle>
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
							name="start_date"
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
												// disabled={(date) =>
												// 	date.getTime() <
												// 		new Date().setHours(
												// 			0,
												// 			0,
												// 			0,
												// 			0,
												// 		) ||
												// 	date >
												// 		new Date("2100-01-01")}
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
							name="end_date"
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
					</CardContent>
					<CardFooter>
						<Button type="submit">Create</Button>
					</CardFooter>
				</form>
			</Form>
		</DialogContent>
	);
};
export default CreateEventDialog;
