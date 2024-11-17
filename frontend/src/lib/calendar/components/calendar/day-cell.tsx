import { cn } from "@/lib/ui";
import { CalendarItem, Day } from "../../contexts";

interface DayCellProps {
	day: Day;
	events?: CalendarItem[];
	onDateClick?: (date: string) => void;
}

export const DayCell = ({ day, events, onDateClick }: DayCellProps) => {
	// console.log("On Day", day.date, "We have events:", events);
	return (
		<div
			key={day.date}
			className={cn(
				day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
				"relative px-1 py-2 text-center",
			)}
			onClick={() => onDateClick?.(day.date)}
		>
			<time
				dateTime={day.date}
				className={day.isToday
					? "flex h-6 w-6 items-center justify-center mx-auto rounded-full bg-indigo-600 font-semibold text-white"
					: undefined}
			>
				{day?.date?.split("-").pop()?.replace(/^0/, "") ?? ""}
			</time>
			{events && events?.length > 0 && (
				<ol className="mt-2">
					{events.slice(0, 2).map((event) => (
						<li
							className="bg-emerald-500 py-0.5 px-1 rounded-lg text-xs"
							key={event.id}
						>
							<a
								href={"#"}
								className="group flex justify-between"
							>
								<p className="ml-2 truncate font-medium text-foreground group-hover:text-white">
									{event.title}
								</p>
								<time
									dateTime={event.start_date?.toISOString()}
									className="ml-3 hidden flex-none text-foreground group-hover:text-white xl:block"
								>
									{event.start_date?.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</time>
							</a>
						</li>
					))}
					{events.length > 2 && (
						<li className="text-gray-500">
							+ {events.length - 2} more
						</li>
					)}
				</ol>
			)}
		</div>
	);
};
export default DayCell;
