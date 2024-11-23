import { ReactNode, useEffect, useState } from "react";
import { CalendarContext } from "../contexts";
import { useRouter } from "next/router";

export interface CalendarProviderProps {
	children: ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const router = useRouter();
	const { day, month, year } = router.query;

	const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth() + 1,
	);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear(),
	);
	const [selectedDay, setSelectedDay] = useState<number>(
		new Date().getDate(),
	);

	useEffect(() => {
		const parsedYear = year
			? parseInt(year as string)
			: new Date().getFullYear();
		const parsedMonth = month
			? parseInt(month as string)
			: new Date().getMonth() + 1;
		const parsedDay = day ? parseInt(day as string) : new Date().getDate();
		const validMonth = validateMonth(parsedMonth);
		const validDay = validateDay(parsedYear, validMonth, parsedDay);
		setCurrentYear(parsedYear);
		setCurrentMonth(validMonth);
		setCurrentDay(validDay);
		setSelectedDay(validDay);

		const path = router.pathname.includes("week") ? "week" : "month";
		if (
			parsedYear !== currentYear || validMonth !== currentMonth ||
			validDay !== currentDay
		) {
			router.replace(
				`/calendar/${path}?year=${parsedYear}&month=${validMonth}&day=${validDay}`,
			);
		}
	}, [currentDay, currentMonth, currentYear, day, month, router, year]);

	const getNextWeek = () => {
		const nextWeekDate = new Date(
			currentYear,
			currentMonth - 1,
			currentDay + 7,
		);
		const nextYear = nextWeekDate.getFullYear();
		const nextMonth = nextWeekDate.getMonth() + 1;
		const nextDay = nextWeekDate.getDate();
		return { year: nextYear, month: nextMonth, day: nextDay };
	};

	const getPreviousWeek = () => {
		const prevWeekDate = new Date(
			currentYear,
			currentMonth - 1,
			currentDay - 7,
		);
		const prevYear = prevWeekDate.getFullYear();
		const prevMonth = prevWeekDate.getMonth() + 1;
		const prevDay = prevWeekDate.getDate();
		return { year: prevYear, month: prevMonth, day: prevDay };
	};

	const getWeekRange = () => {
		const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
		const dayOfWeek = currentDate.getDay();
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(
			currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1),
		); // Adjust when day is Sunday
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		return { startOfWeek, endOfWeek };
	};

	const getNextMonth = () => {
		const nextMonthDate = new Date(currentYear, currentMonth, 1);
		const nextYear = nextMonthDate.getFullYear();
		const nextMonth = nextMonthDate.getMonth() + 1;
		return { year: nextYear, month: nextMonth, day: 1 };
	};

	const getPreviousMonth = () => {
		const prevMonthDate = new Date(currentYear, currentMonth - 2, 1);
		const prevYear = prevMonthDate.getFullYear();
		const prevMonth = prevMonthDate.getMonth() + 1;
		return { year: prevYear, month: prevMonth, day: 1 };
	};

	return (
		<CalendarContext.Provider
			value={{
				currentDay,
				currentMonth,
				currentYear,
				selectedDay,
				setSelectedDay,
				setCurrentMonth,
				setCurrentYear,
				getNextWeek,
				getPreviousWeek,
				getNextMonth,
				getPreviousMonth,
				getWeekRange,
			}}
		>
			{children}
		</CalendarContext.Provider>
	);
};

const getLastDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month, 0).getDate();
};

const validateDay = (year: number, month: number, day: number): number => {
	const lastDay = getLastDayOfMonth(year, month);
	if (day < 1) {
		return 1;
	} else if (day > lastDay) {
		return lastDay;
	}
	return day;
};

const validateMonth = (month: number): number => {
	if (month < 1) {
		return 1;
	} else if (month > 12) {
		return 12;
	}
	return month;
};

export default CalendarProvider;
