import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Survey, SurveyResult, SurveyResponse, SurveyContextType } from '../types';

// Sample surveys
const defaultSurveys: Survey[] = [
  {
    id: 'phq9',
    title: 'PHQ-9 Depression Screening',
    description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    questions: [
      {
        id: 'phq9-1',
        text: 'Little interest or pleasure in doing things',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'phq9-2',
        text: 'Feeling down, depressed, or hopeless',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'phq9-3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'phq9-4',
        text: 'Feeling tired or having little energy',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'phq9-5',
        text: 'Poor appetite or overeating',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      }
    ]
  },
  {
    id: 'gad7',
    title: 'GAD-7 Anxiety Screening',
    description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    questions: [
      {
        id: 'gad7-1',
        text: 'Feeling nervous, anxious, or on edge',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'gad7-2',
        text: 'Not being able to stop or control worrying',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'gad7-3',
        text: 'Worrying too much about different things',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'gad7-4',
        text: 'Trouble relaxing',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      },
      {
        id: 'gad7-5',
        text: 'Being so restless that it is hard to sit still',
        type: 'scale',
        minLabel: 'Not at all',
        maxLabel: 'Nearly every day'
      }
    ]
  }
];

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [surveys] = useState<Survey[]>(defaultSurveys);
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);

  // Load survey results from localStorage on mount
  useEffect(() => {
    const storedResults = localStorage.getItem('surveyResults');
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        // Convert string dates back to Date objects
        const resultsWithDates = parsedResults.map((result: any) => ({
          ...result,
          date: new Date(result.date)
        }));
        setSurveyResults(resultsWithDates);
      } catch (error) {
        console.error('Failed to parse survey results:', error);
      }
    }
  }, []);

  // Save survey results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('surveyResults', JSON.stringify(surveyResults));
  }, [surveyResults]);

  const getSurvey = (id: string) => {
    return surveys.find(survey => survey.id === id);
  };

  const submitSurveyResult = (surveyId: string, responses: SurveyResponse[]) => {
    const newResult: SurveyResult = {
      id: Date.now().toString(),
      surveyId,
      date: new Date(),
      responses
    };
    setSurveyResults(prev => [...prev, newResult]);
  };

  const getLatestSurveyResult = (surveyId: string) => {
    return surveyResults
      .filter(result => result.surveyId === surveyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  };

  const value = {
    surveys,
    surveyResults,
    getSurvey,
    submitSurveyResult,
    getLatestSurveyResult
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};