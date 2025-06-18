// components/LmsLoader.jsx
"use client";
import { useEffect, useState } from 'react';

const LmsLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (1 + Math.random() * 4);
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm">
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-lg bg-blue-200 shadow-lg transform rotate-12 animate-float-1"></div>
      <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-lg bg-indigo-200 shadow-lg transform -rotate-6 animate-float-2"></div>
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 rounded-lg bg-purple-200 shadow-lg transform rotate-3 animate-float-3"></div>
      
      {/* Main loader container */}
      <div className="relative z-10 w-[90vw] max-w-3xl h-[70vh] max-h-[600px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center overflow-hidden">
        {/* Animated title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 animate-pulse-slow">
            Preparing Your Learning Journey
          </h1>
          <p className="mt-2 text-gray-600 font-medium">
            Gathering resources, setting up your environment...
          </p>
        </div>
        
        {/* Animated student character */}
        <div className="relative w-64 h-64 mb-8">
          {/* Head */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-100 rounded-full border-4 border-blue-300"></div>
          
          {/* Body */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-40 bg-blue-200 rounded-t-full border-4 border-blue-300"></div>
          
          {/* Moving arm - writing */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-blue-100 rounded-full border-4 border-blue-300 animate-arm-write">
            <div className="absolute right-0 w-8 h-8 bg-yellow-400 rounded-full"></div>
          </div>
          
          {/* Book */}
          <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-white rounded-lg shadow-lg border-2 border-blue-200 animate-book-flip">
            <div className="absolute inset-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-sm"></div>
            <div className="absolute top-1 left-2 w-6 h-0.5 bg-blue-300 rounded-full"></div>
            <div className="absolute top-3 left-2 w-10 h-0.5 bg-blue-300 rounded-full"></div>
            <div className="absolute top-5 left-2 w-8 h-0.5 bg-blue-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Floating formulas */}
        <div className="absolute top-24 right-12 text-2xl font-mono font-bold text-blue-400 animate-float-4">E=mc²</div>
        <div className="absolute bottom-32 left-12 text-2xl font-mono font-bold text-indigo-400 animate-float-5">π</div>
        <div className="absolute top-16 left-16 text-2xl font-mono font-bold text-purple-400 animate-float-6">∫</div>
        
        {/* Progress bar */}
        <div className="w-full max-w-2xl mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-blue-600 font-medium">Loading Progress</span>
            <span className="text-blue-600 font-bold">{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Animated tips */}
        <div className="mt-6 text-center text-gray-600 animate-fade-in-out">
          <p>Did you know? Taking short breaks while studying improves retention by up to 50%</p>
        </div>
      </div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-particle ${5 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default LmsLoader;