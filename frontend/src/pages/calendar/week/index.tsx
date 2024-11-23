import WeekView from "@/components/week-view";
import { AppSidebar } from "@/core";
import { CalendarHeader, CalendarProvider, useCalendar } from "@/lib/calendar";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import { useRouter } from "next/router";

const WeekPage = () => {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<CalendarProvider>
					<WeekContent />
				</CalendarProvider>
			</SidebarProvider>
		</>
	);
};

export const WeekContent = () => {
	const router = useRouter();
	const {
		getNextWeek,
		getPreviousWeek,
		setSelectedDay,
	} = useCalendar();

	const handleNextWeekClick = () => {
		const { year, month, day } = getNextWeek();
		setSelectedDay(day);
		router.push({
			pathname: "/calendar/week",
			query: { year, month, day },
		});
	};

	const handlePrevWeekClick = () => {
		const { year, month, day } = getPreviousWeek();
		setSelectedDay(day);
		router.push({
			pathname: "/calendar/week",
			query: { year, month, day },
		});
	};

	return (
		<div className="container">
			<div className=" h-full flex-1 flex-col space-y-2  md:flex">
				<div className="px-4 pt-4">
					<SidebarTrigger />
				</div>
				<CalendarHeader
					onNextClick={handleNextWeekClick}
					onPrevClick={handlePrevWeekClick}
				/>
				<WeekView />
			</div>
		</div>
	);
};

export default WeekPage;
