// app/assignments/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { 
  FiFile, FiCalendar, FiClock, FiCheck, FiAlertCircle, 
  FiUpload, FiDownload, FiEdit, FiMessageSquare, 
  FiUsers, FiBell, FiBarChart2, FiRefreshCw
} from 'react-icons/fi';

const AssignmentsPage = () => {
  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Linear Algebra Problem Set",
      course: "Mathematics 101",
      description: "Solve the given linear equations using matrix operations.",
      instructions: "Show all steps clearly. Submit as PDF with your name and student ID.",
      dueDate: "2023-10-15T23:59",
      maxMarks: 100,
      status: "submitted", // pending, late, graded
      submissionDate: "2023-10-14T14:30",
      attachments: ["problem_set.pdf"],
      submissionFiles: ["solution_ali.pdf"],
      plagiarismScore: 8,
      rubric: [
        { criteria: "Correctness", weight: 40 },
        { criteria: "Methodology", weight: 30 },
        { criteria: "Presentation", weight: 20 },
        { criteria: "Timeliness", weight: 10 }
      ],
      grade: 92,
      feedback: "Excellent work! Your matrix operations were perfect. Minor presentation improvements needed.",
      peerReviews: [
        { reviewer: "Sarah K.", rating: 4.5, comment: "Very detailed solution, easy to follow" },
        { reviewer: "John M.", rating: 5, comment: "Perfect methodology" }
      ],
      analytics: {
        avgScore: 85,
        timeSpent: "4.5 hours",
        submissionTrend: "Early"
      }
    },
    {
      id: 2,
      key: Date.now() + Math.random(), // adding a unique key to each assignment
      title: "Chemistry Lab Report",
      key: `assignment-${Date.now() + Math.random()}`,
      course: "Chemistry 201",
      description: "Write a lab report on titration experiment.",
      instructions: "Include abstract, methodology, results, and conclusion. Use APA format.",
      dueDate: "2023-10-20T23:59",
      maxMarks: 100,
      status: "pending",
      submissionDate: null,
      attachments: ["lab_manual.pdf", "data_sheet.xlsx"],
      submissionFiles: [],
      plagiarismScore: null,
      rubric: [
        { criteria: "Accuracy", weight: 30 },
        { criteria: "Analysis", weight: 40 },
        { criteria: "Formatting", weight: 20 },
        { criteria: "References", weight: 10 }
      ],
      grade: null,
      feedback: "",
      peerReviews: [],
      analytics: null
    },
    {
      id: 3,
      title: "History Essay - Cold War",
      course: "Modern History 301",
      description: "Analyze the economic impacts of the Cold War on developing nations.",
      instructions: "1500-2000 words. Use at least 5 academic sources. Submit in .docx format.",
      dueDate: "2023-10-10T23:59",
      maxMarks: 100,
      status: "late",
      submissionDate: "2023-10-11T09:15",
      attachments: ["essay_guidelines.pdf", "sample_essay.docx"],
      submissionFiles: ["cold_war_essay_ali.docx"],
      plagiarismScore: 15,
      rubric: [
        { criteria: "Thesis", weight: 20 },
        { criteria: "Research", weight: 30 },
        { criteria: "Analysis", weight: 30 },
        { criteria: "Writing", weight: 20 }
      ],
      grade: 78,
      feedback: "Good research but needs stronger thesis statement. Late submission penalty applied.",
      peerReviews: [
        { reviewer: "Mike T.", rating: 3.5, comment: "Needs more focus on economic impacts" }
      ],
      analytics: {
        avgScore: 75,
        timeSpent: "6 hours",
        submissionTrend: "Late"
      }
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [draftSaved, setDraftSaved] = useState(false);
  const [peerReviews, setPeerReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('instructions');
  const [comment, setComment] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const fileInputRef = React.createRef();

  useEffect(() => {
    // Select first assignment by default
    if (assignments.length > 0 && !selectedAssignment) {
      setSelectedAssignment(assignments[0]);
    }
    
    // Load peer reviews for selected assignment
    if (selectedAssignment) {
      setPeerReviews(selectedAssignment.peerReviews || []);
      setAnalyticsData(selectedAssignment.analytics);
    }
  }, [assignments, selectedAssignment]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles(files);
    
    // Auto-save draft
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  // Submit assignment
  const handleSubmit = () => {
    if (newFiles.length === 0) return;
    
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === selectedAssignment.id) {
        return {
          ...assignment,
          status: "submitted",
          submissionDate: new Date().toISOString(),
          submissionFiles: newFiles.map(file => file.name)
        };
      }
      return assignment;
    });
    
    setAssignments(updatedAssignments);
    setSelectedAssignment(updatedAssignments.find(a => a.id === selectedAssignment.id));
    setNewFiles([]);
  };

  // Add annotation to document
  const addAnnotation = (e) => {
    if (!comment.trim()) return;
    
    const newAnnotation = {
      id: annotations.length + 1,
      text: comment,
      position: { x: e.clientX, y: e.clientY },
      resolved: false
    };
    
    setAnnotations([...annotations, newAnnotation]);
    setComment('');
  };

  // Calculate days remaining
  const daysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = due - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'submitted':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
          <FiCheck className="mr-1" /> Submitted
        </span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center">
          <FiClock className="mr-1" /> Pending
        </span>;
      case 'late':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
          <FiAlertCircle className="mr-1" /> Late
        </span>;
      case 'graded':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
          <FiCheck className="mr-1" /> Graded
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Unknown</span>;
    }
  };

  // Render plagiarism score badge
  const renderPlagiarismBadge = (score) => {
    if (score === null) return null;
    
    let color = 'green';
    if (score > 10) color = 'yellow';
    if (score > 20) color = 'red';
    
    return (
      <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-3 flex items-center`}>
        <div className="mr-3">
          <div className="text-sm font-medium text-gray-600">Similarity Score</div>
          <div className={`text-xl font-bold text-${color}-700`}>{score}%</div>
        </div>
        <div className="text-sm text-gray-500">
          {score < 10 
            ? "Excellent originality" 
            : score < 20 
              ? "Acceptable similarity" 
              : "Review needed"}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <p className="mt-2 text-gray-600">Manage your coursework submissions and deadlines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Assignments List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">All Assignments</h2>
                <div className="relative">
                  <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>All Courses</option>
                    <option>Mathematics 101</option>
                    <option>Chemistry 201</option>
                    <option>Modern History 301</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {assignments.map(assignment => (
                  <div 
                    key={assignment.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedAssignment?.id === assignment.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                      {renderStatusBadge(assignment.status)}
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-0.5 rounded mr-2">{assignment.course}</span>
                      <FiCalendar className="mr-1" />
                      <span>
                        Due: {new Date(assignment.dueDate).toLocaleDateString()} • 
                        <span className={daysRemaining(assignment.dueDate) < 3 ? 'text-red-500 font-medium' : 'text-gray-600'}>
                          {' '}{daysRemaining(assignment.dueDate)} days
                        </span>
                      </span>
                    </div>
                    
                    {assignment.grade !== null && (
                      <div className="mt-2 flex items-center">
                        <div className="bg-gray-200 w-full rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${assignment.grade}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{assignment.grade}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Notifications & Reminders */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <FiBell className="mr-2 text-indigo-600" /> Reminders
                </h3>
                <div className="space-y-3">
                  {assignments
                    .filter(a => a.status === 'pending' && daysRemaining(a.dueDate) <= 3)
                    .map(assignment => (
                      <div key={assignment.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="font-medium text-yellow-800">{assignment.title}</div>
                        <div className="text-sm text-yellow-700">
                          Due in {daysRemaining(assignment.dueDate)} days - {assignment.course}
                        </div>
                      </div>
                    ))
                  }
                  
                  {assignments.filter(a => a.status === 'pending' && daysRemaining(a.dueDate) <= 3).length === 0 && (
                    <p className="text-gray-500 text-sm">No upcoming deadlines. Great job!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Assignment Details */}
          {selectedAssignment && (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Assignment Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedAssignment.title}</h2>
                      <div className="mt-1 flex items-center">
                        <span className="bg-indigo-800 px-2 py-0.5 rounded mr-2 text-sm">
                          {selectedAssignment.course}
                        </span>
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" />
                          <span>
                            Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()} at {' '}
                            {new Date(selectedAssignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-white/20 p-2 rounded-full hover:bg-white/30">
                        <FiDownload className="w-5 h-5" />
                      </button>
                      <button className="bg-white/20 p-2 rounded-full hover:bg-white/30">
                        <FiRefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="bg-indigo-700 px-4 py-2 rounded-lg flex items-center">
                      <FiFile className="mr-2" />
                      <span>Max Marks: {selectedAssignment.maxMarks}</span>
                    </div>
                    {selectedAssignment.status === 'submitted' && (
                      <div className="bg-green-700 px-4 py-2 rounded-lg flex items-center">
                        <FiCheck className="mr-2" />
                        <span>Submitted: {new Date(selectedAssignment.submissionDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedAssignment.status === 'late' && (
                      <div className="bg-red-700 px-4 py-2 rounded-lg flex items-center">
                        <FiAlertCircle className="mr-2" />
                        <span>Late Submission</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex overflow-x-auto">
                    {['instructions', 'submission', 'feedback', 'peer-review', 'analytics'].map(tab => (
                      <button
                        key={tab}
                        className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                          activeTab === tab
                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Instructions Tab */}
                  {activeTab === 'instructions' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Assignment Details</h3>
                      <p className="text-gray-700 mb-6">{selectedAssignment.description}</p>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-800 mb-2">Instructions</h4>
                        <p className="text-gray-700">{selectedAssignment.instructions}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-800 mb-2">Attachments</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedAssignment.attachments.map((file, index) => (
                            <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                              <FiFile className="text-gray-600 mr-2" />
                              <span className="text-gray-700">{file}</span>
                              <button className="ml-2 text-indigo-600 hover:text-indigo-800">
                                <FiDownload className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Grading Rubric</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Criteria
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Weight
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedAssignment.rubric.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 text-sm text-gray-800">
                                    {item.criteria}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-800">
                                    {item.weight}%
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-gray-50 font-medium">
                                <td className="px-4 py-3 text-sm text-gray-800">Total</td>
                                <td className="px-4 py-3 text-sm text-gray-800">
                                  {selectedAssignment.rubric.reduce((sum, item) => sum + item.weight, 0)}%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submission Tab */}
                  {activeTab === 'submission' && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Submit Assignment</h3>
                        
                        {selectedAssignment.status === 'pending' ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <div className="text-center">
                              <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                <FiUpload className="w-8 h-8 text-blue-600" />
                              </div>
                              <p className="text-gray-700 mb-4">
                                Submit your completed assignment files before the deadline
                              </p>
                              
                              <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                multiple
                                className="hidden"
                              />
                              
                              <button
                                onClick={() => fileInputRef.current.click()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mb-4"
                              >
                                Select Files
                              </button>
                              
                              {draftSaved && (
                                <div className="text-green-600 mb-4 flex items-center justify-center">
                                  <FiCheck className="mr-2" /> Draft saved successfully
                                </div>
                              )}
                              
                              {newFiles.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-medium text-gray-800 mb-2">Selected Files</h4>
                                  <div className="space-y-2">
                                    {newFiles.map((file, index) => (
                                      <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                        <FiFile className="text-gray-600 mr-2" />
                                        <span className="text-gray-700">{file.name}</span>
                                        <span className="ml-2 text-xs text-gray-500">
                                          {(file.size / 1024).toFixed(1)} KB
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <button
                                    onClick={handleSubmit}
                                    className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                  >
                                    Submit Assignment
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div className="text-center">
                              <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                <FiCheck className="w-8 h-8 text-green-600" />
                              </div>
                              <h4 className="font-medium text-green-800 mb-2">Assignment Submitted</h4>
                              <p className="text-gray-700 mb-4">
                                Submitted on {new Date(selectedAssignment.submissionDate).toLocaleString()}
                              </p>
                              
                              <div className="mt-4">
                                <h4 className="font-medium text-gray-800 mb-2">Submitted Files</h4>
                                <div className="space-y-2">
                                  {selectedAssignment.submissionFiles.map((file, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                      <FiFile className="text-gray-600 mr-2" />
                                      <span className="text-gray-700">{file}</span>
                                      <button className="ml-2 text-indigo-600 hover:text-indigo-800">
                                        <FiDownload className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {selectedAssignment.status === 'late' && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <div className="flex items-center text-yellow-800">
                                    <FiAlertCircle className="mr-2" />
                                    <span>This assignment was submitted after the deadline</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Plagiarism Check */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                          <FiBarChart2 className="mr-2 text-indigo-600" /> Academic Integrity
                        </h3>
                        
                        {renderPlagiarismBadge(selectedAssignment.plagiarismScore)}
                        
                        <div className="mt-4 text-sm text-gray-600">
                          <p className="mb-2">
                            Your submission was checked against our database of academic sources and web content.
                            A similarity score above 25% may require review by your instructor.
                          </p>
                          <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                            <FiDownload className="mr-1" /> Download Full Plagiarism Report
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback Tab */}
                  {activeTab === 'feedback' && (
                    <div>
                      {selectedAssignment.feedback ? (
                        <>
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-800">Feedback & Grading</h3>
                              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-bold">
                                {selectedAssignment.grade}/{selectedAssignment.maxMarks}
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                              <h4 className="font-medium text-gray-800 mb-2">Instructor Comments</h4>
                              <p className="text-gray-700">{selectedAssignment.feedback}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-800 mb-3">Rubric Assessment</h4>
                              <div className="space-y-4">
                                {selectedAssignment.rubric.map((criteria, index) => (
                                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between mb-2">
                                      <span className="font-medium text-gray-800">{criteria.criteria}</span>
                                      <span className="text-indigo-600 font-medium">
                                        {Math.round((criteria.weight * selectedAssignment.grade) / 100)}/{criteria.weight}
                                      </span>
                                    </div>
                                    <div className="bg-gray-200 w-full rounded-full h-2">
                                      <div 
                                        className="bg-indigo-500 h-2 rounded-full" 
                                        style={{ width: `${(criteria.weight * selectedAssignment.grade) / 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-6">
                            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                              <FiEdit className="mr-2 text-indigo-600" /> Annotated Feedback
                            </h3>
                            
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 relative">
                              {/* Document preview area */}
                              <div className="absolute inset-0 bg-white p-4 overflow-auto">
                                <h4 className="font-bold mb-4">{selectedAssignment.title}</h4>
                                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                
                                {/* Annotation markers */}
                                {annotations.map(ann => (
                                  <div 
                                    key={ann.id}
                                    className="absolute w-3 h-3 bg-red-500 rounded-full"
                                    style={{ left: ann.position.x, top: ann.position.y }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Annotation comments */}
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-800 mb-2">Comments</h4>
                              <div className="space-y-3">
                                {annotations.map(ann => (
                                  <div key={ann.id} className="flex items-start">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                                      <div className="text-gray-700">{ann.text}</div>
                                    </div>
                                  </div>
                                ))}
                                
                                <div className="flex mt-4">
                                  <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <button 
                                    onClick={addAnnotation}
                                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No feedback yet</h3>
                          <p className="mt-1 text-gray-500">
                            Your assignment is still being graded. Check back later.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Peer Review Tab */}
                  {activeTab === 'peer-review' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Peer Reviews</h3>
                      
                      {peerReviews.length > 0 ? (
                        <div className="space-y-6">
                          {peerReviews.map((review, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-5">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-800">{review.reviewer}</h4>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(review.rating) 
                                          ? 'text-yellow-400' 
                                          : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                    <span className="ml-2 text-gray-600">{review.rating}/5</span>
                                  </div>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800">
                                  <FiMessageSquare className="w-5 h-5" />
                                </button>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                          
                          <div className="mt-8">
                            <h4 className="font-medium text-gray-800 mb-3">Review Other Submissions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                                  <div>
                                    <h5 className="font-medium text-gray-800">Sarah K.</h5>
                                    <div className="text-sm text-gray-600">Mathematics 101</div>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">
                                  Assignment: Linear Algebra Problem Set
                                </p>
                                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                  Review Submission
                                </button>
                              </div>
                              
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                                  <div>
                                    <h5 className="font-medium text-gray-800">Mike T.</h5>
                                    <div className="text-sm text-gray-600">Modern History 301</div>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">
                                  Assignment: History Essay - Cold War
                                </p>
                                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                  Review Submission
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <FiUsers className="w-8 h-8 text-gray-600" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">No peer reviews yet</h3>
                          <p className="mt-1 text-gray-500">
                            Peer reviews will be available after the assignment deadline.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && (
                    <div>
                      {analyticsData ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                              <div className="text-2xl font-bold text-indigo-600 mb-2">
                                {selectedAssignment.grade}%
                              </div>
                              <div className="text-gray-600">Your Score</div>
                            </div>
                            
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                              <div className="text-2xl font-bold text-indigo-600 mb-2">
                                {analyticsData.avgScore}%
                              </div>
                              <div className="text-gray-600">Class Average</div>
                            </div>
                            
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                              <div className="text-2xl font-bold text-indigo-600 mb-2">
                                {analyticsData.timeSpent}
                              </div>
                              <div className="text-gray-600">Time Spent</div>
                            </div>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <h4 className="font-medium text-gray-800 mb-4">Performance Distribution</h4>
                            <div className="h-64 flex items-end justify-between">
                              {[90, 75, 60, 45, 30].map((score, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <div 
                                    className="w-12 bg-indigo-500 rounded-t-lg"
                                    style={{ height: `${score * 0.7}%` }}
                                  ></div>
                                  <div className="mt-2 text-sm text-gray-600">{index * 10 + 60}%</div>
                                  <div className="text-xs text-gray-500 mt-1">{score} students</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-medium text-gray-800 mb-4">Submission Timing</h4>
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                    {analyticsData.submissionTrend}
                                  </div>
                                </div>
                                <div className="text-gray-600">
                                  {analyticsData.submissionTrend === 'Early' 
                                    ? 'You submitted this assignment before most classmates' 
                                    : 'You submitted this assignment after the deadline'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-medium text-gray-800 mb-4">Rubric Comparison</h4>
                              <div className="space-y-3">
                                {selectedAssignment.rubric.map((criteria, index) => (
                                  <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-gray-700">{criteria.criteria}</span>
                                      <span className="text-gray-700">
                                        {Math.round((criteria.weight * selectedAssignment.grade) / 100)}/
                                        {criteria.weight}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="bg-gray-200 w-full rounded-full h-2">
                                        <div 
                                          className="bg-indigo-500 h-2 rounded-full" 
                                          style={{ width: `${(criteria.weight * selectedAssignment.grade) / 100}%` }}
                                        ></div>
                                      </div>
                                      <div className="ml-2 text-xs text-gray-500">
                                        {Math.round((criteria.weight * analyticsData.avgScore) / 100)} avg
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">Analytics not available</h3>
                          <p className="mt-1 text-gray-500">
                            Assignment analytics will be available after grading is complete.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;