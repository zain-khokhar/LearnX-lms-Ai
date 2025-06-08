// app/progress/page.js
"use client";
import React, { useState } from 'react';
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

const ProgressPage = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  
  // Mock data
  const progressData = {
    overall: {
      enrolledCourses: 12,
      completedCourses: 8,
      inProgress: 4,
      completionRate: 65,
      learningHours: 142,
      streak: 7,
      avgScore: 86,
    },
    weeklyProgress: [65, 72, 68, 75, 80, 78, 82],
    courses: [
      {
        id: 1,
        title: "Advanced JavaScript",
        instructor: "Ali Raza",
        progress: 68,
        hoursSpent: 24,
        hoursLeft: 12,
        lastAccessed: "2023-10-15",
        targetDate: "2023-11-30",
        assessments: [
          { name: "Module 1 Quiz", score: 92 },
          { name: "Project 1", score: 88 },
          { name: "Midterm", score: 85 },
        ]
      },
      {
        id: 2,
        title: "Data Science Fundamentals",
        instructor: "Sarah Khan",
        progress: 42,
        hoursSpent: 18,
        hoursLeft: 24,
        lastAccessed: "2023-10-18",
        targetDate: "2023-12-15",
        assessments: [
          { name: "Pandas Assignment", score: 78 },
          { name: "Data Visualization", score: 85 },
        ]
      },
      {
        id: 3,
        title: "React Native Development",
        instructor: "Ahmed Malik",
        progress: 85,
        hoursSpent: 32,
        hoursLeft: 6,
        lastAccessed: "2023-10-20",
        targetDate: "2023-11-15",
        assessments: [
          { name: "Component Design", score: 90 },
          { name: "State Management", score: 88 },
          { name: "API Integration", score: 92 },
        ]
      }
    ],
    achievements: [
      { id: 1, name: "Fast Learner", description: "Completed 3 courses in 30 days", earned: true, icon: "⚡" },
      { id: 2, name: "Quiz Master", description: "Scored 90%+ on 5 quizzes", earned: true, icon: "📝" },
      { id: 3, name: "Perfect Attendance", description: "30 consecutive learning days", earned: false, icon: "🔥" },
      { id: 4, name: "Early Bird", description: "Completed course before deadline", earned: false, icon: "⏰" },
    ],
    weeklyHours: [8, 12, 9, 11, 14, 10, 13],
  };

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

  // Progress chart data
  const progressChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Your Progress',
        data: progressData.weeklyProgress,
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

  // Hours chart data
  const hoursChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Learning Hours',
        data: progressData.weeklyHours,
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderRadius: 4,
      }
    ],
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
            value={progressData.overall.enrolledCourses}
            change="+3 this month"
            color="bg-indigo-100 text-indigo-600"
          />
          <StatCard 
            icon={<FiClock className="text-2xl" />}
            title="Learning Hours"
            value={progressData.overall.learningHours}
            change="+12h this week"
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            icon={<FiAward className="text-2xl" />}
            title="Completion Rate"
            value={`${progressData.overall.completionRate}%`}
            change="+8% this month"
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            icon={<FiTrendingUp className="text-2xl" />}
            title="Average Score"
            value={`${progressData.overall.avgScore}%`}
            change="Consistent performer"
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard 
            icon={<FiCalendar className="text-2xl" />}
            title="Current Streak"
            value={`${progressData.overall.streak} days`}
            change="Keep it up!"
            color="bg-orange-100 text-orange-600"
          />
          <StatCard 
            icon={<FiBarChart2 className="text-2xl" />}
            title="Courses Completed"
            value={progressData.overall.completedCourses}
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
              <div className="text-sm text-gray-500">Current week: {progressData.weeklyHours.reduce((a, b) => a + b, 0)}h</div>
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
              <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
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
                key={achievement.id} 
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