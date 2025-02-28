import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  ClipboardList,
  CheckCircle
} from 'lucide-react';
import { Link } from "react-router-dom";
import { Home } from "lucide-react";


import MoodTracker from './MoodTracker';
import SurveyList from './SurveyList';
import ChatInterface from './ChatInterface';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'mood' | 'surveys'>('chat');
  const location = useLocation();
  const [showSurveyNotification, setShowSurveyNotification] = useState(
    location.state?.surveyCompleted || false
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-full">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">MindfulChat Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Link 
  to="/" 
  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
>
  <Home className="h-5 w-5 mr-1" />
  <span>Back to Home</span>
</Link>

        </div>
      </header>

      {/* Notification */}
      {showSurveyNotification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-700">
                Survey completed successfully! Your responses have been saved.
              </p>
            </div>
            <button 
              onClick={() => setShowSurveyNotification(false)}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav className="px-2 py-4">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      activeTab === 'chat'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 mr-3" />
                    Chat with MindfulBot
                  </button>
                  <button
                    onClick={() => setActiveTab('mood')}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      activeTab === 'mood'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Mood Tracker
                  </button>
                  <button
                    onClick={() => setActiveTab('surveys')}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      activeTab === 'surveys'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ClipboardList className="h-5 w-5 mr-3" />
                    Assessments
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            {activeTab === 'chat' && <ChatInterface />}
            {activeTab === 'mood' && <MoodTracker />}
            {activeTab === 'surveys' && <SurveyList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;