import { parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";

import { AppSidebar } from "@/core";
import {
	CalendarEventsList,
	CalendarLoadingSkeleton,
	useEvents,
} from "@/events";
import {
	CalendarGrid,
	CalendarHeader,
	CalendarProvider,
	DaysOfWeek,
	useCalendar,
} from "@/lib/calendar";
import {
	Dialog,
	SidebarProvider,
	SidebarTrigger,
	useDisclosure,
} from "@/lib/ui";
import { CreateTodoDialog } from "@/todos";

export const CalendarContent = () => {
	const { days, currentMonth, currentYear } = useCalendar();

	const { open, onOpen, onClose, onToggle } = useDisclosure();

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		undefined,
	);
	const { events, isError: isEventsError, isLoading: isEventsLoading } =
		useEvents({
			month: currentMonth,
			year: currentYear,
		});

	const { reload } = useRouter();

	const handleDateClick = (date: string) => {
		try {
			setSelectedDate(parseISO(date));
			onOpen();
		} catch (error) {
			console.error("Error parsing date:", error);
		}
	};

	const handleCloseDialog = () => {
		setSelectedDate(undefined);
		onClose();
	};

	const onSubmitSuccess = () => {
		reload();
		handleCloseDialog();
	};

	if (isEventsError) {
		return <div>Error...</div>;
	}

	// for now we just want to stick events onto the days
	// we can do this better later
	if (events) {
		days.forEach((day) => {
			const date = day.date;
			const dayEvents = events.filter((event) => {
				const eventDate = new Date(event.start_date).getDate();
				const dayPart = date.split("-").pop();
				return eventDate === (dayPart ? parseInt(dayPart) : NaN);
			});
			day.events = dayEvents;
		});
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
							onDateClick={handleDateClick}
						/>
					</div>
					{isEventsLoading && <CalendarLoadingSkeleton />}
					{events && <CalendarEventsList events={events} />}
				</div>
			</div>
			<Dialog open={open} onOpenChange={onToggle}>
				<CreateTodoDialog
					due_date={selectedDate}
					onClose={onClose}
					onSuccess={onSubmitSuccess}
				/>
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
