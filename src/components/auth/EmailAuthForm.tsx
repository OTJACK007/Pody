import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthMode } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface EmailAuthFormProps {
  mode: AuthMode;
  onBack: () => void;
}

const EmailAuthForm = ({ mode, onBack }: EmailAuthFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { signIn, signUp } = useAuth();

  const validatePassword = (password: string) => {
    return /\d/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must contain at least one number');
        return;
      }

      if (!fullName) {
        setError('Full name is required');
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate('/dashboard/livespace');
        }
      } else {
        setIsVerificationSent(true);
        await signUp(email, password, fullName);
      }
    } catch (error: any) {
      if (error.message) {
        switch (error.message) {
          case 'User already registered':
            setError('An account with this email already exists');
            break;
          case 'Failed to create user account':
            setError('Failed to create account. Please try again.');
            break;
          case 'Invalid login credentials':
            setError('Invalid email or password');
            break;
          case 'User not found':
            setError('No account found with this email');
            break;
          case 'Weak password':
            setError('Password should be at least 6 characters');
            break;
          default:
            setError(error.message);
        }
      }
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
        <h3 className="text-xl font-semibold text-white">Verify your email</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          We've sent a verification link to {email}. Please check your inbox and click the link to activate your account.
        </p>
        <p className="text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-primary hover:text-primary/80 transition-colors text-sm"
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
          className="text-gray-400 hover:text-white transition-colors mb-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-gray-400 mt-2">
          {mode === 'signup' 
            ? 'Fill in your details to get started'
            : 'Enter your credentials to continue'
          }
        </p>
      </div>

      {mode === 'signup' && (
        <div className="mt-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
            placeholder="John Doe"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
          placeholder="••••••••"
          required
        />
        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
              placeholder="••••••••"
              required
            />
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
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
      </button>
    </form>
  );
};

export default EmailAuthForm;