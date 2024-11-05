import { http } from "@/lib";
import { SignUp } from "../validations";

export const signUp = async (values: SignUp): Promise<unknown> =>
	await http.post("/sign_up", values);
