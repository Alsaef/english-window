import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.init';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            
            await updateProfile(userCredential.user, {
                displayName: name
            });

            alert(`Welcome ${name}! Account Created Successfully!`);
            navigate('/'); 
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">English Window</h2>
                <p className="text-center text-gray-500 mb-6">Create your account</p>
                
                <form onSubmit={handleRegister}>
                  
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="example@mail.com" 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                        Register Now
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account? 
                    <button onClick={() => navigate('/login')} className="text-blue-600 font-bold ml-1 hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;