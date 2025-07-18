import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset status after delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-primary-100 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl font-display font-bold text-primary-800 mb-4">
        Stay Updated
      </h3>
      <p className="text-gray-600 mb-6">
        Subscribe to our newsletter for updates, educational tips, and exclusive offers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <Button 
          type="submit"
          color="primary"
          size="md"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' 
            ? 'Subscribing...' 
            : status === 'success' 
              ? 'Subscribed!' 
              : 'Subscribe'}
        </Button>
      </form>
      
      {status === 'success' && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-success-600"
        >
          Thank you for subscribing to our newsletter!
        </motion.p>
      )}
      
      {status === 'error' && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-error-600"
        >
          There was an error. Please try again.
        </motion.p>
      )}
      
      <p className="text-xs text-gray-500 mt-4">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from TinyNinza.
      </p>
    </div>
  );
};

export default NewsletterSignup;