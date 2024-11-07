import { createContext } from "react";

export interface Event {
	id: number;
	name: string;
	time: string;
	datetime: string;
	href: string;
}

export interface Day {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
	isSelected?: boolean;
	events: Event[];
}

export interface CalendarContextProps {
	days: Day[];
	selectedDay: Day | undefined;
	setSelectedDay: (day: Day | undefined) => void;
	currentMonth: number;
	currentYear: number;
	setCurrentMonth: (month: number) => void;
	setCurrentYear: (year: number) => void;
}

export const CalendarContext = createContext<CalendarContextProps | undefined>(
	undefined,
);

export default CalendarContext;
