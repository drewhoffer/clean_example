import { http } from "@/lib/http";
import { Event } from "..";

export interface GetAllEvents {
	month: number;
	year: number;
}
export const getAllEvents = async (
	{ month, year }: GetAllEvents,
): Promise<Event[]> =>
	await http.get<Event[]>("/events", {
		params: {
			month,
			year,
		},
	});
