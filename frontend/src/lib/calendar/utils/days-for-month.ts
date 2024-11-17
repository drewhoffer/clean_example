import { Day } from "../contexts";

// Function to get the current date
const getToday = (): Date => {
	return new Date();
};

// Function to create a Day object
const createDay = (date: Date, isCurrentMonth: boolean, today: Date): Day => {
	return {
		date: date.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
		isCurrentMonth, // Boolean indicating if the day is in the current month
		isToday: date.toDateString() === today.toDateString(), // Boolean indicating if the day is today
	};
};

// Function to generate days for the current month
const generateCurrentMonthDays = (
	year: number,
	month: number,
	today: Date,
): Day[] => {
	const days: Day[] = [];
	const date = new Date(year, month, 1); // Start from the first day of the month

	// Loop through all days of the current month
	while (date.getMonth() === month) {
		days.push(createDay(date, true, today)); // Create a Day object for each day
		date.setDate(date.getDate() + 1); // Move to the next day
	}

	return days;
};

// Function to generate days from the previous month to fill the first row
const generatePreviousMonthDays = (
	year: number,
	month: number,
	daysFromPrevMonth: number,
	today: Date,
): Day[] => {
	const days: Day[] = [];
	for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
		const prevDate = new Date(year, month, -i); // Calculate the date for the previous month
		days.push(createDay(prevDate, false, today)); // Create a Day object for each day
	}
	return days;
};

// Function to generate days from the next month to fill the last row
const generateNextMonthDays = (
	year: number,
	month: number,
	daysFromNextMonth: number,
	today: Date,
): Day[] => {
	const days: Day[] = [];
	for (let i = 1; i <= daysFromNextMonth; i++) {
		const nextDate = new Date(year, month + 1, i); // Calculate the date for the next month
		days.push(createDay(nextDate, false, today)); // Create a Day object for each day
	}
	return days;
};

// Main function to generate all days for the calendar month view
export const generateDaysForMonth = (year: number, month: number): Day[] => {
	const today = getToday(); // Get the current date
	const firstDayOfMonth = new Date(year, month, 1); // Get the first day of the month
	const lastDayOfMonth = new Date(year, month + 1, 0); // Get the last day of the month

	const daysFromPrevMonth = firstDayOfMonth.getDay(); // Calculate the number of days to show from the previous month
	const daysFromNextMonth = 6 * 7 -
		(daysFromPrevMonth + lastDayOfMonth.getDate()); // Calculate the number of days to show from the next month

	// Combine days from the previous month, current month, and next month
	const days = [
		...generatePreviousMonthDays(year, month, daysFromPrevMonth, today),
		...generateCurrentMonthDays(year, month, today),
		...generateNextMonthDays(year, month, daysFromNextMonth, today),
	];

	return days;
};
