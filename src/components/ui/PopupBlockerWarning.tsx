import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

interface PopupBlockerWarningProps {
  isVisible: boolean;
  onClose: () => void;
  onRetry: () => void;
}

const PopupBlockerWarning: React.FC<PopupBlockerWarningProps> = ({
  isVisible,
  onClose,
  onRetry
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-warning-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Popup Blocked
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Your browser is blocking the payment window from opening. To complete your subscription:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
            <li>Look for a popup blocker icon in your browser's address bar</li>
            <li>Click on it and select "Always allow popups from this site"</li>
            <li>Or temporarily disable your popup blocker</li>
            <li>Click "Try Again" below</li>
          </ol>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">
              <strong>Note:</strong> The payment window will open in a secure popup from Xsolla, our trusted payment processor.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            color="primary"
            size="md"
            onClick={onRetry}
            className="flex-1"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            color="primary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopupBlockerWarning;