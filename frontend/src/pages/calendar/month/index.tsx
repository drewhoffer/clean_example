import { AppSidebar } from "@/core";
import { CalendarHeader, CalendarProvider, useCalendar } from "@/lib/calendar";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import { useRouter } from "next/router";

export const MonthContent = () => {
	const router = useRouter();
	const { currentDate, setCurrentDate } = useCalendar();

	const handleNextClick = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + 1);
		setCurrentDate(newDate);
	};

	const handleBackClick = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() - 1);
		setCurrentDate(newDate);
	};

	return (
		<>
			<SidebarTrigger />
			<CalendarHeader
				onNextClick={handleNextClick}
				onPrevClick={handleBackClick}
			/>
		</>
	);
};

export const MonthPage = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<CalendarProvider>
				<MonthContent />
			</CalendarProvider>
		</SidebarProvider>
	);
};
