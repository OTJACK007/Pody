import React, { useState, useEffect } from 'react';
import { Shield, Lock, Smartphone, QrCode, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card, CardBody, Input, Button, Switch, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import type { PrivacySettings as PrivacySettingsType } from '../../../lib/firestore/collections/settings';

const PrivacySettings = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const { currentUser } = useAuth();
  const { privacy, updatePrivacy } = useSettings();
  const [settings, setSettings] = useState<PrivacySettingsType>({
    password_authentication: {
      change_password: true,
      phone_number_authentication: {
        enabled: false,
        phone_number: '',
        verified: false
      },
      authenticator_app: {
        enabled: false,
        qr_code_url: '',
        last_used: new Date()
      }
    },
    privacy_settings: {
      show_profile: true,
      allow_listening_activity: false,
      share_library: true,
      allow_friend_requests: true
    },
    security_log: []
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const { theme } = useTheme();

  useEffect(() => {
    if (privacy) {
      setSettings(privacy);
    }
  }, [privacy]);

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
    if (!currentPassword) {
      alert('Please enter your current password');
      return;
    }
    
    if (!currentUser?.email) {
      alert('No user email found');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (passwordStrength < 75) {
      alert('Please choose a stronger password');
      return;
    }

    setIsLoading(true);
    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentUser?.email || '',
        password: currentPassword
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword
      });

      if (updateError) throw updateError;

      // Update privacy settings
      const updatedSettings = {
        ...settings,
        password_authentication: {
          ...settings.password_authentication,
          change_password: true
        }
      };
      
      await updatePrivacy(updatedSettings);
      
      setIsLoading(false);
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error instanceof Error ? error.message : 'Error changing password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    try {
      await updatePrivacy({
        ...settings,
        password_authentication: {
          ...settings.password_authentication,
          phone_number_authentication: {
            enabled: true,
            phone_number: phoneNumber,
            verified: false
          }
        }
      });
      
      setIsLoading(false);
      setStep('verify');
    } catch (error) {
      console.error('Error setting up phone authentication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      await updatePrivacy({
        ...settings,
        password_authentication: {
          ...settings.password_authentication,
          phone_number_authentication: {
            ...settings.password_authentication.phone_number_authentication,
            verified: true
          }
        }
      });
      
      setIsLoading(false);
      setShowPhoneModal(false);
      setStep('phone');
      setPhoneNumber('');
      setVerificationCode('');
    } catch (error) {
      console.error('Error verifying phone:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyToggle = async (key: keyof typeof settings.privacy_settings, value: boolean) => {
    try {
      const updatedSettings = {
        ...settings,
        privacy_settings: {
          ...settings.privacy_settings,
          [key]: value
        }
      };
      await updatePrivacy(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating privacy setting:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Shield className="w-6 h-6 text-[#ff3366]" />}
        title="Privacy & Security"
        description="Control your privacy settings and security options"
      />
      
      <div className="space-y-6">
        {/* Password Settings */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Password & Authentication</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Change Password</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Update your account password
                    </p>
                  </div>
                </div>
                <Button
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
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
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Phone Number Authentication</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Add an extra layer of security with SMS verification
                    </p>
                  </div>
                </div>
                <Button
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
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
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Authenticator App</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Use an authenticator app for 2FA
                    </p>
                  </div>
                </div>
                <Button
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => setShowQRModal(true)}
                >
                  Setup
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Privacy Settings */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Show my profile to other users
                </span>
                <Switch
                  isSelected={settings.privacy_settings.show_profile}
                  onValueChange={(value) => handlePrivacyToggle('show_profile', value)}
                  color="success"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Allow others to see my listening activity
                </span>
                <Switch
                  isSelected={settings.privacy_settings.allow_listening_activity}
                  onValueChange={(value) => handlePrivacyToggle('allow_listening_activity', value)}
                  color="success"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Share my library with followers
                </span>
                <Switch
                  isSelected={settings.privacy_settings.share_library}
                  onValueChange={(value) => handlePrivacyToggle('share_library', value)}
                  color="success"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Allow friend requests
                </span>
                <Switch
                  isSelected={settings.privacy_settings.allow_friend_requests}
                  onValueChange={(value) => handlePrivacyToggle('allow_friend_requests', value)}
                  color="success"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Security Log */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Security Log</h3>
            
            <div className="space-y-4">
              {settings.security_log.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                  }`}
                >
                  <div>
                    <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {log.event_type}
                    </p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {new Date(log.timestamp).toLocaleDateString()} • {log.location}
                    </p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Password Change Modal */}
        <Modal 
          isOpen={showPasswordModal} 
          onClose={() => setShowPasswordModal(false)}
          classNames={{
            base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
            closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
          }}
        >
          <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Current Password</label>
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
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>New Password</label>
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
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
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
                      <p className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Password strength: {passwordStrength}%
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Confirm New Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
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
            base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
            closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
          }}
        >
          <ModalContent>
            <ModalHeader>Setup Phone Authentication</ModalHeader>
            <ModalBody>
              {step === 'phone' ? (
                <div className="space-y-4">
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Enter your phone number to receive verification codes when signing in.
                  </p>
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Enter the 6-digit code sent to your phone.
                  </p>
                  <Input
                    type="text"
                    label="Verification Code"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
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
            base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
            closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
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
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
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