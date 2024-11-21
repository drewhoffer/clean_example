import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/lib/ui";
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "../../hooks";
import { monthNames } from "../../utils";
import Link from "next/link";

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
				<div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
					<button
						onClick={handlePreviousMonth}
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
					>
						<span className="sr-only">Previous week</span>
						<ChevronLeftIcon
							className="size-5"
							aria-hidden="true"
						/>
					</button>
					<button
						onClick={handleToday}
						type="button"
						className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
					>
						Today
					</button>
					<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
					<button
						onClick={handleNextMonth}
						type="button"
						className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
					>
						<span className="sr-only">Next week</span>
						<ChevronRightIcon
							className="size-5"
							aria-hidden="true"
						/>
					</button>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild className="ml-4">
						<Button variant="outline">
							Calendar View <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuGroup>
							<DropdownMenuItem>
								Day View
							</DropdownMenuItem>
							<Link href="/calendar/week">
								<DropdownMenuItem className="cursor-pointer">
									Week View
								</DropdownMenuItem>
							</Link>
							<Link href="/calendar/month">
								<DropdownMenuItem>
									Month View
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="ml-6 h-6 w-px bg-gray-300" />

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
