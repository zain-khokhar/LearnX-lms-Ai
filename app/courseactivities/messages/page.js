// app/messages/page.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiSearch, FiPlus, FiPaperclip, FiSmile, FiMoreVertical } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Professor Smith",
      avatar: "PS",
      role: "Mathematics Instructor",
      unread: 3,
      lastMessage: "Your assignment was excellent!",
      lastTime: "10:45 AM",
      messages: [
        { id: 1, text: "Hello, I have a question about problem #3 in the assignment.", sender: "me", time: "9:30 AM" },
        { id: 2, text: "Sure, what do you need help with?", sender: "them", time: "9:32 AM" },
        { id: 3, text: "I'm stuck on the derivative part.", sender: "me", time: "9:35 AM" },
        { id: 4, text: "Try applying the chain rule first.", sender: "them", time: "9:40 AM" },
        { id: 5, text: "That worked! Thank you!", sender: "me", time: "9:45 AM" },
        { id: 6, text: "Your assignment was excellent!", sender: "them", time: "10:45 AM" },
      ]
    },
    {
      id: 2,
      name: "Study Group",
      avatar: "SG",
      role: "Computer Science 101",
      unread: 0,
      lastMessage: "Meeting moved to 4 PM",
      lastTime: "Yesterday",
      messages: [
        { id: 1, text: "Anyone finished the project?", sender: "Alex", time: "Yesterday" },
        { id: 2, text: "I'm still working on it", sender: "me", time: "Yesterday" },
        { id: 3, text: "Meeting moved to 4 PM", sender: "Sarah", time: "Yesterday" },
      ]
    },
    {
      id: 3,
      name: "Campus Announcements",
      avatar: "CA",
      role: "Official Channel",
      unread: 1,
      lastMessage: "New scholarship opportunities available",
      lastTime: "2 days ago",
      messages: [
        { id: 1, text: "Semester registration opens next week", sender: "admin", time: "1 week ago" },
        { id: 2, text: "New scholarship opportunities available", sender: "admin", time: "2 days ago" },
      ]
    },
    {
      id: 4,
      name: "Dr. Johnson",
      avatar: "DJ",
      role: "Physics Department",
      unread: 0,
      lastMessage: "Your lab report is due Friday",
      lastTime: "3 days ago",
      messages: []
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        const newMsg = {
          id: conv.messages.length + 1,
          text: newMessage,
          sender: "me",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastTime: "Just now",
          unread: 0
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const startNewConversation = () => {
    setSelectedConversation({
      id: Date.now(),
      name: "New Conversation",
      avatar: "NC",
      role: "Select participant",
      unread: 0,
      lastMessage: "",
      lastTime: "",
      messages: []
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation?.messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[85vh]">
        {/* Conversations sidebar */}
        <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col transition-all ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Messages</h1>
              <div className="flex space-x-3">
                <button 
                  onClick={startNewConversation}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                  aria-label="New conversation"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition" aria-label="More options">
                  <FiMoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FiSearch className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 bg-white/20 rounded-lg placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 flex items-center cursor-pointer hover:bg-indigo-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {conversation.avatar}
                  </div>
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.lastTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.role}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-indigo-500 rounded-full h-2 w-2"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                <p className="mt-4 text-gray-500">No conversations found</p>
                <button 
                  onClick={startNewConversation}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Start new conversation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 flex items-center bg-white">
                <button 
                  className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedConversation(null)}
                >
                  <IoIosArrowBack className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {selectedConversation.avatar}
                </div>
                
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-gray-800">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Call">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Video call">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100" aria-label="More options">
                    <FiMoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-indigo-50">
                {selectedConversation.messages.length > 0 ? (
                  <div className="space-y-4">
                    {selectedConversation.messages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 ${
                            message.sender === 'me' 
                              ? 'bg-indigo-500 text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <div 
                            className={`text-xs mt-1 ${
                              message.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">No messages yet</h3>
                    <p className="mt-2 text-gray-600">
                      Start the conversation by sending your first message
                    </p>
                  </div>
                )}
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center">
                  <button className="p-2 text-gray-500 hover:text-gray-700 mr-1">
                    <FiPaperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 mr-1">
                    <FiSmile className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  
                  <button
                    className="ml-3 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Your Messages</h3>
              <p className="mt-2 text-gray-600 max-w-md">
                Connect with instructors, classmates, and groups. Select a conversation or start a new one.
              </p>
              <button 
                onClick={startNewConversation}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition"
              >
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;