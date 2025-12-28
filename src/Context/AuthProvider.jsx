import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

