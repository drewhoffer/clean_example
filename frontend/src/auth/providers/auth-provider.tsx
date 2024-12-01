import { AuthContext } from "../contexts";
import { Login, SignUp } from "../validations";
import { login as loginMutation, signUp as signUpMutation } from "../mutations";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = async (values: Login) => {
    try {
      return await loginMutation(values);
    } catch {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (values: SignUp) => {
    try {
      return await signUpMutation(values);
    } catch {
      throw new Error("Something went wrong. Please try again.");
    }
  };

  const getSessions = async () => {
    try {
      return await getSessions();
    } catch {
      throw new Error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, getSessions }}>
      {children}
    </AuthContext.Provider>
  );
};
