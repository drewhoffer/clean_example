import { createContext } from "react";
import { Login, SignUp } from "../validations";

interface AuthContextType {
  login: (values: Login) => Promise<{ token: string }>;
  signup: (values: SignUp) => Promise<void>;
  getSessions: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
