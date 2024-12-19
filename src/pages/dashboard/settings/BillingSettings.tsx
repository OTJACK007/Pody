import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, Receipt } from 'lucide-react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { getBillingSettings, updateBillingSettings, addPaymentMethod, removePaymentMethod } from '../../../services/settings/billingService';
import type { BillingSettings as BillingSettingsType } from '../../../types/settings';

const BillingSettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { billing, updateBilling } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<BillingSettingsType>({
    subscription: {
      plan: 'basic',
      status: 'active',
      nextBillingDate: new Date(),
      amount: 5,
      currency: 'USD'
    },
    paymentMethods: [],
    billingHistory: []
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (currentUser?.id) {
        const data = await getBillingSettings(currentUser.id);
        if (data) {
          setSettings(data);
        }
      }
    };
    loadSettings();
  }, [currentUser?.id]);

  const handleSave = async () => {
    if (!currentUser?.id) return;
    
    setIsLoading(true);
    try {
      await updateBillingSettings(currentUser.id, settings);
      await updateBilling(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du composant ...
};

export default BillingSettings;