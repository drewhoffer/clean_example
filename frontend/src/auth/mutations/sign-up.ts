import { http } from "@/lib/http";
import { SignUp } from "../validations";

export const signUp = async (values: SignUp): Promise<void> =>
  await http.post("/sign_up", values);
