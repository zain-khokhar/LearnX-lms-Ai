// pages/dashboard.js
"use client";
import React from 'react';
import { FiBook, FiClock, FiAward, FiCalendar, FiBarChart2, FiUsers, FiMessageSquare } from 'react-icons/fi';

const Dashboard = () => { 
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
              <FiBook className="text-white text-2xl" />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">LearnHub Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="text-gray-600 hover:text-indigo-600">
                <FiMessageSquare className="text-xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
            </div>
            <div className="relative">
              <button className="text-gray-600 hover:text-indigo-600">
                <FiUsers className="text-xl" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">AR</div>
              <div>
                <p className="font-medium text-gray-800">Ali Raza</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Ali!</h2>
              <p className="opacity-90 mb-4">Continue your learning journey. You've completed 65% of your goals this week.</p>
              <div className="w-full bg-blue-400 rounded-full h-2.5 mb-4">
                <div className="bg-white h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <button className="bg-white text-indigo-600 font-medium px-5 py-2 rounded-lg hover:bg-opacity-90 transition">
                View Progress
              </button>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
                <button className="text-indigo-600 font-medium hover:underline">View All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Card 1 */}
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FiBook className="text-blue-600 text-xl" />
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      In Progress
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mt-3">Advanced JavaScript</h3>
                  <p className="text-sm text-gray-600 mt-1">Learn modern JS frameworks</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-1" />
                      <span>12h 45m left</span>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">
                      Continue
                    </button>
                  </div>
                </div>
                
                {/* Course Card 2 */}
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <FiAward className="text-purple-600 text-xl" />
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mt-3">Data Science Fundamentals</h3>
                  <p className="text-sm text-gray-600 mt-1">Python, Pandas & Visualization</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-1" />
                      <span>32h 15m left</span>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Deadlines</h2>
                <FiCalendar className="text-indigo-600" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">JavaScript Project</h3>
                    <p className="text-sm text-gray-600">Due: Today, 5:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                    <div className="bg-yellow-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Math Quiz</h3>
                    <p className="text-sm text-gray-600">Due: Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Science Assignment</h3>
                    <p className="text-sm text-gray-600">Due: Sep 15, 3:00 PM</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
                View Calendar
              </button>
            </div>
            
            {/* Recommended Courses */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recommended</h2>
                <FiBarChart2 className="text-indigo-600" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 w-3 h-3 rounded-full mr-3"></div>
                  <p className="font-medium">React Advanced Patterns</p>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="bg-purple-500 w-3 h-3 rounded-full mr-3"></div>
                  <p className="font-medium">Machine Learning Basics</p>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                  <p className="font-medium">Advanced Calculus</p>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Browse Courses
              </button>
            </div>
            
            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Learning Stats</h3>
              
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm opacity-80">Courses</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm opacity-80">Hours</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold">86%</p>
                  <p className="text-sm opacity-80">Avg. Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;