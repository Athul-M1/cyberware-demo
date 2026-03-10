import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize from sessionStorage if available
        const savedToken = sessionStorage.getItem("token");
        const savedUser = sessionStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const loginUser = (userData, accessToken) => {
        setToken(accessToken);
        setUser(userData);
        sessionStorage.setItem("token", accessToken);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };

    const logoutUser = () => {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    };

    const value = {
        user,
        token,
        loading,
        loginUser,
        logoutUser,
        isAuthenticated: !!token && !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
