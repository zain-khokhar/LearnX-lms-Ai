// pages/login.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE_URL = '/api/auth';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = `/api/auth/${isLogin ? 'login' : 'signup'}`;
      const payload = isLogin 
        ? { email: loginEmail, password: loginPassword }
        : { email: signupEmail, password: signupPassword, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Store user data and token if successful
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Clear form and show success message
      setError('');
      setLoading(false);
      
      // Optionally offer redirection
      // if (confirm('Login successful! Would you like to go to the dashboard?')) {
        router.replace("/dashboard/dashboard");
        
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred during authentication');
      setLoading(false);
    }
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <p className="mt-2 text-sm text-gray-600">Redirecting...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {loading && <LoadingOverlay />}
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 font-bold text-center ${
                isLogin 
                  ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50' 
                  : 'text-gray-500 hover:bg-blue-50'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 font-bold text-center ${
                !isLogin 
                  ? 'text-indigo-800 border-b-2 border-indigo-800 bg-indigo-50' 
                  : 'text-gray-500 hover:bg-indigo-50'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"                value={isLogin ? loginEmail : signupEmail}
                onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"                value={isLogin ? loginPassword : signupPassword}
                onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition duration-200 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900'
                  : 'bg-gradient-to-r from-indigo-700 to-indigo-800 hover:from-indigo-800 hover:to-indigo-900'
              }`}
            >
              {loading ? 'Processing...' : isLogin ? 'Login to Account' : 'Create Account'}
            </button>

            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-blue-700 hover:text-blue-800 font-medium">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-indigo-700 hover:text-indigo-800"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;