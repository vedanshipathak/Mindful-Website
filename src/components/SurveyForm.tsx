import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { SurveyResponse } from '../types';

const SurveyForm: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const { getSurvey, submitSurveyResult } = useSurvey();
  
  const survey = getSurvey(surveyId || '');
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');

  if (!survey) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-5 w-5 mr-2" />
          <h2 className="text-xl font-semibold">Survey Not Found</h2>
        </div>
        <p className="text-gray-600 mb-4">The survey you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];

  const handleScaleResponse = (value: number) => {
    const existingResponseIndex = responses.findIndex(
      r => r.questionId === currentQuestion.id
    );

    const newResponse: SurveyResponse = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      answer: value
    };

    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, newResponse]);
    }

    // Move to next question or submit if last question
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleMultipleChoiceResponse = (option: string) => {
    const existingResponseIndex = responses.findIndex(
      r => r.questionId === currentQuestion.id
    );

    const newResponse: SurveyResponse = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      answer: option
    };

    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, newResponse]);
    }

    // Move to next question or submit if last question
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleTextResponse = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const textAnswer = formData.get('textAnswer') as string;

    if (!textAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }

    const existingResponseIndex = responses.findIndex(
      r => r.questionId === currentQuestion.id
    );

    const newResponse: SurveyResponse = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      answer: textAnswer
    };

    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, newResponse]);
    }

    // Move to next question or submit if last question
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setError('');
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    if (responses.length < survey.questions.length) {
      setError('Please answer all questions');
      return;
    }

    submitSurveyResult(survey.id, responses);
    navigate('/dashboard', { state: { surveyCompleted: true } });
  };

  const getCurrentResponseValue = () => {
    const response = responses.find(r => r.questionId === currentQuestion.id);
    return response ? response.answer : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-500 hover:text-gray-700 mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">{survey.title}</h2>
      </div>
      
      <p className="text-gray-600 mb-6">{survey.description}</p>

      <div className="mb-4 bg-gray-100 h-2 rounded-full">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / survey.questions.length) * 100}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">
        Question {currentQuestionIndex + 1} of {survey.questions.length}
      </p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.text}</h3>

        {currentQuestion.type === 'scale' && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span>{currentQuestion.minLabel || 'Not at all'}</span>
              <span>{currentQuestion.maxLabel || 'Very much'}</span>
            </div>
            <div className="flex justify-between">
              {[0, 1, 2, 3].map(value => (
                <button
                  key={value}
                  onClick={() => handleScaleResponse(value)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                    getCurrentResponseValue() === value
                      ? 'bg-indigo-600 text-white scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
        )}

        {currentQuestion.type === 'multipleChoice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <button
                key={option}
                onClick={() => handleMultipleChoiceResponse(option)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  getCurrentResponseValue() === option
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'text' && (
          <form onSubmit={handleTextResponse}>
            <textarea
              name="textAnswer"
              defaultValue={getCurrentResponseValue() as string || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              placeholder="Type your answer here..."
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {currentQuestionIndex < survey.questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>

      {currentQuestion.type !== 'text' && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {/* For scale and multipleChoice, the next/submit happens automatically on selection */}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;