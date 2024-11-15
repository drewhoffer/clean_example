import { http } from "@/lib/http";

export const getSessions = async (): Promise<unknown> =>
	await http.get("/sessions");
