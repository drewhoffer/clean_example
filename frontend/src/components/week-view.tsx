import { useEvents } from "@/events";
import { useCalendar } from "@/lib/calendar";
import { useRouter } from "next/router";

interface Event {
	id: string;
	title: string;
	start: Date;
	end: Date;
}

const fakeEvents: Event[] = [
	{
		id: "1",
		title: "Morning Jog",
		start: new Date("2024-11-11T06:00:00"),
		end: new Date("2024-11-11T08:45:00"),
	},
	{
		id: "2",
		title: "Team Meeting",
		start: new Date("2024-11-11T09:00:00"),
		end: new Date("2024-11-11T10:00:00"),
	},
	{
		id: "3",
		title: "Lunch with Sarah",
		start: new Date("2024-11-11T12:00:00"),
		end: new Date("2024-11-11T13:00:00"),
	},
	{
		id: "4",
		title: "Project Deadline",
		start: new Date("2024-11-11T15:00:00"),
		end: new Date("2024-11-11T16:00:00"),
	},
	{
		id: "5",
		title: "Dinner with Family",
		start: new Date("2024-11-11T19:00:00"),
		end: new Date("2024-11-11T20:00:00"),
	},
	{
		id: "6",
		title: "Yoga Class",
		start: new Date("2024-11-12T07:00:00"),
		end: new Date("2024-11-12T08:00:00"),
	},
	{
		id: "7",
		title: "Client Call",
		start: new Date("2024-11-12T10:00:00"),
		end: new Date("2024-11-12T11:00:00"),
	},
	{
		id: "8",
		title: "Lunch with John",
		start: new Date("2024-11-12T12:30:00"),
		end: new Date("2024-11-12T13:30:00"),
	},
	{
		id: "9",
		title: "Gym Workout",
		start: new Date("2024-11-12T17:00:00"),
		end: new Date("2024-11-12T18:00:00"),
	},
	{
		id: "10",
		title: "Dinner with Friends",
		start: new Date("2024-11-12T20:00:00"),
		end: new Date("2024-11-12T21:00:00"),
	},
	{
		id: "11",
		title: "Morning Run",
		start: new Date("2024-11-13T06:30:00"),
		end: new Date("2024-11-13T07:30:00"),
	},
	{
		id: "12",
		title: "Team Standup",
		start: new Date("2024-11-13T09:30:00"),
		end: new Date("2024-11-13T10:00:00"),
	},
	{
		id: "13",
		title: "Lunch with Client",
		start: new Date("2024-11-13T12:00:00"),
		end: new Date("2024-11-13T13:00:00"),
	},
	{
		id: "14",
		title: "Project Review",
		start: new Date("2024-11-13T15:00:00"),
		end: new Date("2024-11-13T16:00:00"),
	},
	{
		id: "15",
		title: "Dinner with Family",
		start: new Date("2024-11-13T19:00:00"),
		end: new Date("2024-11-13T20:00:00"),
	},
	{
		id: "16",
		title: "Breakfast Meeting",
		start: new Date("2024-11-14T08:00:00"),
		end: new Date("2024-11-14T09:00:00"),
	},
	{
		id: "17",
		title: "Conference Call",
		start: new Date("2024-11-14T11:00:00"),
		end: new Date("2024-11-14T12:00:00"),
	},
	{
		id: "18",
		title: "Lunch with Team",
		start: new Date("2024-11-14T13:00:00"),
		end: new Date("2024-11-14T14:00:00"),
	},
	{
		id: "19",
		title: "Doctor Appointment",
		start: new Date("2024-11-14T16:00:00"),
		end: new Date("2024-11-14T17:00:00"),
	},
	{
		id: "20",
		title: "Dinner with Friends",
		start: new Date("2024-11-14T18:30:00"),
		end: new Date("2024-11-14T20:00:00"),
	},
	{
		id: "21",
		title: "Morning Yoga",
		start: new Date("2024-11-15T06:00:00"),
		end: new Date("2024-11-15T07:00:00"),
	},
	{
		id: "22",
		title: "Team Meeting",
		start: new Date("2024-11-15T09:00:00"),
		end: new Date("2024-11-15T10:00:00"),
	},
	{
		id: "23",
		title: "Lunch with Sarah",
		start: new Date("2024-11-15T12:00:00"),
		end: new Date("2024-11-15T13:00:00"),
	},
	{
		id: "24",
		title: "Project Deadline",
		start: new Date("2024-11-15T15:00:00"),
		end: new Date("2024-11-15T16:00:00"),
	},
	{
		id: "25",
		title: "Dinner with Family",
		start: new Date("2024-11-15T19:00:00"),
		end: new Date("2024-11-15T20:00:00"),
	},
	{
		id: "26",
		title: "Morning Run",
		start: new Date("2024-11-16T06:30:00"),
		end: new Date("2024-11-16T07:30:00"),
	},
	{
		id: "27",
		title: "Team Standup",
		start: new Date("2024-11-16T09:30:00"),
		end: new Date("2024-11-16T10:00:00"),
	},
	{
		id: "28",
		title: "Lunch with Client",
		start: new Date("2024-11-16T12:00:00"),
		end: new Date("2024-11-16T13:00:00"),
	},
	{
		id: "29",
		title: "Project Review",
		start: new Date("2024-11-16T15:00:00"),
		end: new Date("2024-11-16T16:00:00"),
	},
	{
		id: "30",
		title: "Dinner with Family",
		start: new Date("2024-11-16T19:00:00"),
		end: new Date("2024-11-16T20:00:00"),
	},
	{
		id: "31",
		title: "Breakfast Meeting",
		start: new Date("2024-11-17T08:00:00"),
		end: new Date("2024-11-17T09:00:00"),
	},
	{
		id: "32",
		title: "Conference Call",
		start: new Date("2024-11-17T11:00:00"),
		end: new Date("2024-11-17T12:00:00"),
	},
	{
		id: "33",
		title: "Lunch with Team",
		start: new Date("2024-11-17T13:00:00"),
		end: new Date("2024-11-17T14:00:00"),
	},
	{
		id: "34",
		title: "Doctor Appointment",
		start: new Date("2024-11-17T16:00:00"),
		end: new Date("2024-11-17T17:00:00"),
	},
	{
		id: "35",
		title: "Dinner with Friends",
		start: new Date("2024-11-17T18:30:00"),
		end: new Date("2024-11-17T20:00:00"),
	},
];

