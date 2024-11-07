import { cn } from "@/lib";
import { DayCell } from "./day-cell";
import { Day } from "@/todos/contexts";

interface CalendarGridProps {
	days: Day[];
	onDateClick?: (day: string) => void;
}

export const CalendarGrid = ({ days, onDateClick }: CalendarGridProps) => {
	return (
		<div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
			<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
				{days.map((day) => (
					<DayCell
						key={day.date}
						day={day}
						onDateClick={onDateClick}
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
							{day.todos?.length} todos
						</span>
						{day.todos?.length > 0 && (
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								{day.todos.map((event) => (
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
