import { createContext } from "react";
import { z } from "zod";

// Define the Zod schema
export const CalendarItemSchema = z.object({
	id: z.string(),
	title: z.string(),
	start_date: z.date().optional(),
	end_date: z.date().optional(),
}).refine((data) => data.start_date || data.end_date, {
	message: "Either start_date or end_date must be provided",
});

// Infer the TypeScript type from the Zod schema
export type CalendarItem = z.infer<typeof CalendarItemSchema>;

export interface Day {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
	isSelected?: boolean;
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

export const CalendarContext = createContext<
	CalendarContextProps | undefined
>(
	undefined,
);

export default CalendarContext;
