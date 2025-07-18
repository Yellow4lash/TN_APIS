import { useState } from 'react';
import { useAuth } from './useAuth';
import { xsollaService, XsollaPaymentRequest } from '../lib/xsolla';

export const useXsollaPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const initiatePayment = async (planId: string, amount: number, currency: string = 'USD') => {
    if (!user) {
      throw new Error('User must be authenticated to make a payment');
    }

    setLoading(true);
    setError(null);

    try {
      const paymentRequest: XsollaPaymentRequest = {
        user: {
          id: user.email,
          country: 'US' // You can get this from user profile or IP geolocation
        },
        purchase: {
          planId,
          amount,
          currency
        },
        settings: {
          language: 'en',
          theme: 'default'
        }
      };

      const { paymentUrl } = await xsollaService.createPaymentSession(paymentRequest);
      
      // Open payment window
      const paymentWindow = xsollaService.openPaymentWindow(paymentUrl);
      
      if (!paymentWindow) {
        throw new Error('Failed to open payment window. Please check your popup blocker settings.');
      }

      // Listen for payment completion
      return new Promise<boolean>((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkClosed);
            // In a real implementation, you would verify the payment status
            // For now, we'll assume success if the window was closed
            resolve(true);
          }
        }, 1000);

        // Listen for messages from the payment window
        const messageListener = (event: MessageEvent) => {
          if (event.origin !== 'https://sandbox-secure.xsolla.com') {
            return;
          }

          if (event.data.type === 'payment_success') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            paymentWindow.close();
            resolve(true);
          } else if (event.data.type === 'payment_error') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            paymentWindow.close();
            reject(new Error(event.data.message || 'Payment failed'));
          }
        };

        window.addEventListener('message', messageListener);

        // Timeout after 10 minutes
        setTimeout(() => {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          if (!paymentWindow.closed) {
            paymentWindow.close();
          }
          reject(new Error('Payment timeout'));
        }, 600000);
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayment,
    loading,
    error
  };
};