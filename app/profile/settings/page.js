// pages/settings/index.js
"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', name: 'Profile Settings' },
    { id: 'account', name: 'Account Settings' },
    { id: 'notifications', name: 'Notification Settings' },
    { id: 'privacy', name: 'Privacy Settings' },
    { id: 'security', name: 'Password & Security' },
    { id: 'language', name: 'Language Preferences' },
    { id: 'theme', name: 'Theme / Appearance' },
    { id: 'course', name: 'Course Preferences' },
    { id: 'student', name: 'Student Preferences' },
    { id: 'accessibility', name: 'Accessibility Options' },
    { id: 'billing', name: 'Billing Information' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LMS Settings</title>
        <meta name="description" content="Manage your LMS settings" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your LMS preferences and account settings</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Settings Menu</h2>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>
              </div>
              
              <div className="p-6">
                {activeTab === 'profile' && <ProfileSettings />}
                {activeTab === 'account' && <AccountSettings />}
                {activeTab === 'notifications' && <NotificationSettings />}
                {activeTab === 'privacy' && <PrivacySettings />}
                {activeTab === 'security' && <SecuritySettings />}
                {activeTab === 'language' && <LanguageSettings />}
                {activeTab === 'theme' && <ThemeSettings />}
                {activeTab === 'course' && <CourseSettings />}
                {activeTab === 'student' && <StudentSettings />}
                {activeTab === 'accessibility' && <AccessibilitySettings />}
                {activeTab === 'billing' && <BillingSettings />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Components
const ProfileSettings = () => (
  <div>
    <div className="flex items-center mb-8">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center">
          <span className="text-gray-500">Photo</span>
        </div>
        <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <div className="ml-6">
        <h3 className="text-lg font-medium text-gray-800">John Doe</h3>
        <p className="text-gray-600">johndoe@example.com</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input 
          type="text" 
          defaultValue="John"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input 
          type="text" 
          defaultValue="Doe"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          defaultValue="johndoe@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input 
          type="tel" 
          defaultValue="+1 (555) 123-4567"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea 
          rows={3}
          defaultValue="Educator with 10+ years of experience in computer science and online learning."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    
    <div className="mt-8 flex justify-end">
      <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
        Save Changes
      </button>
    </div>
  </div>
);

const AccountSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Account Information</h3>
      <p className="text-gray-600">Manage your account details and preferences</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Account Status</h4>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span>Active</span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Subscription Plan</h4>
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-medium">Premium Plan</span>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Change Plan
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Account Actions</h4>
        <div className="space-y-3">
          <button className="w-full text-left text-red-600 hover:text-red-800 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors">
            Temporarily Deactivate Account
          </button>
          <button className="w-full text-left text-red-600 hover:text-red-800 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors">
            Permanently Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Notification Preferences</h3>
      <p className="text-gray-600">Customize how you receive notifications</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Email Notifications</h4>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Push Notifications</h4>
            <p className="text-sm text-gray-600">Receive notifications on your devices</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Course Updates</h4>
            <p className="text-sm text-gray-600">Notify me about course updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Assignment Reminders</h4>
            <p className="text-sm text-gray-600">Remind me about upcoming assignments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const PrivacySettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Privacy Settings</h3>
      <p className="text-gray-600">Control your privacy preferences</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Profile Visibility</h4>
            <p className="text-sm text-gray-600">Who can see your profile</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Public</option>
            <option>Only Me</option>
            <option>Students</option>
            <option>Instructors</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Activity Status</h4>
            <p className="text-sm text-gray-600">Show when you're active on the platform</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Data Sharing</h4>
            <p className="text-sm text-gray-600">Allow sharing of anonymized data for research</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Password & Security</h3>
      <p className="text-gray-600">Manage your account security settings</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Password</h4>
            <p className="text-sm text-gray-600">Last changed 3 months ago</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Change Password
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Active Sessions</h4>
            <p className="text-sm text-gray-600">Review devices that have accessed your account</p>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            View Sessions
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LanguageSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Language Preferences</h3>
      <p className="text-gray-600">Set your preferred language for the LMS</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          <option>English (US)</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Chinese</option>
          <option>Japanese</option>
        </select>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">Content Language</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          <option>Same as interface</option>
          <option>English (US)</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Chinese</option>
          <option>Japanese</option>
        </select>
        <p className="mt-2 text-sm text-gray-500">Note: Not all content may be available in your selected language</p>
      </div>
    </div>
  </div>
);

const ThemeSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Theme & Appearance</h3>
      <p className="text-gray-600">Customize the look and feel of your LMS</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-indigo-500 rounded-lg p-1">
            <div className="bg-gray-800 rounded-lg h-32 flex flex-col items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white mb-2"></div>
              <span className="text-white text-sm">Dark</span>
            </div>
          </div>
          <div className="border-2 border-gray-300 rounded-lg p-1 hover:border-gray-400">
            <div className="bg-white rounded-lg h-32 flex flex-col items-center justify-center border border-gray-200">
              <div className="h-4 w-4 rounded-full bg-gray-800 mb-2"></div>
              <span className="text-gray-800 text-sm">Light</span>
            </div>
          </div>
          <div className="border-2 border-gray-300 rounded-lg p-1 hover:border-gray-400">
            <div className="bg-indigo-50 rounded-lg h-32 flex flex-col items-center justify-center border border-gray-200">
              <div className="h-4 w-4 rounded-full bg-indigo-600 mb-2"></div>
              <span className="text-gray-800 text-sm">System</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
        <div className="grid grid-cols-5 gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-indigo-700"></div>
          <div className="h-10 w-10 rounded-full bg-blue-500 border-2 border-blue-600"></div>
          <div className="h-10 w-10 rounded-full bg-green-500 border-2 border-green-600"></div>
          <div className="h-10 w-10 rounded-full bg-purple-500 border-2 border-purple-600"></div>
          <div className="h-10 w-10 rounded-full bg-cyan-500 border-2 border-cyan-600"></div>
          <div className="h-10 w-10 rounded-full bg-pink-500 border-2 border-pink-600"></div>
          <div className="h-10 w-10 rounded-full bg-yellow-500 border-2 border-yellow-600"></div>
          <div className="h-10 w-10 rounded-full bg-orange-500 border-2 border-orange-600"></div>
          <div className="h-10 w-10 rounded-full bg-red-500 border-2 border-red-600"></div>
          <div className="h-10 w-10 rounded-full bg-gray-500 border-2 border-gray-600"></div>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Font Size</h4>
            <p className="text-sm text-gray-600">Adjust the text size across the platform</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Default</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const CourseSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Course Preferences</h3>
      <p className="text-gray-600">Customize your course experience</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Default View</h4>
            <p className="text-sm text-gray-600">How courses are displayed by default</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Grid View</option>
            <option>List View</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Course Notifications</h4>
            <p className="text-sm text-gray-600">Receive notifications for new content</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Video Playback Speed</h4>
            <p className="text-sm text-gray-600">Default speed for course videos</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Normal (1x)</option>
            <option>1.25x</option>
            <option>1.5x</option>
            <option>1.75x</option>
            <option>2x</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Download Quality</h4>
            <p className="text-sm text-gray-600">Quality for downloadable course materials</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Standard (720p)</option>
            <option>High (1080p)</option>
            <option>Low (480p)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const StudentSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Student Preferences</h3>
      <p className="text-gray-600">Manage settings related to student interactions</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Student Messaging</h4>
            <p className="text-sm text-gray-600">Allow students to send you messages</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Office Hours</h4>
            <p className="text-sm text-gray-600">Set your available office hours</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Configure
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Assignment Submission</h4>
            <p className="text-sm text-gray-600">Default settings for assignment submissions</p>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Edit Settings
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AccessibilitySettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Accessibility Options</h3>
      <p className="text-gray-600">Enhance your experience with accessibility tools</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">High Contrast Mode</h4>
            <p className="text-sm text-gray-600">Increase color contrast for better visibility</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Text-to-Speech</h4>
            <p className="text-sm text-gray-600">Enable reading of course content</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Keyboard Navigation</h4>
            <p className="text-sm text-gray-600">Enable keyboard shortcuts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-800">Closed Captions</h4>
            <p className="text-sm text-gray-600">Auto-enable captions for videos</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const BillingSettings = () => (
  <div>
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Billing Information</h3>
      <p className="text-gray-600">Manage your payment methods and billing details</p>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Payment Methods</h4>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-10" />
            <div className="ml-4">
              <div className="font-medium text-gray-800">Visa ending in 1234</div>
              <div className="text-sm text-gray-600">Expires 12/2025</div>
            </div>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Edit
          </button>
        </div>
        <button className="flex items-center text-indigo-600 hover:text-indigo-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Payment Method
        </button>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Billing History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Jun 1, 2025</td>
                <td className="px-4 py-3 text-sm text-gray-900">Premium Subscription</td>
                <td className="px-4 py-3 text-sm text-gray-900">$49.99</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 1, 2025</td>
                <td className="px-4 py-3 text-sm text-gray-900">Premium Subscription</td>
                <td className="px-4 py-3 text-sm text-gray-900">$49.99</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Apr 1, 2025</td>
                <td className="px-4 py-3 text-sm text-gray-900">Premium Subscription</td>
                <td className="px-4 py-3 text-sm text-gray-900">$49.99</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
          View Full History
        </button>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Billing Address</h4>
        <div className="mb-4">
          <div className="text-gray-800">John Doe</div>
          <div className="text-gray-600">123 Education Street</div>
          <div className="text-gray-600">San Francisco, CA 94107</div>
          <div className="text-gray-600">United States</div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Update Address
        </button>
      </div>
    </div>
  </div>
);