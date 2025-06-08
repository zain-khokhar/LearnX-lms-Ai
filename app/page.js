// pages/index.js
"use client";
import React, { useState } from 'react';
import { FiBook, FiCalendar, FiMessageSquare, FiClipboard, FiBarChart2, FiBell, FiSearch, FiLogOut, FiUser, FiClock, FiAward } from 'react-icons/fi';
const HomePage = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New assignment', course: 'JavaScript', time: '2 hours ago', read: false },
    { id: 2, title: 'Course updated', course: 'Data Science', time: '1 day ago', read: true },
  ]);
  
  const user = {
    name: 'Ali',
    progress: 65,
    enrolled: 4,
    completed: 2,
    streak: 12
  };
// any change deteted here will be reflected in the UI
  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      instructor: 'Sarah Johnson',
      progress: 68,
      duration: '12h 45m left',
      thumbnail: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      icon: <FiBook className="text-blue-500" />
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Michael Chen',
      progress: 24,
      duration: '32h 15m left',
      thumbnail: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: <FiAward className="text-purple-500" />
    }
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: 'React Masterclass',
      instructor: 'Emma Wilson',
      rating: 4.9,
      students: 2450,
      duration: '8 weeks',
      thumbnail: 'bg-gradient-to-r from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      title: 'Python for Data Analysis',
      instructor: 'David Kim',
      rating: 4.7,
      students: 1870,
      duration: '6 weeks',
      thumbnail: 'bg-gradient-to-r from-green-500 to-teal-500'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Sophia Martinez',
      rating: 4.8,
      students: 3120,
      duration: '5 weeks',
      thumbnail: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    }
  ];

  const quickLinks = [
    { id: 1, title: 'Calendar', icon: <FiCalendar className="text-xl" />, path: '/courseactivities/calender' },
    { id: 2, title: 'Assignments', icon: <FiClipboard className="text-xl" />, path: '/assignments' },
    { id: 3, title: 'Messages', icon: <FiMessageSquare className="text-xl" />, path: '/courseactivities/messages' },
    { id: 4, title: 'Progress', icon: <FiBarChart2 className="text-xl" />, path: '/courseactivities/progress' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-2 rounded-lg">
              <FiBook className="text-white text-2xl" />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">LearnHub</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="text-gray-600 hover:text-indigo-600">
                <FiSearch className="text-xl" />
              </button>
            </div>
            <div className="relative">
              <button className="text-gray-600 hover:text-indigo-600">
                <FiBell className="text-xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">A</div>
              <div>
                <p className="font-medium text-gray-800">Ali Raza</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, <span className="text-indigo-600">{user.name}</span>!</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey. You've completed {user.completed} of {user.enrolled} courses.</p>
          
          {/* Progress Tracker */}
          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Your learning progress</span>
              <span className="font-bold text-indigo-600">{user.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
                style={{ width: `${user.progress}%` }}
              ></div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.streak}</div>
                <div className="text-sm text-gray-600">Day streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.enrolled}</div>
                <div className="text-sm text-gray-600">Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickLinks.map(link => (
            <a 
              key={link.id}
              href={link.path}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center hover:shadow-md transition hover:-translate-y-1"
            >
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 mb-2">
                {link.icon}
              </div>
              <span className="font-medium text-gray-800">{link.title}</span>
            </a>
          ))}
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'enrolled' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('enrolled')}
              >
                Enrolled
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'recommended' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('recommended')}
              >
                Recommended
              </button>
            </div>
          </div>

          {activeTab === 'enrolled' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <div className={`${course.thumbnail} h-32`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                        <p className="text-gray-600">Instructor: {course.instructor}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {course.icon}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
                  <div className={`${course.thumbnail} h-40 flex items-center justify-center`}>
                    <FiBook className="text-white text-4xl opacity-80" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-3">By {course.instructor}</p>
                    
                    <div className="flex justify-between text-sm mb-4">
                      <div className="flex items-center text-yellow-500">
                        ★ {course.rating} <span className="text-gray-500 ml-1">({Math.floor(course.students/1000)}k)</span>
                      </div>
                      <div className="text-gray-600">
                        {course.duration}
                      </div>
                    </div>
                    
                    <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition">
                      Explore Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Notifications</h2>
            <button className="text-indigo-600 font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border ${notification.read ? 'border-gray-200' : 'border-indigo-300 bg-indigo-50'}`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">{notification.course}</p>
                  </div>
                  <div className="text-gray-500 text-sm">{notification.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-2 rounded-lg">
                <FiBook className="text-white text-xl" />
              </div>
              <span className="ml-2 font-bold text-gray-800">LearnHub</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Terms</a>
            </div>
            
            <div className="mt-4 md:mt-0 text-gray-500 text-sm">
              © 2023 LearnHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;