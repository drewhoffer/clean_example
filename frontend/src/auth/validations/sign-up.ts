import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	password_confirmation: z.string().min(8),
}).refine((data) => data.password === data.password_confirmation, {
	message: "Passwords must match",
	path: ["passwordConfirmation"],
});

export type SignUp = z.infer<typeof signUpSchema>;
