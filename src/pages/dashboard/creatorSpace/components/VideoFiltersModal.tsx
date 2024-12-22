import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface VideoFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: { date: string; duration: string }) => void;
}

const VideoFiltersModal = ({ isOpen, onClose, onFiltersChange }: VideoFiltersModalProps) => {
  const { theme } = useTheme();
  const [dateFilter, setDateFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: '0-5 minutes' },
    { value: 'medium', label: '5-20 minutes' },
    { value: 'long', label: '20+ minutes' }
  ];

  const handleApplyFilters = () => {
    onFiltersChange({
      date: dateFilter,
      duration: durationFilter
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}>
      <div className={`relative w-full max-w-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl p-6`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className={`text-xl font-semibold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Filter Videos</h2>

        {/* Date Filter */}
        <div className="mb-6">
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Date</h4>
          <div className="space-y-2">
            {dateOptions.map(option => (
              <label 
                key={option.value}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  dateFilter === option.value
                    ? theme === 'dark'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-primary/10 text-primary'
                    : theme === 'dark'
                      ? 'hover:bg-gray-700/50'
                      : 'hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="dateFilter"
                  value={option.value}
                  checked={dateFilter === option.value}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="hidden"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  dateFilter === option.value
                    ? 'border-primary'
                    : theme === 'dark'
                      ? 'border-gray-600'
                      : 'border-gray-300'
                }`}>
                  {dateFilter === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="mb-6">
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Duration</h4>
          <div className="space-y-2">
            {durationOptions.map(option => (
              <label 
                key={option.value}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  durationFilter === option.value
                    ? theme === 'dark'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-primary/10 text-primary'
                    : theme === 'dark'
                      ? 'hover:bg-gray-700/50'
                      : 'hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="durationFilter"
                  value={option.value}
                  checked={durationFilter === option.value}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="hidden"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  durationFilter === option.value
                    ? 'border-primary'
                    : theme === 'dark'
                      ? 'border-gray-600'
                      : 'border-gray-300'
                }`}>
                  {durationFilter === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setDateFilter('all');
              setDurationFilter('all');
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoFiltersModal;