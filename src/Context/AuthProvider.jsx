import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';

export const AuthContext = createContext();
import { GoogleAuthProvider } from "firebase/auth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const googleLogin=()=>{
        return signInWithPopup(auth,provider)
    }
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
        <AuthContext.Provider value={{ user, logout,googleLogin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

