"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserToken = Cookies.get('userToken');
        const storedUserId = localStorage.getItem('userId');
        if (storedUserName && storedUserId && storedUserToken) {
            setUserName(JSON.parse(storedUserName));
            setUserId(JSON.parse(storedUserId));
            setUserToken(storedUserToken);
        }
        setLoading(false);
    }, []);

    const login = (userName, userId, userToken) => {
        setUserName(userName);
        setUserId(userId);
        setUserToken(userToken);
        localStorage.setItem('userName', JSON.stringify(userName));
        localStorage.setItem('userId', JSON.stringify(userId));
        Cookies.set('userToken', userToken, { expires: 1 ,secure: true, sameSite: 'none'});
    };

    const logout = () => {
        setUserId(null);
        setUserName(null);
        setUserToken(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        Cookies.remove('userToken');
    };

    return (
        <UserContext.Provider value={{ userName, userId, userToken, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);