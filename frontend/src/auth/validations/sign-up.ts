import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	passwordConfirmation: z.string().min(8),
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords must match",
	path: ["passwordConfirmation"],
});

export type SignUp = z.infer<typeof signUpSchema>;
