import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Heart, MessageCircle, Shield, Brain, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import fallbackImage from '../assets/freepik__background__69274.png';
const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const [imageSrc, setImageSrc] = useState(
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTVseHV3cmw1cmZoMWZka250dXYxaXlvNzV2d3gzNWg3ZGt0eTlrMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RT3S8fkHUxECJJpwvT/giphy.gif'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">MindfulChat</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={openLogin}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={openSignup}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
      <img 
        src={imageSrc} 
        alt="Meditation and Relaxation"
        onError={() => setImageSrc(fallbackImage)} // Switch to image if GIF fails
        className="absolute w-full h-full object-cover object-left translate-x-10 md:translate-x-0"
      />
      <div className="absolute inset-0 bg-indigo-900 bg-opacity-70"></div> {/* Overlay */}
    </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Your personal</span>
                <span className="block text-indigo-200">mental health companion</span>
              </h1>
              <p className="mt-3 text-base text-indigo-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                MindfulChat provides a safe space to express your thoughts and feelings. Our AI-powered chatbot offers support, coping strategies, and resources for your mental wellbeing.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <button
                  onClick={openSignup}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to care for your mental health
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              MindfulChat combines technology and compassion to provide support when you need it most.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">24/7 Support</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access supportive conversations anytime, anywhere. Our chatbot is always available to listen and respond.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Private & Secure</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your conversations are completely private. We prioritize your confidentiality and data security.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">CBT-Based</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our approach is grounded in psychological research and therapeutic techniques for effective support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our users say
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-800 font-bold">S</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Sarah K.</h3>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "MindfulChat has been a lifesaver during my exam stress. Having someone to talk to at 2 AM when anxiety hits has made a huge difference."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-800 font-bold">M</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Michael T.</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was skeptical at first, but the chatbot actually helped me identify thought patterns that were making my anxiety worse. Really impressed."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-800 font-bold">J</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Jamie L.</h3>
                  <p className="text-sm text-gray-500">Healthcare Worker</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who helps others all day, I needed a space for myself. MindfulChat gives me that outlet without judgment or expectations."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block">Try MindfulChat today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Join thousands of users who have found support, comfort, and guidance through our platform.
          </p>
          <button
            onClick={openSignup}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Sign up for free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            <p className="text-center text-base text-gray-500">
              &copy; 2025 MindfulChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      <AnimatePresence>
        {(showLogin || showSignup) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModals}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModals}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              {showLogin && <LoginForm />}
              {showSignup && <SignupForm onBackToLogin={() => { setShowSignup(false); setShowLogin(true); }} />}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;