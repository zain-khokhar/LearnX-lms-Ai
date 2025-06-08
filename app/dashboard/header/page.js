// components/Header.js
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // State to track which category dropdown is open (clicked)
  const [openMenus, setOpenMenus] = useState({});
  // State to track which category is being hovered
  const [hoveredId, setHoveredId] = useState(null);

  // Ref wrapping the desktop nav + dropdowns
  const navRef = useRef(null);

  // Close any open category dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenus({});
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (id) => {
    setOpenMenus((prev) => {
      if (prev[id]) {
        // If already open, close it and clear hovered state
        setHoveredId(null);
        const copy = { ...prev };
        delete copy[id];
        return copy;
      } else {
        // Open this one and close any other
        return { [id]: true };
      }
    });
  };

  const courses = [
    {
      id: 'programming',
      name: 'Programming',
      submenu: [
        { name: 'JavaScript', href: '/courses/javascript' },
        { name: 'Python', href: '/courses/python' },
        { name: 'Java', href: '/courses/java' },
        { name: 'C++', href: '/courses/cpp' },
        { name: 'Web Development', href: '/courses/web-dev' },
      ],
    },
    {
      id: 'maths',
      name: 'Maths',
      submenu: [
        { name: 'Algebra', href: '/courses/algebra' },
        { name: 'Calculus', href: '/courses/calculus' },
        { name: 'Statistics', href: '/courses/statistics' },
        { name: 'Geometry', href: '/courses/geometry' },
      ],
    },
    {
      id: 'science',
      name: 'Science',
      submenu: [
        { name: 'Physics', href: '/courses/physics' },
        { name: 'Chemistry', href: '/courses/chemistry' },
        { name: 'Biology', href: '/courses/biology' },
        { name: 'Environmental Science', href: '/courses/environmental' },
      ],
    },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-white rounded-lg p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl md:text-2xl">LearnHub</span>
            </Link>
          </div>

          {/* Desktop Navigation (wrapped in ref) */}
          <nav ref={navRef} className="hidden md:flex space-x-1 lg:space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
            >
              Home
            </Link>

            {courses.map((category) => {
              const isOpen = !!openMenus[category.id];
              const isHovered = hoveredId === category.id;
              // Show dropdown if clicked-open OR hovered
              const showDropdown = isOpen || isHovered;

              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-medium flex items-center"
                  >
                    {category.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`
                      absolute left-0 mt-1 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50
                      ${showDropdown ? 'block' : 'hidden'}
                    `}
                  >
                    {category.submenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition duration-150"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <Link
              href="/dashboard/dashboard"
              className="px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
            >
              Dashboard
            </Link>
         <Link
              href="/themebutton"
              className="px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
            >
              Theme settings
            </Link>
         
          </nav>
      

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              <button className="p-2 rounded-full hover:bg-blue-600 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-blue-600 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <span className="hidden md:inline font-medium">Ali Raza</span>
                <svg
                  className="hidden md:inline w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
                  <Link href="/profile/userprofile" className="block px-4 py-2 hover:bg-blue-100">
                    My Profile
                  </Link>
                  <Link href="/profile/settings" className="block px-4 py-2 hover:bg-blue-100">
                    Settings
                  </Link>
                  <Link href="/profile/logout" className="block px-4 py-2 hover:bg-blue-100">
                    Sign Out
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-700"
            >
              Home
            </Link>

            {courses.map((category) => {
              const isOpen = !!openMenus[category.id];
              return (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full text-left px-3 py-2 rounded-md text-white font-medium hover:bg-blue-700 flex justify-between items-center"
                  >
                    {category.name}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="ml-4 mt-1 mb-2">
                      {category.submenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-blue-100 font-medium hover:bg-blue-700"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
