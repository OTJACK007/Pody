import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        navigate('/');
        return;
      }

      if (session) {
        // User is authenticated, redirect to dashboard
        navigate('/dashboard/livespace');
      } else {
        // No session, redirect to home
        navigate('/');
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