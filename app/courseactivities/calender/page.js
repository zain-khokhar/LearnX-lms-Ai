// components/Calendar.js
"use client";   
import React, { useState, useEffect } from 'react';

const Calendar = () => {
  // Event types with colors
  const eventTypes = {
    ASSIGNMENT: {
      name: 'Assignment due dates',
      color: '#EF4444',
      bg: '#FEE2E2'
    },
    QUIZ: {
      name: 'Quiz/Test dates',
      color: '#8B5CF6',
      bg: '#F3E8FF'
    },
    LECTURE: {
      name: 'Lecture/class schedules',
      color: '#3B82F6',
      bg: '#DBEAFE'
    },
    DISCUSSION: {
      name: 'Discussion deadlines',
      color: '#EC4899',
      bg: '#FCE7F3'
    },
    EVENT: {
      name: 'Events/announcements',
      color: '#22C55E',
      bg: '#DCFCE7'
    },
    COURSE: {
      name: 'Course start/end dates',
      color: '#4338CA',
      bg: '#E0E7FF'
    }
  };

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: 'Math Assignment 1',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
      startTime: '14:00',
      endTime: '15:00',
      type: 'ASSIGNMENT',
      course: 'Mathematics 101'
    },
    {
      id: 2,
      title: 'Chemistry Quiz',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      startTime: '10:00',
      endTime: '11:00',
      type: 'QUIZ',
      course: 'Chemistry 201'
    },
    {
      id: 3,
      title: 'Physics Lecture',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
      startTime: '09:00',
      endTime: '10:30',
      type: 'LECTURE',
      course: 'Physics 301'
    },
    {
      id: 4,
      title: 'Course Start',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      allDay: true,
      type: 'COURSE',
      course: 'All Courses'
    },
    {
      id: 5,
      title: 'Group Discussion',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      startTime: '13:00',
      endTime: '14:30',
      type: 'DISCUSSION',
      course: 'Computer Science 101'
    },
    {
      id: 6,
      title: 'Campus Event',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      startTime: '16:00',
      endTime: '18:00',
      type: 'EVENT',
      course: 'University'
    },
    {
      id: 7,
      title: 'Final Exam',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 30),
      allDay: true,
      type: 'QUIZ',
      course: 'Mathematics 101'
    },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [days, setDays] = useState([]);
  const [weekDays, setWeekDays] = useState([]);

  // Generate calendar days for month view
  useEffect(() => {
    const generateCalendarDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // First day of month
      const firstDay = new Date(year, month, 1);
      // Last day of month
      const lastDay = new Date(year, month + 1, 0);
      
      // Days from previous month to show
      const prevMonthDays = firstDay.getDay();
      
      // Days from next month to show
      const nextMonthDays = 6 - lastDay.getDay();
      
      const daysArray = [];
      
      // Previous month days
      for (let i = prevMonthDays - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        daysArray.push({
          date,
          isCurrentMonth: false,
          events: events.filter(e => 
            e.date.getDate() === date.getDate() && 
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
          )
        });
      }
      
      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        daysArray.push({
          date,
          isCurrentMonth: true,
          events: events.filter(e => 
            e.date.getDate() === date.getDate() && 
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
          )
        });
      }
      
      // Next month days
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(year, month + 1, i);
        daysArray.push({
          date,
          isCurrentMonth: false,
          events: events.filter(e => 
            e.date.getDate() === date.getDate() && 
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
          )
        });
      }
      
      setDays(daysArray);
    };

    // Generate week days for week view
    const generateWeekDays = () => {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      const weekDaysArray = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        
        weekDaysArray.push({
          date,
          events: events.filter(e => 
            e.date.getDate() === date.getDate() && 
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
          )
        });
      }
      
      setWeekDays(weekDaysArray);
    };

    if (view === 'month') {
      generateCalendarDays();
    } else if (view === 'week') {
      generateWeekDays();
    }
  }, [currentDate, events, view]);

  // Change month
  const changeMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + direction, 
      1
    ));
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  // Format day
  const formatDay = (date) => {
    return date.getDate();
  };

  // Format weekday
  const formatWeekday = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Close event detail
  const closeEventDetail = () => {
    setSelectedEvent(null);
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <h2 className="mx-4 text-xl font-semibold text-gray-800">
                {formatDate(currentDate)}
              </h2>
              
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={goToToday}
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Today
              </button>
            </div>
            
            <div className="flex">
              <button 
                onClick={() => setView('month')} 
                className={`px-4 py-2 rounded-l-lg ${view === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')} 
                className={`px-4 py-2 border-l border-r border-gray-300 ${view === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('day')} 
                className={`px-4 py-2 rounded-r-lg ${view === 'day' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Day
              </button>
            </div>
          </div>
          
          {/* Month View */}
          {view === 'month' && (
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 text-gray-600 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div 
                    key={index} 
                    className={`min-h-24 p-2 border border-gray-200 rounded-lg ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className={`text-right text-sm font-medium ${
                      isToday(day.date) ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto' : ''
                    }`}>
                      {formatDay(day.date)}
                    </div>
                    
                    <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                      {day.events.slice(0, 3).map(event => (
                        <div 
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="text-xs p-1 rounded cursor-pointer truncate"
                          style={{ 
                            backgroundColor: eventTypes[event.type].bg,
                            color: eventTypes[event.type].color,
                            borderLeft: `3px solid ${eventTypes[event.type].color}`
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {day.events.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{day.events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Week View */}
          {view === 'week' && (
            <div className="p-4">
              <div className="grid grid-cols-8 gap-1">
                <div className="text-center py-2"></div>
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center py-2">
                    <div className="text-gray-600 font-medium">
                      {formatWeekday(day.date)}
                    </div>
                    <div className={`text-sm ${
                      isToday(day.date) ? 'bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''
                    }`}>
                      {formatDay(day.date)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-8 gap-1">
                <div className="flex flex-col">
                  {Array.from({ length: 12 }).map((_, hour) => (
                    <div key={hour} className="h-16 text-xs text-gray-500 text-right pr-2 border-t border-gray-200">
                      {hour + 8}:00
                    </div>
                  ))}
                </div>
                
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="relative">
                    {Array.from({ length: 12 }).map((_, hour) => (
                      <div key={hour} className="h-16 border-t border-gray-200"></div>
                    ))}
                    
                    {day.events.map(event => {
                      if (event.allDay) return null;
                      
                      const startHour = parseInt(event.startTime.split(':')[0]);
                      const startMin = parseInt(event.startTime.split(':')[1]);
                      const endHour = parseInt(event.endTime.split(':')[0]);
                      const endMin = parseInt(event.endTime.split(':')[1]);
                      
                      const top = ((startHour - 8) * 60 + startMin) * (16 / 60);
                      const height = ((endHour - startHour) * 60 + (endMin - startMin)) * (16 / 60);
                      
                      return (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="absolute w-[95%] left-[2.5%] rounded px-2 py-1 text-xs cursor-pointer overflow-hidden"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            backgroundColor: eventTypes[event.type].bg,
                            color: eventTypes[event.type].color,
                            borderLeft: `3px solid ${eventTypes[event.type].color}`
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div>{event.startTime} - {event.endTime}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Day View */}
          {view === 'day' && (
            <div className="p-4">
              <div className="text-center text-lg font-semibold text-gray-800 mb-4">
                {new Intl.DateTimeFormat('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                }).format(currentDate)}
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  {Array.from({ length: 12 }).map((_, hour) => (
                    <div key={hour} className="h-16 text-sm text-gray-500 text-right pr-4 py-1">
                      {hour + 8}:00
                    </div>
                  ))}
                </div>
                
                <div className="col-span-10 relative">
                  {Array.from({ length: 12 }).map((_, hour) => (
                    <div key={hour} className="h-16 border-t border-gray-200"></div>
                  ))}
                  
                  {events
                    .filter(event => 
                      event.date.getDate() === currentDate.getDate() && 
                      event.date.getMonth() === currentDate.getMonth() &&
                      event.date.getFullYear() === currentDate.getFullYear()
                    )
                    .map(event => {
                      if (event.allDay) return null;
                      
                      const startHour = parseInt(event.startTime.split(':')[0]);
                      const startMin = parseInt(event.startTime.split(':')[1]);
                      const endHour = parseInt(event.endTime.split(':')[0]);
                      const endMin = parseInt(event.endTime.split(':')[1]);
                      
                      const top = ((startHour - 8) * 60 + startMin) * (16 / 60);
                      const height = ((endHour - startHour) * 60 + (endMin - startMin)) * (16 / 60);
                      
                      return (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="absolute w-[95%] left-0 rounded px-3 py-2 cursor-pointer"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            backgroundColor: eventTypes[event.type].bg,
                            color: eventTypes[event.type].color,
                            borderLeft: `3px solid ${eventTypes[event.type].color}`
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs">{event.startTime} - {event.endTime}</div>
                          <div className="text-xs mt-1">{event.course}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          
          {/* Event Legend */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Event Types</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(eventTypes).map(([key, type]) => (
                <div key={key} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-2" 
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div 
                className="h-2 rounded-t-xl"
                style={{ backgroundColor: eventTypes[selectedEvent.type].color }}
              ></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h3>
                    <div 
                      className="inline-block px-2 py-1 rounded-full text-xs mt-1"
                      style={{ 
                        backgroundColor: eventTypes[selectedEvent.type].bg,
                        color: eventTypes[selectedEvent.type].color
                      }}
                    >
                      {eventTypes[selectedEvent.type].name}
                    </div>
                  </div>
                  <button 
                    onClick={closeEventDetail}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex">
                    <div className="w-1/3 text-gray-600">Date:</div>
                    <div className="w-2/3 font-medium">
                      {new Intl.DateTimeFormat('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }).format(selectedEvent.date)}
                    </div>
                  </div>
                  
                  {!selectedEvent.allDay && (
                    <div className="flex">
                      <div className="w-1/3 text-gray-600">Time:</div>
                      <div className="w-2/3 font-medium">
                        {selectedEvent.startTime} - {selectedEvent.endTime}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex">
                    <div className="w-1/3 text-gray-600">Course:</div>
                    <div className="w-2/3 font-medium">
                      {selectedEvent.course}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Add to Google Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;