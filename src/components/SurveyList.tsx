import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { ClipboardCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const SurveyList: React.FC = () => {
  const { surveys, getLatestSurveyResult } = useSurvey();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <ClipboardCheck className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Mental Health Assessments</h2>
      </div>

      <p className="text-gray-600 mb-6">
        These standardized assessments can help you track your mental health over time. 
        Your responses are private and stored only on your device.
      </p>

      <div className="space-y-4">
        {surveys.map(survey => {
          const latestResult = getLatestSurveyResult(survey.id);
          
          return (
            <div key={survey.id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{survey.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{survey.description}</p>
                  
                  {latestResult && (
                    <div className="flex items-center mt-3 text-sm text-indigo-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Last completed: {format(latestResult.date, 'MMMM d, yyyy')}</span>
                    </div>
                  )}
                </div>
                
                <Link 
                  to={`/survey/${survey.id}`} 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {latestResult ? 'Take Again' : 'Start'} 
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurveyList;