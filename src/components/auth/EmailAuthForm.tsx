import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { Input, Button } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import { signIn, signUp } from '../../lib/auth';
import { validateEmail, validatePassword, validateFullName } from '../../utils/validation';
import type { AuthMode } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface EmailAuthFormProps {
  mode: AuthMode;
  onBack: () => void;
}

const EmailAuthForm = ({ mode, onBack }: EmailAuthFormProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
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
        
        // Rafraîchir le profil après la connexion
        await refreshProfile();
        navigate('/dashboard/livespace');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du code inchangé ...
};

export default EmailAuthForm;