import { loadStripe } from '@stripe/stripe-js';
import { authService } from './auth';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Stripe functionality will be disabled.');
}

export const stripe = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export interface CheckoutSessionRequest {
  priceId: string;
  mode: 'subscription' | 'payment';
  successUrl?: string;
  cancelUrl?: string;
}

export const createCheckoutSession = async (request: CheckoutSessionRequest) => {
  const user = authService.getCurrentUser();
  
  if (!user?.accessToken) {
    throw new Error('User not authenticated');
  }

  // Use proxy in development, direct API in production
  const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api.happyadda.com/api';
  
  try {
    const response = await fetch(`${API_BASE_URL}/create-stripe-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        priceId: request.priceId,
        mode: request.mode,
        successUrl: request.successUrl || `${window.location.origin}/success`,
        cancelUrl: request.cancelUrl || `${window.location.origin}/pricing`,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Checkout session creation failed:', response.status, errorText);
      
      if (response.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      }
      if (response.status === 404) {
        throw new Error('Checkout service not available. Please contact support.');
      }
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw new Error(`Failed to create checkout session: ${response.statusText}`);
    }
    const data = await response.json();
    
    if (!data.url) {
      throw new Error('Invalid response from checkout service');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the payment service. Please check your internet connection and try again.');
    }
    
    throw error;
  }
};