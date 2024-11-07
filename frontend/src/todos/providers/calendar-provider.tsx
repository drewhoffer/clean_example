import { useEffect, useState } from "react";
import { CalendarContext, Day } from "../contexts";
import { generateDaysForMonth } from "@/utils";

export interface CalendarProviderProps {
	children: React.ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [days, setDays] = useState<Day[]>([]);
	const [selectedDay, setSelectedDay] = useState<Day | undefined>(undefined);

	useEffect(() => {
		const today = new Date();
		const initialDays = generateDaysForMonth(
			today.getFullYear(),
			today.getMonth(),
		);
		setDays(initialDays);
		setSelectedDay(initialDays.find((day) => day.isToday));
	}, []);

	return (
		<CalendarContext.Provider value={{ days, selectedDay, setSelectedDay }}>
			{children}
		</CalendarContext.Provider>
	);
};

export default CalendarProvider;
