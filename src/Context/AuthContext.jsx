<<<<<<< HEAD

=======
>>>>>>> f8636bc9431462acb0d4fd8525eae6c14e9b273d
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveUserData();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUserData,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
