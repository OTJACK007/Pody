import React from 'react';
import { Target } from 'lucide-react';

const MyGoals = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">My Goals</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <Target className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Set Your Goals</h3>
        <p className="text-gray-400">Track your learning progress and achievements</p>
      </div>
    </div>
  );
};

export default MyGoals;