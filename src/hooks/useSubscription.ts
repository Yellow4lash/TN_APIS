import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Subscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    // For now, we'll simulate no subscription since we removed Supabase
    // You can implement this with your custom API later
    setSubscription(null);
    setLoading(false);
    setError(null);
  }, [user]);

  const getProductName = () => {
    if (!subscription?.price_id) return null;
    // You can implement product name mapping here
    return 'Monthly Plan';
  };

  const isActive = () => {
    return subscription?.subscription_status === 'active';
  };

  const isTrialing = () => {
    return subscription?.subscription_status === 'trialing';
  };

  const isCanceled = () => {
    return subscription?.subscription_status === 'canceled';
  };

  const isPastDue = () => {
    return subscription?.subscription_status === 'past_due';
  };

  return {
    subscription,
    loading,
    error,
    getProductName,
    isActive,
    isTrialing,
    isCanceled,
    isPastDue
  };
};