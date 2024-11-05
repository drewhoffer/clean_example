import { http } from "@/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await http.get("/sessions");
				setIsAuthenticated(true);
			} catch (e) {
				console.error(e);
				setIsAuthenticated(false);
				router.push("/login");
			}
		};

		checkAuth();
	}, [router]);

	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
