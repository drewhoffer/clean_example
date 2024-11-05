import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import { getSessions } from "../queries";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await getSessions();
				setIsAuthenticated(true);
			} catch {
				setIsAuthenticated(false);
				router.push("/login");
			}
		};
		if (router.pathname !== "/login" && router.pathname !== "/sign-up") {
			checkAuth();
		}
	}, [router]);

	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
