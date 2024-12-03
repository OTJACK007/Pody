import React from 'react';
import { Book } from 'lucide-react';

const KnowledgeLibrary = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Knowledge Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <Book className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Your Library</h3>
          <p className="text-gray-400">Access your saved podcast summaries and notes</p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeLibrary;