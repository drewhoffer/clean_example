import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import { Event } from "../../event";

export interface CalendarEventProps {
	event: Event;
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
	return (
		<li className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
			<div className="flex-auto">
				<p className="font-semibold text-gray-900">
					{event.title}
				</p>
				<time
					dateTime={event.start_date
						.toISOString()}
					className="mt-2 flex items-center text-gray-700"
				>
					<ClockIcon
						className="mr-2 h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
					{format(
						event.start_date,
						"MMMM d, yyyy h:mm a",
					)}
					{event.end_date && (
						<>
							{" - "}
							{format(
								event.end_date,
								"MMMM d, yyyy h:mm a",
							)}
						</>
					)}
				</time>
			</div>
			<a
				href="#"
				className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
			>
				Edit<span className="sr-only">
					, {event.title}
				</span>
			</a>
		</li>
	);
};
export default CalendarEvent;
