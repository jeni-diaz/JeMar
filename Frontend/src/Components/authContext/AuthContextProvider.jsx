import { useState } from "react";
import { AuthContext } from "./AuthContext";

const tokenValue = localStorage.getItem('token');
const roleValue = localStorage.getItem("role");

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);
     const [role, setRole] = useState(roleValue);

    const handleLogin = (token, role) => {
        setToken(token);
         setRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem("role", role);
    };

    const handleLogout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                onLogin: handleLogin,
                onLogout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;