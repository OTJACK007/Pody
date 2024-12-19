import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { Input, Button } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import { signIn, signUp } from '../../lib/auth';
import { validateEmail, validatePassword, validateFullName } from '../../utils/validation';
import type { AuthMode } from '../../types';
import { useNavigate } from 'react-router-dom';

interface EmailAuthFormProps {
  mode: AuthMode;
  onBack: () => void;
}

const EmailAuthForm = ({ mode, onBack }: EmailAuthFormProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (mode === 'signup') {
        if (!validateFullName(formData.fullname)) {
          throw new Error('Please enter your full name');
        }

        const { error: signUpError } = await signUp({
          email: formData.email,
          password: formData.password,
          fullname: formData.fullname
        });
        
        if (signUpError) throw signUpError;
        setIsVerificationSent(true);
      } else {
        const { error: signInError } = await signIn({
          email: formData.email,
          password: formData.password
        });

        if (signInError) throw signInError;
        navigate('/dashboard/livespace');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'signup' && isVerificationSent) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-green-500" />
        </div>
        <h3 className={`text-xl font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Verify your email</h3>
        <p className={`max-w-sm mx-auto ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          We've sent a verification link to {formData.email}. Please check your inbox and click the link to activate your account.
        </p>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Didn't receive the email? Check your spam folder or contact support.
        </p>
        <button
          type="button"
          onClick={onBack}
          className={`text-sm ${
            theme === 'dark' ? 'text-primary hover:text-primary/80' : 'text-primary/90 hover:text-primary'
          } transition-colors`}
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <button
          type="button"
          onClick={onBack}
          className={`mb-4 ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
        >
          ← Back
        </button>
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          {mode === 'signup' 
            ? 'Fill in your details to get started'
            : 'Enter your credentials to continue'
          }
        </p>
      </div>

      {mode === 'signup' && (
        <div className="mt-4">
          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Full Name
          </label>
          <Input
            type="text"
            id="name"
            value={formData.fullname}
            onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
            className="w-full"
            placeholder="John Doe"
            required
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="you@example.com"
          required
          classNames={{
            input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
            inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
          }}
        />
      </div>

      <div>
        <label htmlFor="password" className={`block text-sm font-medium mb-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Password
        </label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="••••••••"
          required
          classNames={{
            input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
            inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
          }}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{mode === 'signup' ? 'Creating account...' : 'Signing in...'}</span>
          </>
        ) : (
          <span>{mode === 'signup' ? 'Create account' : 'Sign in'}</span>
        )}
      </Button>
    </form>
  );
};

export default EmailAuthForm;