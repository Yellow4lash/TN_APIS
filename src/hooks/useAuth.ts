import { useState, useEffect } from 'react';
import { authService, User } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    const result = await authService.signUp(email, password);
    return result;
  };

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    return result;
  };

  const signOut = async () => {
    const result = await authService.signOut();
    return result;
  };

  const resetPassword = async (email: string) => {
    const result = await authService.resetPassword(email);
    return result;
  };

  const processPasswordReset = async (resetToken: string, password: string) => {
    const result = await authService.processPasswordReset(resetToken, password);
    return result;
  };

  const verifyAccount = async (verificationToken: string) => {
    const result = await authService.verifyAccount(verificationToken);
    return result;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    processPasswordReset,
    verifyAccount
  };
};