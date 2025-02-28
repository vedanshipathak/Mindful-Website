import React, { useState } from 'react';
import { format } from 'date-fns';
import { useMood } from '../contexts/MoodContext';
import { SmilePlus, Smile, Meh, Frown, Frown as FrownPlus, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoodTracker: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState<'verySad' | 'sad' | 'neutral' | 'happy' | 'veryHappy' | null>(null);
  const { addMoodEntry, moodEntries, getMoodStats } = useMood();
  const [activeTab, setActiveTab] = useState<'entry' | 'history' | 'stats'>('entry');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    addMoodEntry({
      date: new Date(),
      mood: selectedMood,
      notes
    });

    // Reset form
    setSelectedMood(null);
    setNotes('');
  };

  const moodIcons = {
    veryHappy: <SmilePlus className="h-12 w-12 text-green-500" />,
    happy: <Smile className="h-12 w-12 text-green-400" />,
    neutral: <Meh className="h-12 w-12 text-yellow-400" />,
    sad: <Frown className="h-12 w-12 text-orange-400" />,
    verySad: <FrownPlus className="h-12 w-12 text-red-500" />
  };

  const moodLabels = {
    veryHappy: 'Very Happy',
    happy: 'Happy',
    neutral: 'Neutral',
    sad: 'Sad',
    verySad: 'Very Sad'
  };

  const moodColors = {
    veryHappy: 'bg-green-500',
    happy: 'bg-green-400',
    neutral: 'bg-yellow-400',
    sad: 'bg-orange-400',
    verySad: 'bg-red-500'
  };

  const { moodCounts, recentTrend } = getMoodStats();

  // Prepare data for bar chart
  const barChartData = {
    labels: Object.keys(moodCounts).map(mood => moodLabels[mood as keyof typeof moodLabels]),
    datasets: [
      {
        label: 'Mood Distribution',
        data: Object.values(moodCounts),
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)', // verySad - red
          'rgba(249, 115, 22, 0.7)', // sad - orange
          'rgba(234, 179, 8, 0.7)',  // neutral - yellow
          'rgba(74, 222, 128, 0.7)', // happy - light green
          'rgba(34, 197, 94, 0.7)'   // veryHappy - green
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(249, 115, 22)',
          'rgb(234, 179, 8)',
          'rgb(74, 222, 128)',
          'rgb(34, 197, 94)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for line chart (last 7 entries)
  const recentEntries = [...moodEntries]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(-7);

  const moodValues = {
    verySad: 1,
    sad: 2,
    neutral: 3,
    happy: 4,
    veryHappy: 5
  };

  const lineChartData = {
    labels: recentEntries.map(entry => format(entry.date, 'MMM d')),
    datasets: [
      {
        label: 'Mood Trend',
        data: recentEntries.map(entry => moodValues[entry.mood]),
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1
      }
    ]
  };

  const lineChartOptions = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: function(value: any) {
            const moodLabelsReverse: Record<number, string> = {
              1: 'Very Sad',
              2: 'Sad',
              3: 'Neutral',
              4: 'Happy',
              5: 'Very Happy'
            };
            return moodLabelsReverse[value as number];
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mood Tracker</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('entry')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'entry' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Log Mood
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'history' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'stats' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Stats
          </button>
        </div>
      </div>

      {activeTab === 'entry' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How are you feeling today?
            </label>
            <div className="flex justify-between items-center">
              {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map(mood => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    selectedMood === mood 
                      ? 'bg-indigo-100 ring-2 ring-indigo-500 scale-110' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {moodIcons[mood]}
                  <span className="mt-2 text-sm font-medium text-gray-700">{moodLabels[mood]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="What's contributing to your mood today?"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedMood}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Mood
          </button>
        </form>
      )}

      {activeTab === 'history' && (
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Recent Mood Entries</h3>
          </div>
          
          {moodEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No mood entries yet. Start tracking your mood!</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {[...moodEntries]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map(entry => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${moodColors[entry.mood]} mr-3`}>
                          {moodIcons[entry.mood]}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{moodLabels[entry.mood]}</h4>
                          <p className="text-sm text-gray-500">
                            {format(entry.date, 'MMMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded-md">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              {recentTrend === 'improving' ? (
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              ) : recentTrend === 'declining' ? (
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              ) : (
                <Minus className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <h3 className="text-lg font-medium text-gray-800">
                Recent Trend: 
                <span className={`ml-2 ${
                  recentTrend === 'improving' 
                    ? 'text-green-500' 
                    : recentTrend === 'declining' 
                      ? 'text-red-500' 
                      : 'text-yellow-500'
                }`}>
                  {recentTrend === 'improving' 
                    ? 'Improving' 
                    : recentTrend === 'declining' 
                      ? 'Declining' 
                      : 'Stable'}
                </span>
              </h3>
            </div>

            {moodEntries.length < 2 ? (
              <p className="text-gray-500 mb-8">Log more moods to see your trend over time.</p>
            ) : (
              <div className="h-64 mb-8">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Mood Distribution</h3>
            {moodEntries.length === 0 ? (
              <p className="text-gray-500">No data available yet.</p>
            ) : (
              <div className="h-64">
                <Bar data={barChartData} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;