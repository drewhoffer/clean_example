import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    if (token && router.pathname === "/login") {
      router.push("/");
    }
  }, [router]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
