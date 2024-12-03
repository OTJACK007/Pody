import React from 'react';
import { AppWindow } from 'lucide-react';

const ConnectedApps = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Connected Apps</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <AppWindow className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Integrations</h3>
        <p className="text-gray-400">Manage your connected applications and services</p>
      </div>
    </div>
  );
};

export default ConnectedApps;