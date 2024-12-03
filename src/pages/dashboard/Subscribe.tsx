import React from 'react';
import { Crown } from 'lucide-react';

const Subscribe = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Premium Subscription</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <Crown className="w-8 h-8 text-secondary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Upgrade to Premium</h3>
        <p className="text-gray-400">Get access to exclusive features and content</p>
      </div>
    </div>
  );
};

export default Subscribe;