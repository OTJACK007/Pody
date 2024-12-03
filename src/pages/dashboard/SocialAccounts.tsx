import React from 'react';
import { Share2 } from 'lucide-react';

const SocialAccounts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Social Accounts</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <Share2 className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Your Networks</h3>
        <p className="text-gray-400">Connect and manage your social media accounts</p>
      </div>
    </div>
  );
};

export default SocialAccounts;