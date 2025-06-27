// app/progress/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { FiBook, FiClock, FiAward, FiBarChart2, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressPage = ({ params }) => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user ID from authentication context or params
  const userId = "65f1a9e8f7d8b8c1d4f3b2a1" || params?.userId; // Replace with actual user ID

  // Fetch progress data from API
  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const [overallRes, coursesRes, achievementsRes] = await Promise.all([
        fetch(`/api/progress/user/${userId}`),
        fetch(`/api/progress/courses/${userId}`),
        fetch(`/api/progress/achievements/${userId}`)
      ]);
      
      if (!overallRes.ok) throw new Error('Failed to fetch overall progress');
      if (!coursesRes.ok) throw new Error('Failed to fetch courses progress');
      if (!achievementsRes.ok) throw new Error('Failed to fetch achievements');
      
      const overall = await overallRes.json();
      const courses = await coursesRes.json();
      const achievements = await achievementsRes.json();
      
      setProgressData({ overall, courses, achievements });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  // When updating progress
  const updateCourseProgress = async (courseId, newData) => {
    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          courseId,
          progressData: newData
        })
      });
      
      if (!response.ok) throw new Error('Failed to update progress');
      
      // Refresh data after update
      fetchProgressData();
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchProgressData();
  }, [userId]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate progress status
  const getProgressStatus = (progress) => {
    if (progress >= 90) return 'Excellent';
    if (progress >= 75) return 'Good';
    if (progress >= 50) return 'Average';
    return 'Needs Improvement';
  };

  // Get status color
  const getStatusColor = (progress) => {
    if (progress >= 90) return 'text-green-600 bg-green-100';
    if (progress >= 75) return 'text-blue-600 bg-blue-100';
    if (progress >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchProgressData}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const progressChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Your Progress',
        data: progressData.overall.weeklyProgress || [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Class Average',
        data: [52, 58, 62, 60, 65, 68, 70],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderDash: [5, 5],
        tension: 0.3,
      }
    ],
  };

  const hoursChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Learning Hours',
        data: progressData.overall.weeklyHours || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Learning Progress</h1>
              <p className="mt-2 text-gray-600">Track and analyze your learning journey</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button 
                onClick={() => setTimeFilter('week')} 
                className={`px-4 py-2 rounded-lg ${timeFilter === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setTimeFilter('month')} 
                className={`px-4 py-2 rounded-lg ${timeFilter === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setTimeFilter('year')} 
                className={`px-4 py-2 rounded-lg ${timeFilter === 'year' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<FiBook className="text-2xl" />}
            title="Enrolled Courses"
            value={progressData.overall.enrolledCourses || 0}
            change="+3 this month"
            color="bg-indigo-100 text-indigo-600"
          />
          <StatCard 
            icon={<FiClock className="text-2xl" />}
            title="Learning Hours"
            value={progressData.overall.learningHours || 0}
            change="+12h this week"
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            icon={<FiAward className="text-2xl" />}
            title="Completion Rate"
            value={`${progressData.overall.completionRate || 0}%`}
            change="+8% this month"
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            icon={<FiTrendingUp className="text-2xl" />}
            title="Average Score"
            value={`${progressData.overall.avgScore || 0}%`}
            change="Consistent performer"
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard 
            icon={<FiCalendar className="text-2xl" />}
            title="Current Streak"
            value={`${progressData.overall.streak || 0} days`}
            change="Keep it up!"
            color="bg-orange-100 text-orange-600"
          />
          <StatCard 
            icon={<FiBarChart2 className="text-2xl" />}
            title="Courses Completed"
            value={progressData.overall.completedCourses || 0}
            change="2 more than last month"
            color="bg-purple-100 text-purple-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Progress Over Time</h2>
              <div className="text-sm text-gray-500">Compared to class average</div>
            </div>
            <div className="h-80">
              <Line options={chartOptions} data={progressChartData} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Weekly Learning Hours</h2>
              <div className="text-sm text-gray-500">
                Current week: {progressData.overall.weeklyHours?.reduce((a, b) => a + b, 0) || 0}h
              </div>
            </div>
            <div className="h-80">
              <Bar 
                data={hoursChartData} 
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      min: 0,
                      max: 20,
                      ticks: {
                        callback: function(value) {
                          return value + 'h';
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Courses Progress */}
        <div className="bg-white rounded-2xl shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Course Progress</h2>
            <p className="text-gray-600 mt-1">Detailed progress for each enrolled course</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {progressData.courses.map(course => (
              <div key={course._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                    <p className="text-gray-600">Instructor: {course.instructor}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Progress</div>
                      <div className="text-lg font-bold text-indigo-600">{course.progress}%</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.progress)}`}>
                        {getProgressStatus(course.progress)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Time Spent</div>
                      <div className="text-lg font-bold text-gray-800">{course.hoursSpent}h</div>
                      <div className="text-xs text-gray-500">{course.hoursLeft}h left</div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Completion</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-gray-500">Last Accessed</div>
                    <div className="font-medium">{formatDate(course.lastAccessed)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Target Completion</div>
                    <div className="font-medium">{formatDate(course.targetDate)}</div>
                  </div>
                </div>
                
                {/* Assessments */}
                {course.assessments && course.assessments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-800 mb-3">Assessment Scores</h4>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {course.assessments.map((assessment, idx) => (
                        <div key={idx} className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4">
                          <div className="text-sm text-gray-500 truncate">{assessment.name}</div>
                          <div className="flex items-baseline mt-2">
                            <span className="text-2xl font-bold text-indigo-600">{assessment.score}%</span>
                            <span className="ml-2 text-sm text-gray-500">score</span>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="h-1.5 rounded-full" 
                                style={{ 
                                  width: `${assessment.score}%`,
                                  backgroundColor: assessment.score >= 85 
                                    ? '#10B981' 
                                    : assessment.score >= 70 
                                      ? '#F59E0B' 
                                      : '#EF4444'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressData.achievements.map(achievement => (
              <div 
                key={achievement._id} 
                className={`border rounded-xl p-4 flex flex-col items-center text-center ${
                  achievement.earned 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-70'
                }`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  achievement.earned 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {achievement.earned ? 'Earned' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, change, color }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex">
    <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{change}</p>
    </div>
  </div>
);

export default ProgressPage;