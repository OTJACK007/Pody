import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Progress } from "@nextui-org/react";
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 75) {
      setError('Please choose a stronger password');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      navigate('/login', { replace: true });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`max-w-md w-full ${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Reset Your Password</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type={showPassword ? "text" : "password"}
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                endContent={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                }
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />

              {newPassword && (
                <div>
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

              <Input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-white"
              isLoading={isLoading}
            >
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;