import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types';

// API URL for local backend
const API_URL = 'https://5fc4-34-91-72-103.ngrok-free.app/chat';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MindfulBot, your mental health support companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Function to send user message to backend API
  const sendMessageToAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to chatbot API');
      }

      const data = await response.json();
      return data.response || "I'm here to help, but I couldn't process your request.";
    } catch (error) {
      console.error('Error connecting to chatbot API:', error);
      return "Sorry, I couldn't connect to the chatbot.";
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
  
    // Check if the message is a greeting (hello, hi, etc.)
    if (['hello', 'hi', 'hey'].includes(input.toLowerCase())) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hello! How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      return;
    }
  
    // If it's not a greeting, send the message to the backend
    const botReply = await sendMessageToAPI(input);
  
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botReply,
      sender: 'bot',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">MindfulChat</h1>
            <p className="text-sm text-gray-500">Your mental health companion</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <Bot className="h-4 w-4 mr-1 text-indigo-600" />
                ) : (
                  <User className="h-4 w-4 mr-1 text-white" />
                )}
                <span className={`text-xs ${message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {message.sender === 'user' ? 'You' : 'MindfulBot'} •{' '}
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="block w-full px-4 py-3 text-gray-700 bg-white border-0 resize-none focus:ring-0 focus:outline-none rounded-lg"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={input.trim() === ''}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

