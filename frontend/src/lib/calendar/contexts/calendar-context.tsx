import { createContext } from "react";
import { Event } from "@/events";

export interface Day {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
	isSelected?: boolean;
	events: Event[]; // TODO: This will need to be generic once we add events
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
