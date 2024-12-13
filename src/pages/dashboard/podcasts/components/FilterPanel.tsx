import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface FilterPanelProps {
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterPanel = ({ onClose, onFilterChange }: FilterPanelProps) => {
  const { theme } = useTheme();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const categories = ['Technology', 'Business', 'Personal Growth', 'Entertainment', 'Education'];
  const ratings = [
    { value: '4', label: '4+ Stars', stars: 4 },
    { value: '3', label: '3+ Stars', stars: 3 },
    { value: 'all', label: 'All Ratings', stars: 0 }
  ];
  const durations = [
    { value: 'short', label: '0-30 min' },
    { value: 'medium', label: '30-60 min' },
    { value: 'long', label: '60+ min' },
    { value: 'all', label: 'All Durations' }
  ];

  useEffect(() => {
    onFilterChange({
      category: selectedCategories.length === 1 ? selectedCategories[0] : 'all',
      rating: selectedRating,
      duration: selectedDuration
    });
  }, [selectedCategories, selectedRating, selectedDuration]);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 space-y-8`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Filter Podcasts</h3>
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className={`text-sm font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>Categories</h4>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategories(prev => 
                  prev.includes(category)
                    ? prev.filter(c => c !== category)
                    : [...prev, category]
                );
              }}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className={`text-sm font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>Rating</h4>
        <div className="space-y-2">
          {ratings.map(({ value, label, stars }) => (
            <button
              key={value}
              onClick={() => setSelectedRating(value)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                selectedRating === value
                  ? 'bg-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{label}</span>
              {stars > 0 && (
                <div className="flex items-center gap-1">
                  {[...Array(stars)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        selectedRating === value ? 'text-white' : 'text-yellow-400'
                      } ${selectedRating === value ? 'fill-white' : 'fill-yellow-400'}`}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h4 className={`text-sm font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>Duration</h4>
        <div className="space-y-2">
          {durations.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedDuration(value)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedDuration === value
                  ? 'bg-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSelectedCategories([]);
          setSelectedRating('all');
          setSelectedDuration('all');
        }}
        className={`w-full py-3 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;