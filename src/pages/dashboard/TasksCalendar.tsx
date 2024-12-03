import React from 'react';
import { Calendar } from 'lucide-react';

const TasksCalendar = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Tasks & Calendar</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <Calendar className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Your Schedule</h3>
        <p className="text-gray-400">Manage your learning schedule and tasks</p>
      </div>
    </div>
  );
};

export default TasksCalendar;