import { ReactNode, useEffect, useState } from "react";
import { CalendarContext, Day } from "../contexts";
import { generateDaysForMonth } from "../utils";

export interface CalendarProviderProps {
	children: ReactNode;
}
const initializeDays = (year: number, month: number): Day[] => {
	return generateDaysForMonth(year, month);
};

const findToday = (days: Day[]): Day | undefined => {
	return days.find((day) => day.isToday);
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [days, setDays] = useState<Day[]>([]);
	const [selectedDay, setSelectedDay] = useState<Day | undefined>(undefined);
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth(),
	);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear(),
	);

	useEffect(() => {
		const initialDays = initializeDays(currentYear, currentMonth);
		setDays(initialDays);
		setSelectedDay(findToday(initialDays));
	}, [currentMonth, currentYear]);

	return (
		<CalendarContext.Provider
			value={{
				days,
				selectedDay,
				setSelectedDay,
				currentMonth,
				currentYear,
				setCurrentMonth,
				setCurrentYear,
			}}
		>
			{children}
		</CalendarContext.Provider>
	);
};

export default CalendarProvider;
