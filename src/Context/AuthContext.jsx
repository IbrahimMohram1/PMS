import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ save user data from token
  const saveUserData = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  };

  // ✅ logout
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  // ✅ on refresh
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
