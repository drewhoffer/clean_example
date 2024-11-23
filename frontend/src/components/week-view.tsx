import { useCalendar } from "@/lib/calendar";
import { useRouter } from "next/router";

const WeekView = () => {
	const { getWeekRange, selectedDay } = useCalendar();
	const router = useRouter();
	const { startOfWeek } = getWeekRange();
	const daysOfWeek = [];
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
		);
	};
	return (
		<div className="container">
			<div className="h-full flex-1 flex-col space-y-8 md:flex">
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
												day.getDate() ===
														selectedDay
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
										type="button"
										onClick={() => handleDayClick(day)}
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
									<li
										className="relative mt-px flex sm:col-start-3"
										style={{ gridRow: "92 / span 30" }}
									>
										<a
											href="#"
											className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100"
										>
											<p className="order-1 font-semibold text-pink-700">
												Flight to Paris
											</p>
											<p className="text-pink-500 group-hover:text-pink-700">
												<time dateTime="2022-01-12T07:30">
													7:30 AM
												</time>
											</p>
										</a>
									</li>
									<li
										className="relative mt-px hidden sm:col-start-6 sm:flex"
										style={{ gridRow: "122 / span 24" }}
									>
										<a
											href="#"
											className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs/5 hover:bg-gray-200"
										>
											<p className="order-1 font-semibold text-gray-700">
												Meeting with design team at
												Disney
											</p>
											<p className="text-gray-500 group-hover:text-gray-700">
												<time dateTime="2022-01-15T10:00">
													10:00 AM
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
