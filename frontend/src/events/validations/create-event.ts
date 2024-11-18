import { z } from "zod";

export const createEventSchema = z.object({
	title: z.string().min(1, "Title must be at least 1 character").nonempty(
		"Title is required",
	),
	description: z.string().optional(),
	start_date: z.date({ required_error: "Start time is required" }),
	end_date: z.coerce.date({ required_error: "End time is required" }),
}).refine((data) => data.start_date < data.end_date, {
	message: "End time must be after start time",
});

export type CreateEvent = z.infer<typeof createEventSchema>;
