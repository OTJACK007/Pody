import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, Receipt, Plus } from 'lucide-react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import AddPaymentModal from './billing/AddPaymentModal';
import UpgradePlanModal from './billing/UpgradePlanModal';
import type { BillingSettings as BillingSettingsType } from '../../../lib/firestore/collections/settings';

const BillingSettings = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { billing, updateBilling } = useSettings();
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
    if (billing) {
      setSettings(billing);
    }
  }, [billing]);

  const handleAddPayment = async (data: any) => {
    setIsLoading(true);
    try {
      const newPaymentMethod = {
        id: Date.now().toString(),
        type: data.method,
        isDefault: settings.paymentMethods.length === 0,
        details: {
          last4: data.data?.cardNumber?.slice(-4),
          expiry: data.data?.expiry,
          email: data.data?.email,
          name: data.data?.cardName
        },
        provider: {
          name: data.method === 'card' ? 'Stripe' : data.method === 'paypal' ? 'PayPal' : 'MoonPay',
          icon: data.method === 'card' 
            ? 'https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png'
            : data.method === 'paypal'
              ? 'https://static.wixstatic.com/media/c67dd6_ba6512237a194a9a9297eeeb9219122e~mv2.png'
              : 'https://static.wixstatic.com/media/c67dd6_8dfcffeaa9b34dab888e64ceee0531f0~mv2.png'
        }
      };

      const updatedSettings = {
        ...settings,
        paymentMethods: [...settings.paymentMethods, newPaymentMethod]
      };

      await updateBilling(updatedSettings);
      setSettings(updatedSettings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePaymentMethod = async (id: string) => {
    try {
      const updatedSettings = {
        ...settings,
        paymentMethods: settings.paymentMethods.filter(method => method.id !== id)
      };

      await updateBilling(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error removing payment method:', error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const updatedSettings = {
        ...settings,
        subscription: {
          ...settings.subscription,
          status: 'cancelled' as const
        }
      };

      await updateBilling(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<CreditCard className="w-6 h-6 text-[#ff3366]" />}
        title="Billing"
        description="Manage your subscription and payment methods"
      />
      
      <div className="space-y-6">
        {/* Current Plan */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Current Plan</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  You are currently on the Basic plan
                </p>
              </div>
              <Button
                className="bg-secondary text-black font-medium hover:bg-secondary/90"
                onClick={() => setShowUpgradeModal(true)}
              >
                Upgrade Plan
              </Button>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Next billing date
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{new Date(settings.subscription.nextBillingDate).toLocaleDateString()}</p>
                </div>
              </div>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onClick={handleCancelSubscription}
                isDisabled={settings.subscription.status === 'cancelled'}
              >
                Cancel Subscription
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Payment Methods */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Payment Methods</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Manage your payment methods
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  startContent={<img src="https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png" alt="Stripe" className="w-4 h-4" />}
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Pay with Stripe
                </Button>
                <Button
                  startContent={<Plus className="w-4 h-4" />}
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => setShowAddCardModal(true)}
                >
                  Add Payment Method
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {settings.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200'
                    }`}>
                      <img 
                        src={method.provider.icon}
                        alt={method.type}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      {method.type === 'card' && (
                        <>
                          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            •••• {method.details.last4}
                          </p>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Expires {method.details.expiry}</p>
                        </>
                      )}
                      {method.type === 'paypal' && (
                        <>
                          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            PayPal
                          </p>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>{method.details.email}</p>
                        </>
                      )}
                      {method.type === 'crypto' && (
                        <>
                          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            MoonPay
                          </p>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Crypto Payment</p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Billing History */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Billing History</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  View your billing history
                </p>
              </div>
              <Button
                startContent={<Receipt className="w-4 h-4" />}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Download All
              </Button>
            </div>

            <div className="space-y-4">
              {settings.billingHistory.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                  }`}
                >
                  <div>
                    <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {item.description}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      ${item.amount.toFixed(2)} {item.currency}
                    </span>
                    <Button
                      size="sm"
                      className={`${
                        theme === 'dark'
                          ? 'bg-gray-600 text-white hover:bg-gray-500'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                      onClick={() => window.open(item.invoice_url, '_blank')}
                      isDisabled={!item.invoice_url}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <AddPaymentModal
          isOpen={showAddCardModal}
          onClose={() => setShowAddCardModal(false)}
          onSubmit={handleAddPayment}
        />

        <UpgradePlanModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </div>
    </div>
  );
};

export default BillingSettings;