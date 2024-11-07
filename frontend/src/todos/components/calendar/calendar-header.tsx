import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const CalendarHeader = () => {
	return (
		<header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
			<h1 className="text-base font-semibold text-gray-900">
				<time dateTime="2022-01">January 2022</time>
			</h1>
			<div className="flex items-center">
				<div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
					<button
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
					>
						<span className="sr-only">Previous month</span>
						<ChevronLeftIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
					<button
						type="button"
						className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
					>
						Today
					</button>
					<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
					<button
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
					>
						<span className="sr-only">Next month</span>
						<ChevronRightIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="hidden md:ml-4 md:flex md:items-center">
					<div className="ml-6 h-6 w-px bg-gray-300" />
					<button
						type="button"
						className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add event
					</button>
				</div>
			</div>
		</header>
	);
};

export default CalendarHeader;
