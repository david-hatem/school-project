import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();

  let token = cookies.get("authToken");
  useEffect(() => {
    // Check for existing session
    // const storedUser = localStorage.getItem("user");

    if (token != null) {
      console.log(token);
      // setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = async () => {
    // In a real app, this would be an API call
    // if (username === "admin" && password === "admin") {
    //   const user = {
    //     username,
    //     name: "John Doe",
    //     role: "admin",
    //   };
    //   localStorage.setItem("user", JSON.stringify(user));
    //   setUser(user);
    //   setIsAuthenticated(true);
    // } else {
    //   throw new Error("Invalid credentials");
    // }
    let token = cookies.get("authToken");
    if (token != null) {
      console.log("DONE---");
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("user");
  //   // setUser(null);
  //   setIsAuthenticated(false);
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
