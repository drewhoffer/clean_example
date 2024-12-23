import { http } from "@/lib/http";
import { Login } from "../validations";

interface LoginResponse {
	token: string;
}

export const login = async (values: Login): Promise<LoginResponse> =>
	await http.post<LoginResponse>("/sign_in", values);
