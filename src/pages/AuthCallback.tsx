import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { parseHashFragment } from '../utils/auth';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get hash fragment from URL
        const hash = window.location.hash;
        if (!hash) {
          navigate('/');
          return;
        }

        // Parse hash fragment
        const { access_token, refresh_token } = parseHashFragment(hash);
        
        if (!access_token) {
          throw new Error('No access token found');
        }

        // Set the session with the tokens
        const { data: { session }, error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        });
      
        if (error) throw error;
        
        if (session) {
          // User is authenticated, redirect to dashboard
          navigate('/dashboard/livespace', { replace: true });
        } else {
          throw new Error('No session established');
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