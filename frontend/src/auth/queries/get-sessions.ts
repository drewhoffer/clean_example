import { http } from "@/lib";

export const getSessions = async (): Promise<unknown> =>
	await http.get("/sessions");
