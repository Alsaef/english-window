import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.init';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login Successful!");
                navigate('/')
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login to English Window</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-2 mb-4 border rounded focus:outline-indigo-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 mb-4 border rounded focus:outline-indigo-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    New here? <Link to={'/register'}><span className="text-indigo-500 cursor-pointer">Create an account</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Login;