import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.init';
import SocialLogin from './SocialLogin';
import { LogIn, Lock, Mail, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message.replace('Firebase: ', ''));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-slate-50 px-4 py-12">
      <Helmet>
        <title>Login | English Window</title>
        <meta name="description" content="Sign in to your English Window account to continue learning English vocabulary." />
      </Helmet>
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/90 w-full max-w-md">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to continue your English learning progress
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-error mb-5 rounded-2xl text-xs sm:text-sm py-3 text-white">
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                placeholder="Enter password" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:scale-102 flex items-center justify-center gap-2"
          >
            <span>{loading ? "Signing in..." : "Login"}</span>
          </button>
        </form>

        <div className="divider my-6 text-xs text-slate-400 uppercase tracking-wider">
          Or Continue With
        </div>

        <SocialLogin />

        <p className="mt-6 text-xs sm:text-sm text-center text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;