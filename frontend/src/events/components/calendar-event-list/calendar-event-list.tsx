import { Event } from "../../event";
import CalendarEvent from "./calendar-event";

export interface CalendarEventsListProps {
	events: Event[];
}

export const CalendarEventsList = ({ events }: CalendarEventsListProps) => {
	return (
		<div className="px-4 py-10 sm:px-6 lg:hidden">
			<ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
				{events.length === 0
					? <div className="p-5">No events for for this month</div>
					: events.map((event) => (
						<CalendarEvent event={event} key={event.id} />
					))}
			</ol>
		</div>
	);
};
export default CalendarEventsList;
