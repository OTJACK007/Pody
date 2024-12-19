import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Goal, getGoals } from '../services/goals';

interface GoalsContextType {
  goals: Goal[];
  activeGoals: Goal[];
  completedGoals: Goal[];
  upcomingGoals: Goal[];
  refreshGoals: () => Promise<void>;
  isLoading: boolean;
}

const GoalsContext = createContext<GoalsContextType | null>(null);

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};

export const GoalsProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshGoals = async () => {
    if (!currentUser?.id) return;
    
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    const loadGoals = async () => {
      setIsLoading(true);
      await refreshGoals();
      setIsLoading(false);
    };

    if (currentUser?.id) {
      loadGoals();
    }
  }, [currentUser?.id]);

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  const upcomingGoals = goals.filter(goal => goal.status === 'upcoming');

  return (
    <GoalsContext.Provider value={{
      goals,
      activeGoals,
      completedGoals,
      upcomingGoals,
      refreshGoals,
      isLoading
    }}>
      {children}
    </GoalsContext.Provider>
  );
};