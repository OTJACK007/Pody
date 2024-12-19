import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Mail, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalBody>
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Check your email</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                We've sent password reset instructions to your email address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {!success && (
            <>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Reset Password
              </Button>
            </>
          )}
          {success && (
            <Button
              color="primary"
              onPress={onClose}
              className="w-full"
            >
              Done
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;