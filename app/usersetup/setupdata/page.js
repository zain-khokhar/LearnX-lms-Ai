// pages/index.js
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

const COURSE_DATA = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    description: "Master the building blocks of algebra with interactive challenges",
    category: "math",
    level: "beginner",
    ageGroup: "all",
    duration: "12 hours",
    lessons: 42,
    image: "bg-gradient-to-r from-indigo-500 to-purple-600"
  },
  {
    id: 2,
    title: "Quantum Physics",
    description: "Explore the strange world of quantum mechanics with intuitive visualizations",
    category: "science",
    level: "advanced",
    ageGroup: "16+",
    duration: "24 hours",
    lessons: 68,
    image: "bg-gradient-to-r from-cyan-500 to-blue-600"
  },
  {
    id: 3,
    title: "Python Programming",
    description: "Learn Python from scratch and build your first applications",
    category: "programming",
    level: "beginner",
    ageGroup: "13+",
    duration: "18 hours",
    lessons: 56,
    image: "bg-gradient-to-r from-emerald-500 to-teal-600"
  },
  {
    id: 4,
    title: "Machine Learning",
    description: "Dive into AI and build intelligent systems with real-world applications",
    category: "programming",
    level: "intermediate",
    ageGroup: "16+",
    duration: "30 hours",
    lessons: 84,
    image: "bg-gradient-to-r from-rose-500 to-pink-600"
  },
  {
    id: 5,
    title: "Chemistry Essentials",
    description: "Discover the principles that govern matter and chemical reactions",
    category: "science",
    level: "beginner",
    ageGroup: "13+",
    duration: "15 hours",
    lessons: 48,
    image: "bg-gradient-to-r from-amber-500 to-orange-600"
  },
  {
    id: 6,
    title: "Advanced Calculus",
    description: "Master differentiation, integration, and their real-world applications",
    category: "math",
    level: "advanced",
    ageGroup: "16+",
    duration: "28 hours",
    lessons: 72,
    image: "bg-gradient-to-r from-violet-500 to-fuchsia-600"
  },
];

const INTEREST_OPTIONS = [
  { id: "math", name: "Mathematics", icon: "🧮" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "programming", name: "Programming", icon: "💻" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "language", name: "Languages", icon: "🌎" },
];

const LEVEL_OPTIONS = [
  { id: "beginner", name: "Beginner", description: "Just starting out" },
  { id: "intermediate", name: "Intermediate", description: "Some prior knowledge" },
  { id: "advanced", name: "Advanced", description: "Comfortable with fundamentals" },
];

const AGE_OPTIONS = [
  { id: "under13", name: "Under 13" },
  { id: "13-17", name: "13-17" },
  { id: "18-25", name: "18-25" },
  { id: "26-40", name: "26-40" },
  { id: "over40", name: "40+" },
];

export default function CourseSelection() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState([]);
  const [ageGroup, setAgeGroup] = useState("");
  const [level, setLevel] = useState("");
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate suggested courses
  useEffect(() => {
    if (step === 4) {
      const filtered = COURSE_DATA.filter(course => {
        const interestMatch = interests.length === 0 || interests.includes(course.category);
        const ageMatch = !ageGroup || 
          (ageGroup === "under13" ? course.ageGroup === "all" : 
          (ageGroup === "13-17" ? course.ageGroup === "13+" || course.ageGroup === "all" : 
          course.ageGroup === "16+"));
        const levelMatch = !level || course.level === level;
        
        return interestMatch && ageMatch && levelMatch;
      });
      setSuggestedCourses(filtered);
    }
  }, [step, interests, ageGroup, level]);

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(i => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const restartOnboarding = () => {
    setStep(1);
    setInterests([]);
    setAgeGroup("");
    setLevel("");
  };

  // Step titles
  const stepTitles = [
    "What are you interested in learning?",
    "What's your age group?",
    "What's your current skill level?",
    "Recommended courses for you"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>LearnPath - Personalized Course Selection</title>
        <meta name="description" content="Discover courses tailored to your interests and skill level" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">LP</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">LearnPath</h1>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Home</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Courses</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">About</a></li>
              </ul>
            </nav>
            <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Sign In
            </button>
            <button className="md:hidden text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`text-sm font-medium ${step >= s ? 'text-indigo-600' : 'text-gray-500'}`}
              >
                Step {s}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {stepTitles[step - 1]}
            </h2>
            <p className="text-gray-600 mb-8">
              {step === 1 && "Select topics that interest you. We'll recommend courses based on your choices."}
              {step === 2 && "This helps us recommend age-appropriate content."}
              {step === 3 && "Help us match you with the right difficulty level."}
              {step === 4 && "Based on your preferences, here's what we recommend."}
            </p>

            {/* Step 1: Interests */}
            {step === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                      interests.includes(interest.id)
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="text-3xl mb-2">{interest.icon}</span>
                    <span className="font-medium text-gray-900">{interest.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Age Group */}
            {step === 2 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {AGE_OPTIONS.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => setAgeGroup(age.id)}
                    className={`p-4 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                      ageGroup === age.id
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="font-medium text-gray-900">{age.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Skill Level */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LEVEL_OPTIONS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevel(lvl.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      level === lvl.id
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{lvl.name}</h3>
                    <p className="text-gray-600">{lvl.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Course Recommendations */}
            {step === 4 && (
              <div>
                {suggestedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🤔</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No courses match your preferences</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your interests or skill level</p>
                    <button 
                      onClick={restartOnboarding}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Start Over
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestedCourses.map((course) => (
                      <div 
                        key={course.id} 
                        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className={`h-32 ${course.image}`}></div>
                        <div className="p-6">
                          <h3 className="font-bold text-xl text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-4">{course.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                              {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                            </span>
                            <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                            </span>
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                              {course.ageGroup}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{course.duration}</span>
            <span>{course.lessons} lessons</span>
          </div>
          <button className="mt-4 w-full py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            Explore Course
          </button>
        </div>
      </div>
    ))}
  </div>
)}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={`flex mt-10 ${step === 1 ? "justify-end" : "justify-between"}`}>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
              
              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && interests.length === 0) ||
                    (step === 2 && !ageGroup) ||
                    (step === 3 && !level)
                  }
                  className={`px-6 py-3 rounded-lg transition ${
                    ((step === 1 && interests.length === 0) ||
                    (step === 2 && !ageGroup) ||
                    (step === 3 && !level))
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={restartOnboarding}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center text-gray-600">
          <p>Join thousands of learners on LearnPath. Start your learning journey today.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">LP</span>
              </div>
              <h2 className="ml-2 text-lg font-bold text-gray-900">LearnPath</h2>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Help Center</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} LearnPath. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}