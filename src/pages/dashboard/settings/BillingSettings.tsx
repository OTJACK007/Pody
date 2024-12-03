import React, { useState } from 'react';
import { CreditCard, Clock, Receipt, Plus } from 'lucide-react';
import { Card, CardBody, Button } from "@nextui-org/react";
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import AddPaymentModal from './billing/AddPaymentModal';
import UpgradePlanModal from './billing/UpgradePlanModal';

const BillingSettings = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPayment = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      icon: 'https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png'
    },
    {
      id: 2,
      type: 'paypal',
      email: 'john@example.com',
      icon: 'https://static.wixstatic.com/media/c67dd6_ba6512237a194a9a9297eeeb9219122e~mv2.png'
    },
    {
      id: 3,
      type: 'crypto',
      name: 'MoonPay',
      icon: 'https://static.wixstatic.com/media/c67dd6_8dfcffeaa9b34dab888e64ceee0531f0~mv2.png'
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: 'Mar 1, 2024',
      amount: '$5.00',
      status: 'Paid',
      description: 'Monthly Subscription'
    },
    {
      id: 2,
      date: 'Feb 1, 2024',
      amount: '$5.00',
      status: 'Paid',
      description: 'Monthly Subscription'
    }
  ];

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<CreditCard className="w-6 h-6 text-primary" />}
        title="Billing"
        description="Manage your subscription and payment methods"
      />
      
      <div className="space-y-6">
        {/* Current Plan */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                <p className="text-gray-400">You are currently on the Basic plan</p>
              </div>
              <Button
                className="bg-secondary text-black font-medium hover:bg-secondary/90"
                onClick={() => setShowUpgradeModal(true)}
              >
                Upgrade Plan
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-white">Next billing date</p>
                  <p className="text-sm text-gray-400">April 1, 2024</p>
                </div>
              </div>
              <Button
                color="danger"
                variant="flat"
                size="sm"
              >
                Cancel Subscription
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
                <p className="text-gray-400">Manage your payment methods</p>
              </div>
              <div className="flex gap-2">
                <Button
                  startContent={<img src="https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png" alt="Stripe" className="w-4 h-4" />}
                  className="bg-gray-700 text-white hover:bg-gray-600"
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
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-600/50 rounded-lg">
                      <img 
                        src={method.icon}
                        alt={method.type}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      {method.type === 'card' && (
                        <>
                          <p className="text-white">•••• {method.last4}</p>
                          <p className="text-sm text-gray-400">Expires {method.expiry}</p>
                        </>
                      )}
                      {method.type === 'paypal' && (
                        <>
                          <p className="text-white">PayPal</p>
                          <p className="text-sm text-gray-400">{method.email}</p>
                        </>
                      )}
                      {method.type === 'crypto' && (
                        <>
                          <p className="text-white">MoonPay</p>
                          <p className="text-sm text-gray-400">Crypto Payment</p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Billing History */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Billing History</h3>
                <p className="text-gray-400">View your billing history</p>
              </div>
              <Button
                startContent={<Receipt className="w-4 h-4" />}
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Download All
              </Button>
            </div>

            <div className="space-y-4">
              {billingHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div>
                    <p className="text-white">{item.description}</p>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white">{item.amount}</span>
                    <Button
                      size="sm"
                      className="bg-gray-600 text-white hover:bg-gray-500"
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