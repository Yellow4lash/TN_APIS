import { useState } from 'react';
import { useAuth } from './useAuth';
import { xsollaService, XsollaPaymentRequest } from '../lib/xsolla';

export class PopupBlockerError extends Error {
  constructor(message: string = 'Popup blocker is preventing the payment window from opening. Please disable your popup blocker and try again.') {
    super(message);
    this.name = 'PopupBlockerError';
  }
}

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
      console.log('Initiating Xsolla payment for plan:', planId, 'amount:', amount);

      // Check if popups are blocked before attempting payment
      if (xsollaService.isPopupBlocked()) {
        throw new PopupBlockerError();
      }

      const paymentRequest: XsollaPaymentRequest = {
        user: {
          id: user.email,
          country: 'US'
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

      console.log('Payment request:', paymentRequest);

      const { paymentUrl } = await xsollaService.createPaymentSession(paymentRequest);
      console.log('Payment URL received:', paymentUrl);
      
      // Open payment window
      const paymentWindow = xsollaService.openPaymentWindow(paymentUrl);
      
      if (!paymentWindow) {
        throw new Error('Failed to open payment window. Please check your popup blocker settings and try again.');
      }

      console.log('Payment window opened, waiting for completion...');

      // Listen for payment completion
      return new Promise<boolean>((resolve, reject) => {
        let isResolved = false;

        const resolveOnce = (success: boolean, error?: string) => {
          if (isResolved) return;
          isResolved = true;
          
          if (success) {
            console.log('Payment completed successfully');
            resolve(true);
          } else {
            console.error('Payment failed:', error);
            reject(new Error(error || 'Payment failed'));
          }
        };

        // Check if window is closed (user cancelled or completed)
        const checkClosed = setInterval(() => {
          try {
            if (paymentWindow.closed) {
              clearInterval(checkClosed);
              // If window closed and no other resolution, assume success
              // In production, you should verify payment status with your backend
              if (!isResolved) {
                console.log('Payment window closed, assuming success');
                resolveOnce(true);
              }
            }
          } catch (error) {
            console.error('Error checking window status:', error);
            clearInterval(checkClosed);
            if (!isResolved) {
              resolveOnce(false, 'Error monitoring payment window');
            }
          }
        }, 1000);

        // Listen for messages from the payment window
        const messageListener = (event: MessageEvent) => {
          console.log('Received message from payment window:', event);
          
          // Only accept messages from Xsolla domain
          if (!event.origin.includes('xsolla.com')) {
            console.log('Ignoring message from non-Xsolla origin:', event.origin);
            return;
          }

          try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            
            if (data.type === 'payment_success' || data.status === 'success') {
              clearInterval(checkClosed);
              window.removeEventListener('message', messageListener);
              paymentWindow.close();
              resolveOnce(true);
            } else if (data.type === 'payment_error' || data.status === 'error') {
              clearInterval(checkClosed);
              window.removeEventListener('message', messageListener);
              paymentWindow.close();
              resolveOnce(false, data.message || 'Payment failed');
            }
          } catch (parseError) {
            console.error('Error parsing message data:', parseError);
          }
        };

        window.addEventListener('message', messageListener);

        // Timeout after 15 minutes
        const timeout = setTimeout(() => {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          if (!paymentWindow.closed) {
            paymentWindow.close();
          }
          if (!isResolved) {
            resolveOnce(false, 'Payment timeout - please try again');
          }
        }, 900000); // 15 minutes

        // Clean up timeout if resolved early
        const originalResolve = resolve;
        const originalReject = reject;
        
        resolve = (value) => {
          clearTimeout(timeout);
          originalResolve(value);
        };
        
        reject = (reason) => {
          clearTimeout(timeout);
          originalReject(reason);
        };
      });

    } catch (err) {
      console.error('Payment initiation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkPopupBlocker = () => {
    return xsollaService.isPopupBlocked();
  };

  return {
    initiatePayment,
    checkPopupBlocker,
    loading,
    error
  };
};