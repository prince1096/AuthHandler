import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("token");
  console.log(encodedToken, "encodedToken");
  const [token, setToken] = useState(encodedToken || "");

  console.log(token);

  return (
    <div>
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
