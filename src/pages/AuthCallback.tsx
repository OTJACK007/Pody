import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          navigate('/dashboard/livespace', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Verifying your account...</h2>
        <p className="text-gray-400">Please wait while we complete the verification process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;