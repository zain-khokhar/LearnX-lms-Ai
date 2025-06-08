// File: src/components/ThemeToggle.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark' || 
        (selectedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'dark':
        return <MoonIcon className="w-4 h-4" />;
      case 'light':
        return <SunIcon className="w-4 h-4" />;
      case 'system':
        return <ComputerDesktopIcon className="w-4 h-4" />;
      default:
        return <ComputerDesktopIcon className="w-4 h-4" />;
    }
  };

  const getThemeLabel = (themeName) => {
    if (themeName === 'system') {
      return `System (${getSystemTheme()})`;
    }
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">LMS Theme Selector</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Choose your preferred theme for the Learning Management System
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col gap-3">
          {['light', 'dark', 'system'].map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
                ${theme === themeOption 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-500 shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  theme === themeOption 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {getThemeIcon(themeOption)}
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {getThemeLabel(themeOption)}
                </span>
              </div>
              
              {theme === themeOption && (
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                <SunIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Current Theme: {theme === 'system' ? `System (${getSystemTheme()})` : theme}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your preference will be saved for future visits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;