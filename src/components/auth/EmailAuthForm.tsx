import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthMode } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { AuthError } from 'firebase/auth';

interface EmailAuthFormProps {
  mode: AuthMode;
  onBack: () => void;
}

const EmailAuthForm = ({ mode, onBack }: EmailAuthFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        navigate('/dashboard/livespace');
      } else {
        await signUp(email, password);
        navigate('/dashboard/livespace');
      }
    } catch (error: unknown) {
      if ((error as AuthError)?.code) {
        const errorCode = (error as AuthError).code;
        switch (error.code) {
          case 'auth/invalid-credential':
            setError('Invalid email or password');
            break;
          case 'auth/user-not-found':
            setError('No account found with this email');
            break;
          case 'auth/wrong-password':
            setError('Invalid email or password');
            break;
          case 'auth/email-already-in-use':
            setError('An account with this email already exists');
            break;
          case 'auth/weak-password':
            setError('Password should be at least 6 characters');
            break;
          default:
            setError('An error occurred. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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