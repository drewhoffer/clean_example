import { AppSidebar } from "@/core";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import {
	CalendarGrid,
	CalendarHeader,
	CalendarProvider,
	DaysOfWeek,
	useCalendar,
} from "@/todos";
import { ClockIcon } from "lucide-react";

const CalendarContent = () => {
	const { days, selectedDay } = useCalendar();

	return (
		<div className="container">
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<SidebarTrigger />
				<div className="lg:flex lg:h-full lg:flex-col">
					<CalendarHeader />
					<div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
						<DaysOfWeek />
						<CalendarGrid days={days} />
					</div>
					{selectedDay && selectedDay?.events?.length > 0 && (
						<div className="px-4 py-10 sm:px-6 lg:hidden">
							<ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
								{selectedDay.events.map((event) => (
									<li
										key={event.id}
										className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
									>
										<div className="flex-auto">
											<p className="font-semibold text-gray-900">
												{event.name}
											</p>
											<time
												dateTime={event.datetime}
												className="mt-2 flex items-center text-gray-700"
											>
												<ClockIcon
													className="mr-2 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												{event.time}
											</time>
										</div>
										<a
											href={event.href}
											className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
										>
											Edit<span className="sr-only">
												, {event.name}
											</span>
										</a>
									</li>
								))}
							</ol>
						</div>
					)}
				</div>
			</div>
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
