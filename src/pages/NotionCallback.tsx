import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notionService } from '../services/notion';

const NotionCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        const success = await notionService.handleAuthCallback(code);
        if (success) {
          navigate('/dashboard/livespace');
        } else {
          throw new Error('Failed to authenticate with Notion');
        }
      } catch (error) {
        console.error('Error handling Notion callback:', error);
        navigate('/dashboard/livespace', { 
          state: { error: 'Failed to connect Notion. Please try again.' }
        });
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Connecting to Notion...</h2>
        <p className="text-gray-400">Please wait while we complete the connection.</p>
      </div>
    </div>
  );
};

export default NotionCallback;