import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext();

export const AuthenticationProver = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessUser = JSON.parse(localStorage.getItem("token"));

    if (accessUser) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