export const WeekView = () => {
	const { getWeekRange, selectedDay, currentMonth, currentYear } =
		useCalendar();
	const router = useRouter();
	const { events, isLoading, isError } = useEvents({
		month: currentMonth,
		year: currentYear,
	});

	const { startOfWeek } = getWeekRange();

	const daysOfWeek: Date[] = [];
	for (let i = 0; i < 7; i++) {
		const day = new Date(startOfWeek);
		day.setDate(startOfWeek.getDate() + i);
		daysOfWeek.push(day);
	}

	const handleDayClick = (day: Date) => {
		const dayNumber = day.getDate();
		const monthNumber = day.getMonth() + 1;
		const yearNumber = day.getFullYear();
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					day: dayNumber,
					month: monthNumber,
					year: yearNumber,
				},
			},
			undefined,
			{ shallow: true },
		);
	};

	const calculateEventPosition = (event: Event) => {
		const startHour = event.start.getHours();
		const startMinutes = event.start.getMinutes();
		const endHour = event.end.getHours();
		const endMinutes = event.end.getMinutes();

		const startRow = startHour * 12 + Math.floor(startMinutes / 5) + 1;
		const endRow = endHour * 12 + Math.floor(endMinutes / 5) + 1;
		const span = endRow - startRow;

		return { startRow, span };
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading events</div>;
	}
	console.log(events);

	return (
		<div className="container">
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="isolate flex flex-auto flex-col overflow-auto bg-white">
					<div
						style={{ width: "165%" }}
						className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
					>
						<div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black/5 sm:pr-8">
							<div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden">
								{daysOfWeek.map((day, index) => (
									<button
										key={index}
										type="button"
										onClick={() => handleDayClick(day)}
										className="flex flex-col items-center pb-3 pt-2"
									>
										{day.toLocaleDateString("en-US", {
											weekday: "short",
										})}{" "}
										<span
											className={`mt-1 flex size-8 items-center justify-center font-semibold ${
												day.getDate() === selectedDay
													? "rounded-full bg-indigo-600 text-white"
													: "text-gray-900"
											}`}
										>
											{day.getDate()}
										</span>
									</button>
								))}
							</div>

							<div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid">
								<div className="col-end-1 w-14" />
								{daysOfWeek.map((day, index) => (
									<button
										key={index}
										onClick={() => {
											handleDayClick(day);
										}}
										className="flex items-center justify-center py-3"
									>
										<span className="flex items-baseline">
											{day.toLocaleDateString("en-US", {
												weekday: "short",
											})}{" "}
											<span
												className={`ml-1.5 flex size-8 items-center justify-center font-semibold ${
													day.getDate() ===
															selectedDay
														? "rounded-full bg-indigo-600 text-white"
														: "text-gray-900"
												}`}
											>
												{day.getDate()}
											</span>
										</span>
									</button>
								))}
							</div>
						</div>
						<div className="flex flex-auto">
							<div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
							<div className="grid flex-auto grid-cols-1 grid-rows-1">
								{/* Horizontal lines */}
								<div
									className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
									style={{
										gridTemplateRows:
											"repeat(48, minmax(3.5rem, 1fr))",
									}}
								>
									<div className="row-end-1 h-7" />
									{Array.from({ length: 48 }).map((
										_,
										index,
									) => (
										<div key={index}>
											{index % 2 === 0 && (
												<div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
													{index / 2 === 0
														? 12
														: index / 2 % 12 === 0
														? 12
														: index / 2 % 12}
													{index < 24 ? "AM" : "PM"}
												</div>
											)}
										</div>
									))}
								</div>

								{/* Vertical lines */}
								<div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid">
									{Array.from({ length: 7 }).map((
										_,
										index,
									) => (
										<div
											key={index}
											className={`col-start-${
												index + 1
											} row-span-full`}
										/>
									))}
									<div className="col-start-8 row-span-full w-8" />
								</div>

								{/* Events */}
								<ol
									className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
									style={{
										gridTemplateRows:
											"1.75rem repeat(288, minmax(0, 1fr)) auto",
									}}
								>
									{fakeEvents.map((event) => {
										const eventDayIndex = daysOfWeek
											.findIndex(
												(day) =>
													day.getFullYear() ===
														event.start
															.getFullYear() &&
													day.getMonth() ===
														event.start
															.getMonth() &&
													day.getDate() ===
														event.start.getDate(),
											);
										if (eventDayIndex === -1) return null;

										const { startRow, span } =
											calculateEventPosition(event);

										return (
											<li
												key={event.id}
												className={`relative mt-px flex sm:col-start-${
													eventDayIndex + 1
												}`}
												style={{
													gridRow:
														`${startRow} / span ${span}`,
												}}
											>
												<a
													href="#"
													className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
												>
													<p className="order-1 font-semibold text-blue-700">
														{event.title}
													</p>
													<p className="text-blue-500 group-hover:text-blue-700">
														<time
															dateTime={event
																.start
																.toISOString()}
														>
															{event.start
																.toLocaleTimeString(
																	[],
																	{
																		hour:
																			"2-digit",
																		minute:
																			"2-digit",
																	},
																)}
														</time>
													</p>
												</a>
											</li>
										);
									})}

									{events?.map((event) => {
										const eventDayIndex = daysOfWeek
											.findIndex(
												(day) =>
													day.getFullYear() ===
														event.start_date
															.getFullYear() &&
													day.getMonth() ===
														event.start_date
															.getMonth() &&
													day.getDate() ===
														event.start_date
															.getDate(),
											);
										if (eventDayIndex === -1) return null;

										const { startRow, span } =
											calculateEventPosition({
												...event,
												start: event.start_date,
												end: event.end_date,
											});

										return (
											<li
												key={event.id}
												className={`relative mt-px flex sm:col-start-${
													eventDayIndex + 1
												}`}
												style={{
													gridRow:
														`${startRow} / span ${span}`,
												}}
											>
												<a
													href="#"
													className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
												>
													<p className="order-1 font-semibold text-blue-700">
														{event.title}
													</p>
													<p className="text-blue-500 group-hover:text-blue-700">
														<time
															dateTime={event
																.start_date
																.toISOString()}
														>
															{event.start_date
																.toLocaleTimeString(
																	[],
																	{
																		hour:
																			"2-digit",
																		minute:
																			"2-digit",
																	},
																)}
														</time>
													</p>
												</a>
											</li>
										);
									})}

									<li
										className="relative mt-px flex sm:col-start-3"
										style={{ gridRow: "74 / span 12" }}
									>
										<a
											href="#"
											className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
										>
											<p className="order-1 font-semibold text-blue-700">
												Breakfast
											</p>
											<p className="text-blue-500 group-hover:text-blue-700">
												<time dateTime="2022-01-12T06:00">
													6:00 AM
												</time>
											</p>
										</a>
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeekView;
