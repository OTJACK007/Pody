import React from 'react';
import { CheckCircle2, Users, Star } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const GuestProfile = () => {
  const { theme } = useTheme();
  
  const guest = {
    name: 'Elon Musk',
    role: 'CEO of Tesla & SpaceX',
    followers: '128.5M',
    rating: 4.9,
    bio: 'Entrepreneur, CEO of Tesla and SpaceX, founder of The Boring Company and X.ai. Focused on advancing sustainable energy, space exploration, and artificial intelligence.',
    verified: true
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className={`text-3xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{guest.name}</h1>
        {guest.verified && (
          <CheckCircle2 className="w-6 h-6 text-primary" />
        )}
      </div>
      <p className={`text-lg mb-2 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>{guest.role}</p>
      <p className={`mb-4 max-w-2xl ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>{guest.bio}</p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Users className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          <span className={`font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{guest.followers} followers</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" />
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
            {guest.rating} rating
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuestProfile;