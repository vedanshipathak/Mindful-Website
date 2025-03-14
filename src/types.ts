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
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface MoodEntry {
  id: string;
  mood: string;
  note?: string;
  date: string;
}

export interface MoodStats {
  moodCounts: Record<string, number>; // Example: { "Happy": 5, "Sad": 2 }
  moodTrends: { date: string; mood: string }[]; // Trend data for graphs
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
  moodStats: MoodStats | null;
  addMoodEntry: (entry: Omit<MoodEntry, "id">) => Promise<void>;
}


export interface SurveyContextType {
  surveys: Survey[];
  surveyResults: SurveyResult[];
  getSurvey: (id: string) => Survey | undefined;
  submitSurveyResult: (surveyId: string, responses: SurveyResponse[]) => void;
  getLatestSurveyResult: (surveyId: string) => SurveyResult | undefined;
}