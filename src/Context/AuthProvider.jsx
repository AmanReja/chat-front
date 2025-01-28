import React, { useState, createContext, useContext } from "react";
import cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = cookies.get("jwt") || localStorage.getItem("userid");
  const [authUser, setAuthUser] = useState(initialState || null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
