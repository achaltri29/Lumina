import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('lumina-token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUserData();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                logout();
            }
        } catch {
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('lumina-token', data.token);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch {
            return { success: false, error: 'Network error' };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('lumina-token', data.token);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch {
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('lumina-token');
    };

    const updatePreferences = async (preferences) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/preferences`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(preferences)
            });

            const data = await response.json();

            if (response.ok) {
                setUser(prev => ({
                    ...prev,
                    preferences: data.user.preferences
                }));
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Update preferences error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updatePreferences,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
