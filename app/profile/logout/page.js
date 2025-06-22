"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [userData, setUserData] = useState({ name: 'User', email: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          setUserData(JSON.parse(stored));
        } catch {
          setUserData({ name: 'User', email: '' });
        }
      }
    }
  }, []);

  const handleSignOut = () => {
    setIsSigningOut(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    if (window.confirm('Successfully signed out! Would you like to return to login page?')) {
      router.push('/dashboard/login');
    } else {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Sign Out</h1>
        </div>
        
        {/* User Preview */}
        <div className="flex flex-col items-center py-6 border-b border-gray-200">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-gray-500 text-xl font-bold">{userData.name.charAt(0)}</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-gray-800">{userData.name}</h2>
          <p className="text-gray-500 text-sm">{userData.email}</p>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {/* Confirmation Message */}
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="mt-3 text-xl font-bold text-gray-800">Are you sure you want to sign out?</h3>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.back()}
              disabled={isSigningOut}
              className="flex-1 py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex-1 py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningOut ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing out...
                </span>
              ) : (
                "Yes, Sign Out"
              )}
            </button>
          </div>
        </div>
      </div>    </div>
  );
}

export default Page;