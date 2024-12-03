import React from 'react';
import { CreditCard } from 'lucide-react';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const BillingSettings = () => {
  return (
    <div>
      <SettingsHeader
        icon={<CreditCard className="w-6 h-6 text-primary" />}
        title="Billing"
        description="Manage your subscription and payment methods"
      />
      
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
        {/* Billing settings content */}
        <p className="text-gray-400">Billing settings content will go here</p>
      </div>
    </div>
  );
};

export default BillingSettings;