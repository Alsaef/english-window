import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {
    const { user,loading } = useContext(AuthContext)

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50 backdrop-blur-sm">
           
            <div className="relative">
                
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                
               
                <div className="absolute top-1 left-1 w-14 h-14 border-4 border-transparent border-t-purple-500 rounded-full animate-spin-slow"></div>
            </div>

           
            <div className="mt-4 flex items-center space-x-1">
                <span className="text-lg font-semibold text-gray-700 tracking-widest">LOADING</span>
                <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                </span>
            </div>
        </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }


    return children;



};

export default Private;