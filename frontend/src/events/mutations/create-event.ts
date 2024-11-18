import { http } from "@/lib/http";
import { Event, makeEvent } from "../";
import { CreateEvent } from "../validations";

export const createEvent = async (newEvent: CreateEvent): Promise<Event> =>
	await http.post<Event>(
		"/events",
		makeEvent(newEvent),
	);
