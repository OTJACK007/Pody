import React, { useState } from 'react';
import { Shield, Lock, Smartphone, QrCode, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card, CardBody, Input, Button, Switch, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const PrivacySettings = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'verify'>('phone');

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "danger";
    if (passwordStrength <= 50) return "warning";
    if (passwordStrength <= 75) return "primary";
    return "success";
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep('verify');
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowPhoneModal(false);
    setStep('phone');
    setPhoneNumber('');
    setVerificationCode('');
  };

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Shield className="w-6 h-6 text-primary" />}
        title="Privacy & Security"
        description="Control your privacy settings and security options"
      />
      
      <div className="space-y-6">
        {/* Password Settings */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Password & Authentication</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-sm text-gray-400">Update your account password</p>
                  </div>
                </div>
                <Button
                  className="bg-gray-700 text-white hover:bg-gray-600"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone Number Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security with SMS verification</p>
                  </div>
                </div>
                <Button
                  className="bg-gray-700 text-white hover:bg-gray-600"
                  onClick={() => setShowPhoneModal(true)}
                >
                  Setup
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Authenticator App</p>
                    <p className="text-sm text-gray-400">Use an authenticator app for 2FA</p>
                  </div>
                </div>
                <Button
                  className="bg-gray-700 text-white hover:bg-gray-600"
                  onClick={() => setShowQRModal(true)}
                >
                  Setup
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Show my profile to other users</span>
                <Switch defaultSelected color="success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Allow others to see my listening activity</span>
                <Switch defaultSelected color="success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Share my library with followers</span>
                <Switch color="success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Allow friend requests</span>
                <Switch defaultSelected color="success" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Security Log */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Security Log</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-white">Password changed</p>
                  <p className="text-sm text-gray-400">2 days ago • New York, USA</p>
                </div>
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-white">New device logged in</p>
                  <p className="text-sm text-gray-400">5 days ago • London, UK</p>
                </div>
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Password Change Modal */}
        <Modal 
          isOpen={showPasswordModal} 
          onClose={() => setShowPasswordModal(false)}
          classNames={{
            base: "bg-gray-800 text-white",
            closeButton: "text-white hover:bg-gray-700"
          }}
        >
          <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      endContent={
                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                          {showCurrentPassword ? 
                            <EyeOff className="w-4 h-4 text-gray-400" /> : 
                            <Eye className="w-4 h-4 text-gray-400" />
                          }
                        </button>
                      }
                      classNames={{
                        input: "bg-gray-700/50 text-white",
                        inputWrapper: "bg-gray-700/50 border-gray-600"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      endContent={
                        <button onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? 
                            <EyeOff className="w-4 h-4 text-gray-400" /> : 
                            <Eye className="w-4 h-4 text-gray-400" />
                          }
                        </button>
                      }
                      classNames={{
                        input: "bg-gray-700/50 text-white",
                        inputWrapper: "bg-gray-700/50 border-gray-600"
                      }}
                    />
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <Progress 
                        value={passwordStrength} 
                        color={getStrengthColor()}
                        className="h-1"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Password strength: {passwordStrength}%
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Confirm New Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    classNames={{
                      input: "bg-gray-700/50 text-white",
                      inputWrapper: "bg-gray-700/50 border-gray-600"
                    }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handlePasswordChange}
                isLoading={isLoading}
              >
                Change Password
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Phone Number Modal */}
        <Modal 
          isOpen={showPhoneModal} 
          onClose={() => {
            setShowPhoneModal(false);
            setStep('phone');
          }}
          classNames={{
            base: "bg-gray-800 text-white",
            closeButton: "text-white hover:bg-gray-700"
          }}
        >
          <ModalContent>
            <ModalHeader>Setup Phone Authentication</ModalHeader>
            <ModalBody>
              {step === 'phone' ? (
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Enter your phone number to receive verification codes when signing in.
                  </p>
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    classNames={{
                      input: "bg-gray-700/50 text-white",
                      inputWrapper: "bg-gray-700/50 border-gray-600"
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Enter the 6-digit code sent to your phone.
                  </p>
                  <Input
                    type="text"
                    label="Verification Code"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    classNames={{
                      input: "bg-gray-700/50 text-white",
                      inputWrapper: "bg-gray-700/50 border-gray-600"
                    }}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setShowPhoneModal(false);
                  setStep('phone');
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={step === 'phone' ? handlePhoneSubmit : handleVerifyCode}
                isLoading={isLoading}
              >
                {step === 'phone' ? 'Send Code' : 'Verify'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* QR Code Modal */}
        <Modal 
          isOpen={showQRModal} 
          onClose={() => setShowQRModal(false)}
          classNames={{
            base: "bg-gray-800 text-white",
            closeButton: "text-white hover:bg-gray-700"
          }}
        >
          <ModalContent>
            <ModalHeader>Setup Authenticator App</ModalHeader>
            <ModalBody>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/Pody:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Pody"
                    alt="QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  Scan this QR code with your authenticator app to enable two-factor authentication
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => setShowQRModal(false)}
              >
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default PrivacySettings;