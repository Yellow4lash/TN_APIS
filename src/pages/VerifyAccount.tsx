import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Zap, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

const VerifyAccount: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyAccount } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the verification token from URL parameters
        const token = searchParams.get('token');
        
        if (!token) {
          setError('Invalid or missing verification token');
          setLoading(false);
          return;
        }

        const { data, error: verifyError } = await verifyAccount(token);
        
        if (verifyError) {
          setError(verifyError.message);
          setLoading(false);
          return;
        }

        if (data?.user) {
          setSuccess(true);
          // Redirect to login after successful verification
          setTimeout(() => {
            navigate('/auth/login', { 
              state: { message: 'Account verified successfully! You can now sign in.' }
            });
          }, 3000);
        }
      } catch (err) {
        console.error('Account verification error:', err);
        setError('An unexpected error occurred during verification');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, verifyAccount, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <Section className="pt-32 pb-16">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-800 mb-4">
                Verifying Your Account
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your account...
              </p>
            </motion.div>
          </div>
        </Section>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success-50 via-primary-50 to-secondary-50">
        <Section className="pt-32 pb-16">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-800 mb-4">
                Account Verified Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Your account has been verified. You will be redirected to the sign in page shortly.
              </p>
              <Button
                to="/auth/login"
                color="primary"
                size="lg"
                className="w-full"
              >
                Continue to Sign In
              </Button>
            </motion.div>
          </div>
        </Section>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-error-50 via-primary-50 to-secondary-50">
      <Section className="pt-32 pb-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-error-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-800 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              {error || 'This verification link is invalid or has expired. Please request a new verification email.'}
            </p>
            <div className="space-y-4">
              <Button
                to="/auth/signup"
                color="primary"
                size="lg"
                className="w-full"
              >
                Create New Account
              </Button>
              <Button
                to="/auth/login"
                variant="outline"
                color="primary"
                size="lg"
                className="w-full"
              >
                Back to Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default VerifyAccount;