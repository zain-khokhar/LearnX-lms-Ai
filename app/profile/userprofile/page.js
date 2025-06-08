// app/my-profile/page.js
"use client";
import React from 'react';

const ProfilePage = () => {
  // Mock user data
  const userData = {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    dob: "1995-08-15",
    gender: "Male",
    country: "India",
    joinedDate: "2023-01-10",
    enrolledCourses: 12,
    completedCourses: 8,
    streak: 7,
    badges: [
      { name: "Fast Learner", color: "bg-green-500" },
      { name: "Quiz Master", color: "bg-yellow-500" },
      { name: "Course Explorer", color: "bg-blue-500" },
      { name: "Perfect Attendance", color: "bg-purple-500" },
      { name: "Early Bird", color: "bg-cyan-500" },
    ],
  };

  // Format joined date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-indigo-100">{userData.email}</p>
                </div>
              </div>
              <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <InfoItem label="Date of Birth" value={userData.dob} optional={true} />
                  <InfoItem label="Gender" value={userData.gender} optional={true} />
                  <InfoItem label="Country / Location" value={userData.country} />
                  <InfoItem label="Joined Date" value={formatDate(userData.joinedDate)} />
                </div>
              </div>

              {/* Learning Stats */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard 
                    title="Enrolled Courses" 
                    value={userData.enrolledCourses} 
                    color="bg-blue-500"
                  />
                  <StatCard 
                    title="Completed Courses" 
                    value={userData.completedCourses} 
                    color="bg-green-500"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Learning Streak</h3>
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full h-3 flex-grow">
                      <div 
                        className="bg-cyan-500 h-3 rounded-full" 
                        style={{ width: `${Math.min(userData.streak * 10, 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">{userData.streak} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-gray-50 p-5 rounded-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Badges & Achievements</h2>
              <div className="flex flex-wrap gap-3">
                {userData.badges.map((badge, index) => (
                  <div 
                    key={index} 
                    className={`${badge.color} text-white py-2 px-4 rounded-full flex items-center`}
                  >
                    <span className="mr-2">🏆</span>
                    {badge.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value, optional }) => (
  <div>
    <p className="text-gray-600 text-sm">
      {label} {optional && <span className="text-gray-400">(optional)</span>}
    </p>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

// Reusable Stat Card Component
const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <p className="text-gray-600">{title}</p>
    <p className={`text-3xl font-bold mt-1 ${color ? color.replace('bg-', 'text-') : 'text-gray-800'}`}>
      {value}
    </p>
  </div>
);

export default ProfilePage;