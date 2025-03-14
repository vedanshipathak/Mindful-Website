import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { registerUser, loginUser, getToken, saveToken, logoutUser } from "../api/auth";

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data from backend if a token exists
  useEffect(() => {
    const token = getToken();
    if (token) {
      // You can call a `/me` API here to get user details using the token
      setUser({ id: "1", name: "User", email: "test@example.com" }); // Placeholder
    }
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await registerUser({ name, email, password });
      if (response.msg === "User registered successfully") {
        return { success: true, message: "Signup successful! Please login." };
      } else {
        return { success: false, message: response.msg || "Signup failed" };
      }
    } catch (error) {
      return { success: false, message: "Signup failed. Try again." };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        saveToken(response.token);
        setUser({ id: response.user.id, name: response.user.name, email: response.user.email });
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: response.msg || "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, message: "Login failed. Try again." };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
