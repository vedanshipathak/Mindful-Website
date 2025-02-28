export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'verySad' | 'sad' | 'neutral' | 'happy' | 'veryHappy';
  notes: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'scale' | 'multipleChoice' | 'text';
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
}

export interface SurveyResponse {
  id: string;
  questionId: string;
  answer: string | number;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

export interface SurveyResult {
  id: string;
  surveyId: string;
  date: Date;
  responses: SurveyResponse[];
}

export interface MoodContextType {
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  getMoodStats: () => {
    moodCounts: Record<string, number>;
    recentTrend: 'improving' | 'declining' | 'stable';
  };
}

export interface SurveyContextType {
  surveys: Survey[];
  surveyResults: SurveyResult[];
  getSurvey: (id: string) => Survey | undefined;
  submitSurveyResult: (surveyId: string, responses: SurveyResponse[]) => void;
  getLatestSurveyResult: (surveyId: string) => SurveyResult | undefined;
}