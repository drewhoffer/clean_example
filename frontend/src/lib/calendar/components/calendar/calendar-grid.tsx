import { cn } from "@/lib/ui";
import { DayCell } from "./day-cell";
import { CalendarItem } from "@/lib/calendar/contexts";
import { useCalendar } from "../../hooks";
import { isSameDay, parseISO } from "date-fns";

interface CalendarGridProps {
	events?: CalendarItem[];
	onDateClick?: (day: string) => void;
}

export const CalendarGrid = ({ events, onDateClick }: CalendarGridProps) => {
	const { days } = useCalendar();

	const mapEventsToDay = (events: CalendarItem[], day: string) => {
		return events.filter((event) => {
			const eventStartDate = event.start_date ? event.start_date : null;
			const eventEndDate = event.end_date ? event.end_date : null;
			const dayDate = parseISO(day);

			return (
				(eventStartDate && isSameDay(eventStartDate, dayDate)) ||
				(eventEndDate && isSameDay(eventEndDate, dayDate))
			);
		});
	};
	return (
		<div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
			<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
				{days.map((day) => (
					<DayCell
						key={day.date}
						day={day}
						onDateClick={onDateClick}
						events={events && mapEventsToDay(events, day.date)}
					/>
				))}
			</div>
			<div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
				{days.map((day) => (
					<button
						key={day.date}
						type="button"
						className={cn(
							day.isCurrentMonth ? "bg-white" : "bg-gray-50",
							(day.isSelected || day.isToday) && "font-semibold",
							day.isSelected && "text-white",
							!day.isSelected && day.isToday && "text-indigo-600",
							!day.isSelected && day.isCurrentMonth &&
								!day.isToday && "text-gray-900",
							!day.isSelected && !day.isCurrentMonth &&
								!day.isToday && "text-gray-500",
							"flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
						)}
					>
						<time
							dateTime={day.date}
							className={cn(
								day.isSelected &&
									"flex h-6 w-6 items-center justify-center rounded-full",
								day.isSelected && day.isToday &&
									"bg-indigo-600",
								day.isSelected && !day.isToday && "bg-gray-900",
								"ml-auto",
							)}
						>
							{day?.date?.split("-")?.pop()?.replace(/^0/, "")}
						</time>
						<span className="sr-only">
							{events?.length} events
						</span>
						{events && events?.length > 0 && (
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								{events.map((event) => (
									<span
										key={event.id}
										className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
									/>
								))}
							</span>
						)}
					</button>
				))}
			</div>
		</div>
	);
};
export default CalendarGrid;
