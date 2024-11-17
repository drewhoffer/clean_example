import { z } from "zod";

export const eventSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	start_date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			return new Date(arg);
		}
	}, z.date()),
	end_date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			return new Date(arg);
		}
	}, z.date()),
});

export type Event = z.infer<typeof eventSchema>;

export type MakeEventParams = Omit<Event, "id"> & { id?: string };

export function makeEvent({
	id,
	title,
	description,
	start_date,
	end_date,
}: MakeEventParams) {
	return {
		id,
		title,
		description,
		start_date,
		end_date,
	};
}
