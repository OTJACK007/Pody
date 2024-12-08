import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserSettings } from '../lib/firestore';

export const useAdmin = () => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const settings = await getUserSettings(currentUser.uid);
        setIsAdmin(settings?.role === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [currentUser]);

  return { isAdmin, isLoading };
};