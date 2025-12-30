import { createContext } from "react";

let AuthContext = createContext();

export function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
