import React, { createContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: number;
  username: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>({
    id: 1,
    username: "demoUser",
  });

  const login = (userData: AuthUser) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
