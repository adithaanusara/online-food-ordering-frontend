import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

type AuthUser = {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  role: "CUSTOMER" | "DRIVER" | "OWNER" | "ADMIN";
  phone?: string;
  nicNumber?: string;
  nic?: string;
  gender?: string;
  vehicleType?: string;
  vehicleNumber?: string;
};

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  fullName: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "DRIVER";
  phone?: string;
  nicNumber?: string;
  gender?: string;
  vehicleType?: string;
  vehicleNumber?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  signIn: (data: SignInData) => AuthUser;
  signUp: (data: SignUpData) => AuthUser;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  function signIn(data: SignInData) {
    const loggedUser = authService.signIn(data) as AuthUser;
    setUser(loggedUser);
    return loggedUser;
  }

  function signUp(data: SignUpData) {
    const createdUser = authService.signUp(data) as AuthUser;
    setUser(createdUser);
    return createdUser;
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}