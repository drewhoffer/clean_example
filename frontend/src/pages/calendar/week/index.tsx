import { AppSidebar } from "@/core";
import { CalendarHeader, CalendarProvider } from "@/lib/calendar";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import { useEffect, useRef } from "react";

export const WeekContent = () => {
	const container = useRef<any>(null);
	const containerNav = useRef<any>(null);
	const containerOffset = useRef<any>(null);

	useEffect(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		container.current.scrollTop = ((container.current.scrollHeight -
			containerNav.current.offsetHeight -
			containerOffset.current.offsetHeight) *
			currentMinute) /
			1440;
	}, []);

	return (
		<div className="container">
			<div className="hidden h-full flex-1 flex-col space-y-8  md:flex">
				<div className="px-4 pt-4">
					<SidebarTrigger />
				</div>

				<CalendarHeader />
				<div
					ref={container}
					className="isolate flex flex-auto flex-col overflow-auto bg-white"
				>
					<div
						style={{ width: "165%" }}
						className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
					>
						<div
							ref={containerNav}
							className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black/5 sm:pr-8"
						>
							<div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden">
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									M{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										10
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									T{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										11
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									W{" "}
									<span className="mt-1 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
										12
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									T{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										13
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									F{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										14
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									S{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										15
									</span>
								</button>
								<button
									type="button"
									className="flex flex-col items-center pb-3 pt-2"
								>
									S{" "}
									<span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
										16
									</span>
								</button>
							</div>

							<div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid">
								<div className="col-end-1 w-14" />
								<div className="flex items-center justify-center py-3">
									<span>
										Mon{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											10
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span>
										Tue{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											11
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span className="flex items-baseline">
										Wed{" "}
										<span className="ml-1.5 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
											12
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span>
										Thu{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											13
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span>
										Fri{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											14
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span>
										Sat{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											15
										</span>
									</span>
								</div>
								<div className="flex items-center justify-center py-3">
									<span>
										Sun{" "}
										<span className="items-center justify-center font-semibold text-gray-900">
											16
										</span>
									</span>
								</div>
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
									<div
										ref={containerOffset}
										className="row-end-1 h-7"
									/>
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

export const WeekPage = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<CalendarProvider>
				<WeekContent />
			</CalendarProvider>
		</SidebarProvider>
	);
};

export default WeekPage;
