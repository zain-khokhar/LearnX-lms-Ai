// pages/enroll.js
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema
const formSchema = z.object({
  fullName: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  dob: z.string().refine(val => new Date(val) < new Date(), 'Invalid birth date'),
  interests: z.array(z.string()).nonempty('Select at least one interest'),
  skillLevel: z.string(),
  learningStyle: z.string(),
  terms: z.boolean().refine(val => val, 'You must accept terms')
});

export default function EnrollmentPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      skillLevel: 'beginner'
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setSuccess(true);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Password strength indicator
  const password = watch('password', '');
  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    let strength = Math.min(password.length / 12 * 100, 100);
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return Math.min(strength, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
              Future Dev Academy
            </h1>
            <p className="text-gray-300">
              Master quantum computing, AI programming, and next-gen development skills
            </p>
          </header>

          {!success ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-cyan-500/20 p-6 md:p-8 shadow-xl shadow-blue-500/10"
            >
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === s 
                          ? 'bg-cyan-500 text-gray-900' 
                          : step > s 
                            ? 'bg-green-500' 
                            : 'bg-gray-700'
                      }`}
                    >
                      {step > s ? '✓' : s}
                    </div>
                    {s < 3 && (
                      <div className={`h-1 w-16 mx-2 ${step > s ? 'bg-green-500' : 'bg-gray-600'}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6">Personal Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Full Name</label>
                        <input
                          {...register('fullName')}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="Alex Johnson"
                        />
                        {errors.fullName && (
                          <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium">Date of Birth</label>
                        <input
                          type="date"
                          {...register('dob')}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                        {errors.dob && (
                          <p className="text-red-400 text-sm mt-1">{errors.dob.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium">Email</label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="alex@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium">Password</label>
                      <input
                        type="password"
                        {...register('password')}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${getPasswordStrength()}%` }}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6">Learning Preferences</h2>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Programming Interests</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Quantum Computing', 'AI/ML', 'Blockchain', 
                          'Web3 Development', 'AR/VR', 'Cybersecurity',
                          'Robotics', 'IoT', 'Neural Interfaces'
                        ].map((lang) => (
                          <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              value={lang}
                              {...register('interests')}
                              className="hidden peer"
                            />
                            <div className="w-5 h-5 border border-cyan-500 rounded peer-checked:bg-cyan-500 flex items-center justify-center">
                              <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span>{lang}</span>
                          </label>
                        ))}
                      </div>
                      {errors.interests && (
                        <p className="text-red-400 text-sm mt-2">{errors.interests.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Skill Level</h3>
                      <div className="flex space-x-4">
                        {[
                          { value: 'beginner', label: 'Beginner' },
                          { value: 'intermediate', label: 'Intermediate' },
                          { value: 'advanced', label: 'Advanced' }
                        ].map((level) => (
                          <label key={level.value} className="flex items-center">
                            <input
                              type="radio"
                              value={level.value}
                              {...register('skillLevel')}
                              className="hidden peer"
                            />
                            <div className="px-4 py-2 border border-cyan-500 rounded-lg peer-checked:bg-cyan-500 peer-checked:text-gray-900">
                              {level.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Preferred Learning Style</h3>
                      <select
                        {...register('learningStyle')}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select your preference</option>
                        <option value="interactive">Interactive Coding Labs</option>
                        <option value="video">Video Tutorials</option>
                        <option value="ar">AR/VR Simulations</option>
                        <option value="ai">AI-Powered Personal Tutor</option>
                        <option value="project">Project-Based Learning</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6">Confirmation</h2>
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl">
                      <h3 className="text-lg font-medium mb-4">Review Your Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400">Full Name</p>
                          <p>{watch('fullName') || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Email</p>
                          <p>{watch('email') || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Date of Birth</p>
                          <p>{watch('dob') || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Interests</p>
                          <p>{(watch('interests') || []).join(', ') || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Skill Level</p>
                          <p>{watch('skillLevel') || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Learning Style</p>
                          <p>{watch('learningStyle') || '-'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          {...register('terms')}
                          className="mt-1 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                        />
                        <span>
                          I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms of Service</a> and 
                          acknowledge the <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="text-red-400 text-sm mt-2">{errors.terms.message}</p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-10">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all ${
                          isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Enrolling...' : 'Complete Enrollment'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-green-500/20 p-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Enrollment Successful!</h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Welcome to the future of programming education. Your neural interface module will be shipped shortly.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setStep(1);
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                Enroll Another Student
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}