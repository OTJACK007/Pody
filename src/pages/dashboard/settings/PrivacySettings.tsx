import React from 'react';
import { Shield } from 'lucide-react';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const PrivacySettings = () => {
  return (
    <div>
      <SettingsHeader
        icon={<Shield className="w-6 h-6 text-primary" />}
        title="Privacy & Security"
        description="Control your privacy settings and security options"
      />
      
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
        {/* Privacy settings content */}
        <p className="text-gray-400">Privacy settings content will go here</p>
      </div>
    </div>
  );
};

export default PrivacySettings;