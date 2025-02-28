import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { MoodEntry, MoodContextType } from '../types';

const MoodContext = createContext<MoodContextType | undefined>(undefined);

interface MoodProviderProps {
  children: ReactNode;
}

export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mood entries from localStorage on mount
  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        // Convert string dates back to Date objects
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setMoodEntries(entriesWithDates);
      } catch (error) {
        console.error('Failed to parse mood entries:', error);
      }
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setMoodEntries(prev => [...prev, newEntry]);
  };

  const getMoodStats = () => {
    // Count occurrences of each mood
    const moodCounts: Record<string, number> = {
      verySad: 0,
      sad: 0,
      neutral: 0,
      happy: 0,
      veryHappy: 0
    };

    moodEntries.forEach(entry => {
      moodCounts[entry.mood]++;
    });

    // Calculate recent trend (last 7 entries or fewer)
    const recentEntries = [...moodEntries]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 7);

    if (recentEntries.length < 2) {
      return { moodCounts, recentTrend: 'stable' as const };
    }

    // Assign numerical values to moods
    const moodValues = {
      verySad: 1,
      sad: 2,
      neutral: 3,
      happy: 4,
      veryHappy: 5
    };

    // Calculate average mood score for first half and second half of recent entries
    const midpoint = Math.floor(recentEntries.length / 2);
    const firstHalf = recentEntries.slice(midpoint);
    const secondHalf = recentEntries.slice(0, midpoint);

    const firstHalfAvg = firstHalf.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / secondHalf.length;

    let recentTrend: 'improving' | 'declining' | 'stable';
    
    if (secondHalfAvg - firstHalfAvg > 0.5) {
      recentTrend = 'improving';
    } else if (firstHalfAvg - secondHalfAvg > 0.5) {
      recentTrend = 'declining';
    } else {
      recentTrend = 'stable';
    }

    return { moodCounts, recentTrend };
  };

  const value = {
    moodEntries,
    addMoodEntry,
    getMoodStats
  };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};