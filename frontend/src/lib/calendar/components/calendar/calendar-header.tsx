import { Button } from "@/lib/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "../../hooks";
import { monthNames } from "../../utils";

export const CalendarHeader = () => {
	const { currentMonth, currentYear, setCurrentMonth, setCurrentYear } =
		useCalendar();

	const handlePreviousMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const handleToday = () => {
		const today = new Date();
		setCurrentMonth(today.getMonth());
		setCurrentYear(today.getFullYear());
	};
	return (
		<header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
			<div className="flex items-center">
				<div className="relative flex items-center rounded-md bg-white shadow-sm mr-5 md:items-stretch">
					<button
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
						onClick={handlePreviousMonth}
					>
						<span className="sr-only">Previous month</span>
						<ChevronLeftIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>

					<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
					<button
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
						onClick={handleNextMonth}
					>
						<span className="sr-only">Next month</span>
						<ChevronRightIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
				</div>
				<h1 className="text-base font-semibold text-gray-900 mr-5">
					<time
						dateTime={`${currentYear}-${
							String(currentMonth + 1).padStart(2, "0")
						}`}
					>
						{monthNames[currentMonth]} {currentYear}
					</time>
				</h1>
			</div>
			<div className="flex items-center">
				<Button variant={"outline"} type="button" onClick={handleToday}>
					Today
				</Button>
				<div className="hidden md:ml-4 md:flex md:items-center">
					<Button>
						Add event
					</Button>
				</div>
			</div>
		</header>
	);
};

export default CalendarHeader;
