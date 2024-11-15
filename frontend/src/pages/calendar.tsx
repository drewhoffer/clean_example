import { AppSidebar } from "@/core";
import { useEvents } from "@/events";
import { Dialog, SidebarProvider, SidebarTrigger } from "@/lib/ui";
import {
	CalendarGrid,
	CalendarHeader,
	CalendarProvider,
	CreateTodoDialog,
	DaysOfWeek,
	useCalendar,
	useTodos,
} from "@/todos";
import { parseISO } from "date-fns";
import { ClockIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const CalendarContent = () => {
	const { days, selectedDay, currentMonth, currentYear } = useCalendar();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		undefined,
	);

	const { todos, isError: isTodosError, isLoading: isTodosLoading } =
		useTodos();
	const { events, isError: isEventsError, isLoading: isEventsLoading } =
		useEvents({ month: currentMonth, year: currentYear });

	console.log(todos);
	console.log(events);
	const { reload } = useRouter();

	const openDialog = (date: string) => {
		try {
			setSelectedDate(parseISO(date));
			setIsDialogOpen(true);
		} catch (error) {
			console.error("Error parsing date:", error);
		}
	};

	const closeDialog = () => {
		setSelectedDate(undefined);

		setIsDialogOpen(false);
	};

	const onSubmitSuccess = () => {
		reload();
		closeDialog();
	};
	if (isEventsError || isTodosError) {
		return <div>Loading...</div>;
	}
	if (isEventsLoading || isTodosLoading) {
		return <div>Error...</div>;
	}

	return (
		<div className="container">
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<SidebarTrigger />
				<div className="lg:flex lg:h-full lg:flex-col">
					<CalendarHeader />
					<div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
						<DaysOfWeek />
						<CalendarGrid
							days={days}
							onDateClick={openDialog}
						/>
					</div>
					{selectedDay && selectedDay?.todos?.length > 0 && (
						<div className="px-4 py-10 sm:px-6 lg:hidden">
							<ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
								{selectedDay.todos.map((todo) => (
									<li
										key={todo.id}
										className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
									>
										<div className="flex-auto">
											<p className="font-semibold text-gray-900">
												{todo.title}
											</p>
											<time
												dateTime={todo.due_date
													.toISOString()}
												className="mt-2 flex items-center text-gray-700"
											>
												<ClockIcon
													className="mr-2 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												{todo.due_date
													.toLocaleDateString()}
											</time>
										</div>
										<a
											href="#"
											className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
										>
											Edit<span className="sr-only">
												, {todo.title}
											</span>
										</a>
									</li>
								))}
							</ol>
						</div>
					)}
				</div>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={closeDialog}>
				{selectedDate && (
					<CreateTodoDialog
						due_date={selectedDate}
						onClose={closeDialog}
						onSuccess={onSubmitSuccess}
					/>
				)}
			</Dialog>
		</div>
	);
};

export default function Calendar() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<CalendarProvider>
				<CalendarContent />
			</CalendarProvider>
		</SidebarProvider>
	);
}
