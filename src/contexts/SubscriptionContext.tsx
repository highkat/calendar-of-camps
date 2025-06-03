"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionTier = "free" | "premium_1y" | "premium_3y";

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionTier: SubscriptionTier;
  checkSubscriptionStatus: () => void;
  loading: boolean;
  subscribe: (tier: SubscriptionTier) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>("free");
  const [loading, setLoading] = useState(true);

  const updateSubscriptionState = useCallback((subscribed: boolean, tier: SubscriptionTier) => {
    setIsSubscribed(subscribed);
    setSubscriptionTier(tier);
    if (typeof window !== 'undefined') {
      localStorage.setItem('calendarofcamps_subscription', JSON.stringify({ subscribed, tier }));
    }
  }, []);
  
  const checkSubscriptionStatus = useCallback(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      const storedSubscription = localStorage.getItem('calendarofcamps_subscription');
      if (storedSubscription) {
        try {
          const { subscribed, tier } = JSON.parse(storedSubscription);
          setIsSubscribed(subscribed);
          setSubscriptionTier(tier);
        } catch (error) {
          console.error("Failed to parse stored subscription:", error);
          updateSubscriptionState(false, "free");
        }
        setLoading(false);
        return;
      }
    }

    // Fallback to mock logic if nothing in localStorage
    if (isAuthenticated && user) {
      if (user.email === 'premium@example.com' || user.roles.includes('admin')) {
        updateSubscriptionState(true, "premium_1y");
      } else {
        updateSubscriptionState(false, "free");
      }
    } else {
      updateSubscriptionState(false, "free");
    }
    setLoading(false);
  }, [user, isAuthenticated, updateSubscriptionState]);


  useEffect(() => {
    if (!authLoading) {
      checkSubscriptionStatus();
    }
  }, [authLoading, checkSubscriptionStatus]);

  const subscribe = useCallback((tier: SubscriptionTier) => {
    if (tier === "free") {
      updateSubscriptionState(false, "free");
    } else {
      updateSubscriptionState(true, tier);
    }
  }, [updateSubscriptionState]);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscriptionTier, checkSubscriptionStatus, loading: authLoading || loading, subscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
