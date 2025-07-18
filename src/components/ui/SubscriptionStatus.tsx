import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import Button from './Button';

const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, error, getProductName, isActive, isTrialing, isCanceled, isPastDue } = useSubscription();

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-error-600" />
          <span className="text-error-700 font-medium">Unable to load subscription</span>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-50 border border-primary-200 rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-primary-800">Subscriptions Coming Soon</h3>
            <p className="text-sm text-primary-600">We're working on subscription features</p>
          </div>
          <Button color="primary" size="sm" to="/contact">
            Contact Us
          </Button>
        </div>
      </motion.div>
    );
  }

  const getStatusIcon = () => {
    if (isActive()) return <CheckCircle className="w-5 h-5 text-success-600" />;
    if (isTrialing()) return <Clock className="w-5 h-5 text-warning-600" />;
    if (isPastDue()) return <AlertTriangle className="w-5 h-5 text-error-600" />;
    if (isCanceled()) return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    return <Crown className="w-5 h-5 text-primary-600" />;
  };

  const getStatusColor = () => {
    if (isActive()) return 'success';
    if (isTrialing()) return 'warning';
    if (isPastDue()) return 'error';
    if (isCanceled()) return 'gray';
    return 'primary';
  };

  const getStatusText = () => {
    if (isActive()) return 'Active';
    if (isTrialing()) return 'Trial';
    if (isPastDue()) return 'Past Due';
    if (isCanceled()) return 'Canceled';
    return subscription.subscription_status;
  };

  const statusColor = getStatusColor();
  const bgColor = `bg-${statusColor}-50`;
  const borderColor = `border-${statusColor}-200`;
  const textColor = `text-${statusColor}-800`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bgColor} ${borderColor} border rounded-lg p-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className={`font-medium ${textColor}`}>
              {getProductName() || 'TinyNinza Subscription'}
            </h3>
            <p className={`text-sm ${textColor.replace('800', '600')}`}>
              Status: {getStatusText()}
            </p>
          </div>
        </div>
        
        {(isPastDue() || isCanceled()) && (
          <Button color="primary" size="sm" to="/pricing">
            Manage Subscription
          </Button>
        )}
      </div>

      {subscription.current_period_end && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on{' '}
            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionStatus;