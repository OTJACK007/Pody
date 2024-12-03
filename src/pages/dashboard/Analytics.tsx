import React from 'react';
import { BarChart2 } from 'lucide-react';

const Analytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <BarChart2 className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Your Progress</h3>
        <p className="text-gray-400">Track your learning analytics and insights</p>
      </div>
    </div>
  );
};

export default Analytics;